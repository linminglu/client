import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { LoginController as Ctr } from "../../controller/LoginController";
import { AnimationMgr } from "../../../../common/manager/AnimationMgr";
import { FactoryUtil } from "../../../../common/util/FactoryUtil"
import { FuncUtil } from "../../../../common/util/FuncUtil"

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-1)
export default class LoginLayout extends cc.Component {
    canSend = true
    loginStateStr: string = "验证账号";
    times = 0
    showStr: string = "验证账号"

    @property(cc.Button)
    btnClose: cc.Button = null;

    @property(cc.Button)
    btnConfirmLogin: cc.Button = null;

    @property(cc.Label)
    lblLoginState: cc.Label = null;

    @property(cc.EditBox)
    edbxAccount: cc.EditBox = null;
    accountStr: string = "";

    @property(cc.EditBox)
    edbxPassword: cc.EditBox = null;
    passwordStr: string = "";

    constructor() {
        super();
    }

    onEnable() {
        // let self = this
        // FuncUtil.delayFunc(function() {
        //     self.showLoginState();
        // }, 0.1)
    }

    onLoad() {
        Emitter.register(EmitterCfg.LOGIN_CONFIRM_LOGIN, this.showConfirmLoginCallBack, this);
        Emitter.register(EmitterCfg.LOGIN_HTTP_LOGIN, this.updateFunateSeverDataCallBack, this);
        
        // let anim = new AnimationMgr(this.node.getChildByName("animLogin"), "login")
        // anim.play()

        this.accountStr = cc.sys.localStorage.getItem("LOGIN_CCOUNT") || "";
        this.passwordStr = cc.sys.localStorage.getItem("LOGIN_PASSWORD") || "";

        this.edbxAccount.string = this.accountStr;
        this.edbxPassword.string = this.passwordStr;

        this.lblLoginState.node.active = false;
        this.btnConfirmLogin.node.active = true;
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.LOGIN_CONFIRM_LOGIN, this.showConfirmLoginCallBack, this);
        Emitter.unregister(EmitterCfg.LOGIN_HTTP_LOGIN, this.updateFunateSeverDataCallBack, this);
        // this.unscheduleAllCallbacks();
        this.unschedule(this.updateFun);

        this.node.stopAllActions()
    }

    btnCloseCallBack() {
        this.node.active = false
        Emitter.fire(EmitterCfg.LOGIN_SHOW_STATE, true);

        // this.unscheduleAllCallbacks();
        this.unschedule(this.updateFun);
    }

    btnConfirmLoginCallBack() {
        this.accountStr = this.edbxAccount.string;
        this.passwordStr = this.edbxPassword.string;
        // ////cc.log(`--btnConfirmLoginCallBack ${this.accountStr}， ${this.passwordStr}`);

        if (this.accountStr == "") {
            FactoryUtil.createAlertConfirmView("请输入账号！")
            return;
        } else if (this.passwordStr == "") {
            FactoryUtil.createAlertConfirmView("请输入密码！")
            return;
        }

        this.showLoginState()
        let self = this
        if (self.canSend) {
            // self.canSend = false
            // FuncUtil.delayFunc(function () {
                // self.canSend = true
            // }, 0.5, self.node)

            Ctr.instance.confirmLoginFunc(self.accountStr, self.passwordStr)

            FuncUtil.delayFunc(function() {
                self.showConfirmLoginCallBack()
            }, 5, self.node)
        }
    }

    updateFun() {
        this.showStr = this.showStr + ".";
        if (cc.isValid(this.lblLoginState)) {
            this.lblLoginState.string = this.showStr;
        }
        // ////cc.log("--updateFun ", this.times)
        this.times = this.times + 1;
        if (this.times == 4) {
            this.times = 0;
            this.showStr = this.loginStateStr;
        }
    }

    showLoginState() {
        if (cc.isValid(this.lblLoginState)) {
            this.lblLoginState.node.active = true;
            this.btnConfirmLogin.node.active = false;

            // this.schedule(this.updateFun, 0.4, 100, 1);
            this.schedule(this.updateFun, 0.4);
        }
    }

    showConfirmLoginCallBack() {
        this.lblLoginState.node.active = false;
        this.btnConfirmLogin.node.active = true;
    }

    updateFunateSeverDataCallBack() {
        this.node.active = false
    }

    edbxAccountReTCallBack() {
    }

    edbxPasswordReTCallBack() {
    }
}