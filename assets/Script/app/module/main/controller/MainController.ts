import { BaseController } from "../../../common/baseui/BaseController"
import { MainModel } from "../model/MainModel"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { TonghuashunController as TongCtr } from "../../tonghuashun/controller/TonghuashunController"
import { TonghuashunModel as TongModel } from "../../tonghuashun/model/TonghuashunModel"
import { LoginController } from "../../login/controller/LoginController"
import { LonghudouModel } from "../../longhudou/model/LonghudouModel"
import { FactoryUtil } from "../../../common/util/FactoryUtil"
import { FuncUtil } from "../.././../common/util/FuncUtil"
import { GameManager } from "../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { GameParam } from "../../../../GameConfig"
import { GameModel } from "../../game/model/GameModel"
import { MainModule } from "../../main/MainModule"
import { TonghuashunModule } from "../../tonghuashun/TonghuashunModule"
import { LonghudouModule } from "../../longhudou/LonghudouModule"
import { XiaojiuModule } from "../../xiaojiu/XiaojiuModule"
import { ErbagangModule } from "../../erbagang/ErbagangModule"
import { NiuniuModule } from "../../niuniu/NiuniuModule"
import { ZhajinhuaModule } from "../../zhajinhua/ZhajinhuaModule"
import { SignController } from "../../sign/controller/SignController"
import { SignModel } from "../../sign/model/SignModel"
import { ExchangeController } from "../../exchange/controller/ExchangeController"
import { ActivityModel } from "../../activity/model/ActivityModel"
import { ActivityController } from "../../activity/controller/ActivityController"
import { RankingListModel } from "../../ranking/model/RankingListModel"
import { RankingListController } from "../../ranking/controller/RankingListController"
import ProtoMgr from "../../../network/ProtoMgr"


export class MainController extends BaseController {
    startAward: boolean = false
    startBetting: boolean = false
    activitytType = ["S_IntegralRankInfo", "S_ExchangeInfo", "S_DayCompleteInfo", "S_SignInInfo", ""]

    downLoadGame(gameData) {
        Emitter.fire(EmitterCfg.MAIN_HIDES, gameData)
    }

    setGameColloectMgr(gameData) {
        GameColMgr.instance.setGameData(gameData)
        if (gameData.gameState == 1) {
            MainController.instance.C_DownloadGame(gameData);
        } else if (gameData.gameState == 0) {
            ////cc.log(`${gameData.gameName}游戏未开启，敬请期待！`)
            FactoryUtil.createAlertConfirmView(`${gameData.gameName}游戏未开启，敬请期待！`)
        }
    }

    S_SynGold(msg) {
        msg.gold = this.int2Float(msg.gold)
        msg.usableGold = this.int2Float(msg.usableGold)
        GameManager.instance.updateGold(msg)
    }

    S_SynNotic(msg) {
        MainModel.instance.updateNoticeData(msg)
    }

    //下载完成通知
    C_DownloadGame(gameData) {
        let gameType = gameData.gameType

        if (GameManager.instance.getGameTypes(gameType)) {
            this.downLoadGame(gameData)
        } else {
            let msgName = "C_DownloadGame"
            let msgData = {
                gameType: gameData.gameType
            }

            this.sendData(msgName, msgData)

            let self = this
            FuncUtil.delayFunc(function () {
                GameManager.instance.updateGameTypes(gameType)
                self.downLoadGame(gameData)
            }, 1)
        }
    }

    //进入游戏
    C_EnterGame(param) {
        let msgName = "C_EnterGame"
        let msgData = {
            gameId: param.gameId
        }
        this.sendData(msgName, msgData);

        if (GameParam.isDevelopment) {
            let msg = {
                totalMoney: 2017,
                players: [],
                endTime: new Date().getTime() + 1000 * 5,
                resultMsg: [],
                state: 0,
                totalsList: []
            }
            this.S_EnterGame(msg)
        }
    }

    //获取房间内信息
    S_EnterGame(msg) {

        this.C_Activity_GetAvailableActivityList()
        Emitter.fire(EmitterCfg.MAIN_CHONLIAN, null)
        if (msg.gameType == 0) {
            Emitter.fire(EmitterCfg.GAME_EXIT_GAME)
            return
        }

        FuncUtil.getJsonConfig("game_item_c", null, function (data, self) {
            let key = `id${msg.gameType}`
            let cfgData = data[key]
            let gameTag = cfgData.gameTag

            FuncUtil.getJsonConfig("gamehall", msg.gameId, function (data, self) {
                GameColMgr.instance.setSrcGameData(msg, gameTag, data)

                msg.totalMoney = self.int2Float(msg.totalMoney)
                msg.playerMsgs.gold = self.int2Float(msg.playerMsgs.gold)
                msg.playerMsgs.usableGold = self.int2Float(msg.playerMsgs.usableGold)
                for (let i = 0; i < msg.regionOdds.length; i++) {
                    msg.regionOdds[i].odd = self.int2Float(msg.regionOdds[i].odd)
                }
                for (let i = 0; i < msg.totalsList.length; i++) {
                    msg.totalsList[i].money = self.int2Float(msg.totalsList[i].money)
                }
                for (let i = 0; i < msg.selfTotalsList.length; i++) {
                    msg.selfTotalsList[i].money = self.int2Float(msg.selfTotalsList[i].money)
                }

                cc.sys.localStorage.setItem("CUR_GAME_TYPE", msg.gameType)

                GameManager.instance.setEnterGame(msg)

                self.enterGame(gameTag)

                Emitter.fire(EmitterCfg.MAIN_HIDES, null)
                Emitter.fire(EmitterCfg.MAIN_CHONLIAN)
            }, self)
        }, this)
    }

    enterGame(curGameTag) {
        ////cc.log("curGameTag = ", curGameTag)
        if (curGameTag == "tonghuashun") {
            TonghuashunModule.instance.show()
        } else if (curGameTag == "longhudou") {
            LonghudouModule.instance.show()
        } else if (curGameTag == "xiaojiu") {
            XiaojiuModule.instance.show()
        } else if (curGameTag == "erbagang") {
            ErbagangModule.instance.show()
        } else if (curGameTag == "niuniu") {
            NiuniuModule.instance.show();
        } else if (curGameTag == "zhajinhua") {
            ZhajinhuaModule.instance.show();
        }
    }

    S_GameLog(msg) {

    }

    //发送坐下站起
    C_PlayGame(param) {
        let msgName = "C_PlayGame"
        let msgData = param
        this.sendData(msgName, msgData);
    }

    //接受坐下站起   
    S_PlayGame(msg) {
        GameManager.instance.setGamePlayState(msg)
    }

    //确定投注
    C_Betting(param) {
        let msgName = "C_Betting";
        let msgData = param
        for (let i = 0; i < msgData.bettingMsgList.length; i++) {
            msgData.bettingMsgList[i].money = this.float2Int(msgData.bettingMsgList[i].money)
        }
        this.sendData(msgName, msgData);
    }

    //投注成功
    S_Betting(msg) {
        msg.money = this.int2Float(msg.money)
        for (let i = 0; i < msg.bettingMsgList.length; i++) {
            msg.bettingMsgList[i].money = this.int2Float(msg.bettingMsgList[i].money)
        }
        GameManager.instance.setBettingInfo(msg)
        // LonghudouModel.instance.setBettingInfoMoney(msg.money);
    }

    //同步投注金额
    S_SynMoney(msg) {
        msg.totalMoney = this.int2Float(msg.totalMoney)
        for (let i = 0; i < msg.totalsList.length; i++) {
            msg.totalsList[i].money = this.int2Float(msg.totalsList[i].money)
        }

        GameManager.instance.setSynTotalMoney(msg)
    }

    //取消投注
    C_CancelBetting(param) {

    }

    S_CancelBetting(msg) {
        GameManager.instance.setCancelBettingMsg(msg)
    }

    //添加赌桌上玩家
    S_AddRoomPlayer(msg) {
        GameManager.instance.addRoomPlayerMsg(msg)
    }

    //移除赌桌上自己
    C_RemoveRoomPlayer() {
        let msgName = "C_RemoveRoomPlayer";
        this.sendData(msgName);
    }

    //移除赌桌上玩家
    S_RemoveRoomPlayer(msg) {
        GameManager.instance.delRoomPlayerMsg(msg)
    }

    //玩家抢庄
    C_RobBanker(param) {
        //////////cc.log(param)
        let msgName = "C_RobBanker";
        let msgData = {
            rob: param
        }
        this.sendData(msgName, msgData);
    }

    //玩家抢庄返回
    S_RobBanker(msg) {
        //////////cc.log(msg)
        GameManager.instance.playerrobzhuangMsg(msg)
    }

    //更新的玩家列表
    S_UpdatePlayers(msg) {
        //////////cc.log(msg)
        GameManager.instance.playeRoomPlayerMsg(msg)
    }

    //开始投注
    S_StartBetting(msg) {
        if (!this.startBetting) {
            let self = this
            self.startBetting = true

            FuncUtil.delayFunc(function () {
                self.startBetting = false
            }, 1)

            GameManager.instance.setStartBetting(msg)

            if (GameParam.iaAutoBet) {
                this.C_Betting({ bettingMsgList: [{ posId: 2, money: 100 }, { posId: 3, money: 200 }, { posId: 4, money: 100 }] })
            }
        }
    }

    //   一局总的输赢情况  
    S_WinOrLose(msg) {
        msg.result = this.int2Float(msg.result);
        GameManager.instance.setWinOrLose(msg);

    }

    //开始发牌
    S_StartAward(msg) {
        if (msg.resultMsg.length <= 0) {
            ////cc.log("S_StartAward协议resultMsg字段不能为空，请检查服务器")
            return
        }

        if (!this.startAward) {
            let self = this
            self.startAward = true

            FuncUtil.delayFunc(function () {
                self.startAward = false
            }, 1)

            GameManager.instance.setStartAward(msg)
        }
    }

    S_EndBetting(msg) {
        GameManager.instance.endBetting(msg)
    }



    C_Activity_GetAvailableActivityList() {
        let msgName = "C_Activity_GetAvailableActivityList"
        this.sendData(msgName);
    }

    S_Activity_GetAvailableActivityList(msg) {
        let acttivityList = [];
        let self = this
        let activityType = 0;
        let len = msg.availableActivityInfos.length - 2
        for (let i = 0; i < msg.availableActivityInfos.length; i++) {
            activityType = msg.availableActivityInfos[i].activityType
            if (activityType == 1) {

                SignController.instance.S_SignInInfo(msg.availableActivityInfos[i].activityContent)

            } else if (activityType == 3) {

                ExchangeController.instance.S_ExchangeInfo(msg.availableActivityInfos[i].activityContent)

            } else if (activityType == 4) {
                RankingListModel.instance.setRankInfoData(msg.availableActivityInfos[i].activityContent)
            }
            if (activityType == 1 || activityType == 2) {
                ProtoMgr.parseMsgData("activitydata", this.activitytType[i], msg.availableActivityInfos[i].activityContent, function (data) {

                    acttivityList.push(data)
                    if (len == i) {
                        ActivityModel.instance.setActivityList(acttivityList)
                    }
                })
            }

        }
    }
    C_Activity_FetchSpecificActivityReward(typeName, param) {
        let msgName = "C_Activity_FetchSpecificActivityReward"
        let self = this
        ProtoMgr.parseSendData("activitydata", typeName, param, function (data) {
            let SignIn = {
                activitySeq: param.activitySeq,
                activityContent: data
            }
            let msgData = {
                fetchReq: SignIn
            }
            self.sendData(msgName, msgData);
        })
    }

    S_Activity_FetchSpecificActivityReward(msg) {

        if (msg.result.activitySeq == SignModel.instance.getsignrid()) {
            SignController.instance.S_SignIn(msg)
        } else if (msg.result.activitySeq == ActivityModel.instance.getActivitySeq(0)) {  ///每日积分奖励

            ActivityController.instance.S_DayActive(msg)

        } else if (RankingListModel.instance.getRankingSeq() == msg.result.activitySeq) {
            RankingListController.instance.S_IntegralRank(msg)
        }

        //  console.log(":活动=====================",msg)

    }

    S_Activity_GetSpecificActivity(msg) {
        let activityType = 0;
        activityType = msg.availableActivityInfos.activityType
        cc.log("activityType++++++++++++     "+activityType)
        if (activityType == 1) {

            SignController.instance.S_SignInInfo(msg.availableActivityInfos.activityContent)

        }

    }




    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: MainController = new MainController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        MainController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.register("S_SynGold", this.S_SynGold, this);
        this.register("S_SynNotic", this.S_SynNotic, this);
        this.register("S_PlayGame", this.S_PlayGame, this);
        this.register("S_SynMoney", this.S_SynMoney, this);
        this.register("S_CancelBetting", this.S_CancelBetting, this);
        this.register("S_Betting", this.S_Betting, this);
        // this.register("S_PlayGame", this.S_PlayGame, this);
        this.register("S_EnterGame", this.S_EnterGame, this);

        this.register("S_AddRoomPlayer", this.S_AddRoomPlayer, this);
        this.register("S_RemoveRoomPlayer", this.S_RemoveRoomPlayer, this);
        this.register("S_RobBanker", this.S_RobBanker, this);

        this.register("S_StartBetting", this.S_StartBetting, this);
        this.register("S_StartAward", this.S_StartAward, this);
        this.register("S_WinOrLose", this.S_WinOrLose, this);
        this.register("S_UpdatePlayers", this.S_UpdatePlayers, this);

        this.register("S_EndBetting", this.S_EndBetting, this);
        this.register("S_Activity_GetAvailableActivityList", this.S_Activity_GetAvailableActivityList, this);
        this.register("S_Activity_FetchSpecificActivityReward", this.S_Activity_FetchSpecificActivityReward, this);
        this.netWorkMgr.register("S_Activity_GetSpecificActivity", this.S_Activity_GetSpecificActivity, this)
    }

    addEveRegister() {


    }

    delEveRegister() {

    }
}