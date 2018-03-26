import { BaseController } from "../../../common/baseui/BaseController";
import { LoginModel as Model, LoginModel } from "../model/LoginModel";
import { LoginModule } from "../LoginModule";
import { MainModule } from "../../main/MainModule";
import { ProtoConfig, MessageConfig } from "../../../config/ProtoConfig"
import { FuncUtil } from "../../../common/util/FuncUtil"

import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import NetworkMgr from "../../../network/NetworkMgr"
import { GameManager } from "../../../common/manager/GameManager"
import { HelpFunc } from "../../../common/util/HelpFunc"
import { FactoryUtil } from "../../../common/util/FactoryUtil"
import HttpRequestMgr from "../../../network/HttpRequestMgr"
import { ChatController } from "../../chat/controller/ChatController"
import { GameModel } from "../../game/model/GameModel"
import { MainModel } from "../../main/model/MainModel"


export class LoginController extends BaseController {
    public isLogin: boolean = false;

    private isReconect = false
    private recMsgState = 0
    private reconectTimes = 0

    confirmLoginFunc(accountStr: string, passwordStr: string) {
        let time = new Date().getTime()
        
        HttpRequestMgr.getInstance().xmlHttpRequestLogin(accountStr, passwordStr, 0, time, function (data) {
            // ////cc.log("--xmlHttpRequestLogin--")
            data = eval('(' + data + ')');
            data.serverList = eval('{' + data.serverList + '}');
            // //////////cc.log(data)
            if (data.result != 0) {//0：登录成功  1：账号为空  2：密码为空  3：密码长度有误  4：账号未注册  5：密码错误 6：登录失败 
                let tipArr = [
                    "登录成功",
                    "账号为空",
                    "密码为空",
                    "密码长度有误",
                    "账号未注册",
                    "密码错误",
                    "登录失败"
                ]

                FactoryUtil.createAlertConfirmView(tipArr[data.result], function () {
                    Emitter.fire(EmitterCfg.LOGIN_CONFIRM_LOGIN, false)
                })

                return
            }

            LoginModel.getInstance().setHttpLoginData(data)

            Emitter.fire(EmitterCfg.LOGIN_CONFIRM_LOGIN, false);
            Emitter.fire(EmitterCfg.LOGIN_HTTP_LOGIN, data);
        }, function () {
            // Emitter.fire(EmitterCfg.LOGIN_CONFIRM_LOGIN, false)
        })

        cc.sys.localStorage.setItem("LOGIN_CCOUNT", accountStr);
        cc.sys.localStorage.setItem("LOGIN_PASSWORD", passwordStr);
    }

    connectNet(data) {
        this.netWorkMgr.connectNet("ws://" + data.gameHost, data.gamePort);         //  正式
    }

    S_LoginGame(msg) {
        this.isLogin = true;
        msg.playerMsgs.gold = this.int2Float(msg.playerMsgs.gold)
        msg.playerMsgs.usableGold = this.int2Float(msg.playerMsgs.usableGold)
        GameManager.instance.setLoginData(msg);

        MainModel.instance.initGameData(msg)

        MainModule.instance.show();

        cc.sys.localStorage.setItem("LOGIN_SELECT_SEVER", JSON.stringify(LoginModel.getInstance().getCurServerData()))

        this.isReconect = true
        this.recMsgState = 0
        this.reconectTimes = 0
    }

    S_Exception(msg) {
        FuncUtil.getGameExceptionJson(msg.code, function (data) {
            FactoryUtil.createAlertConfirmView(data.exceptionMsg)
        })

        if (Number(msg.code) == 1112) {
            GameModel.instance.cancelBetJetton()
        }
    }

    S_Exception_Server(msg) {
        FactoryUtil.createAlertConfirmView(msg.msg)
    }

    C_LoginGame() {
        let httpLoginData = LoginModel.getInstance().getHttpLoginData()
        let curServerData = LoginModel.getInstance().getCurServerData()

        let self = this
        let callFunc = function () {
            if (self.isLogin) {
                return
            }
            self.netWorkMgr.simulateData("S_LoginGame");
        }

        let msgName = "C_LoginGame"
        let msgData = {
            userId: httpLoginData.userId,
            key: httpLoginData.key,
            time: httpLoginData.time,
            sign: httpLoginData.sign,
            serverNo: curServerData.serverNo,
        }
        this.netWorkMgr.sendData(msgName, msgData, callFunc);
    }

    S_ExitGame(msg) {
        let self = this
        if (msg.type == 1) {
            this.isLogin = false
            this.isReconect = false
            this.recMsgState = msg.type

            Emitter.fire(EmitterCfg.GAME_EXIT_GAME)
            LoginModule.getInstance().show()
            MainModule.instance.hide()

            FactoryUtil.createAlertConfirmView("您的账号已在别处登录，请确认是否本人登录！", function () {
                self.recMsgState = 0
            })
        } else if (msg.type == 2) {
            this.isLogin = false
            this.isReconect = false
            this.recMsgState = msg.type

            FactoryUtil.createAlertConfirmView("账号异常，已下线！", function () {
                Emitter.fire(EmitterCfg.GAME_EXIT_GAME)
                LoginModule.getInstance().show()
                MainModule.instance.hide()
                self.recMsgState = 0
            })
        } else if (msg.type == 3) {
            FactoryUtil.createAlertConfirmView("当前余额不足，已返回游戏大厅！", function () {
                Emitter.fire(EmitterCfg.GAME_EXIT_GAME)
            })
        }
    }

    netWorkClosed() {
        let self = this
        
        self.isLogin = false
        FuncUtil.delayFunc(function () {
           // cc.log(self.reconectTimes, self.isLogin, self.isReconect, self.recMsgState)
            if (self.reconectTimes > 60) {
                return
            }

            if (self.isLogin) {
                return
            }
            
            if (self.isReconect && self.recMsgState <= 0) {
                NetworkMgr.instance.reConnectNet()
                ++self.reconectTimes
            }
        }, 10)
    }

    /////////以下必须函数///////////////////////////////////////////////////////
    private static instance: LoginController = null
    
    public static getInstance(){
        if(!this.instance){
            this.instance  = new LoginController()
        }
        return this.instance
    }

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        LoginController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.register("S_Exception", this.S_Exception, this);
        this.register("S_Exception_Server", this.S_Exception_Server, this);

        this.register("S_LoginGame", this.S_LoginGame, this);
        this.register("S_ExitGame", this.S_ExitGame, this)
    }

    addEveRegister() {
        Emitter.register(EmitterCfg.LOGIN_SEND_LOGIN_SERVER, this.C_LoginGame, this);

        Emitter.register(EmitterCfg.GLOBAL_NET_WORK_CLOSED, this.netWorkClosed, this)
    }

    delEveRegister() {
        Emitter.unregister(EmitterCfg.LOGIN_SEND_LOGIN_SERVER, this.C_LoginGame, this);

        Emitter.unregister(EmitterCfg.GLOBAL_NET_WORK_CLOSED, this.netWorkClosed, this)
    }
}