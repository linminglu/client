import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { SignModel as Model } from "../model/SignModel";
import { SignController } from "../controller/SignController";
import { SignModule } from "../SignModule";
import { AudioManager } from "../../../common/manager/AudioManager"
import { ChatModule } from "../../chat/ChatModule"
import { Week } from "../../../../GameConfig"
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { MainController } from "../../main/controller/MainController";
const { ccclass, property } = cc._decorator;
@ccclass
export default class SignView extends BaseView {

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        this.GenerateWeekFun()
        this.ReceiveDateFun()
        this.lblNumberOfCheck()
        Model.instance.registerModelChanged("SIGN_SEND_CHECK_IN", this.MonitorDate, this);
    }
    onDestroy() {
        Model.instance.unregisterModelChanged("SIGN_SEND_CHECK_IN", this.MonitorDate, this);
    }

    MonitorDate(eventName: string, ager1: number) {
        this.lblNumberOfCheck()
        let now = new Date();
        let dateJT = now.getDate();//得到日期
        let SignHistoy = Model.instance.getSignHistoy()
        if (SignHistoy[dateJT - 1] == 1) {
            this.node.getChildByName("btnsign").getComponent(cc.Button).interactable = false;
        }
        if (ager1 + 1 == dateJT) {
            this.node.getChildByName("btnsign").getComponent(cc.Button).interactable = false;
            this.node.getChildByName("btnbusign").getComponent(cc.Button).interactable = false;
        }

    }

    GenerateWeekFun() {
        ResCfg.loadPrefab(this, "weekItem", function (self, prefab) {
            for (let i = 0; i < 7; i++) {
                let curItem = cc.instantiate(prefab);
                self.node.getChildByName("nodeWeek").addChild(curItem);
                curItem.getChildByName("lblWeek").getComponent(cc.Label).string = Week[i];
                if (i == 6) {
                    curItem.getChildByName("sprdivision").active = false
                }
            }
        })
    }

    ReceiveDateFun() {

        ResCfg.loadPrefab(this, "dateItem", function (self, prefab) {
            let date = new Date();
            date.setDate(1);
            let curDate = new Date();
            let curMonth = curDate.getMonth();
            curDate.setMonth(curMonth + 1);
            curDate.setDate(0);
            let one = date.getDay()      //第一天
            let daytrue = false          //开始
            let day = 0;                 //天数
            let dateday = date.getDate();
            let Last = curDate.getDate();//本月有多少天
            let signHistoy = Model.instance.getSignHistoy()
            for (let i = 0; i < 42; i++) {
                let curItem = cc.instantiate(prefab);
                self.node.getChildByName("nodeDate").addChild(curItem);
                if (i == one) {
                    daytrue = true
                }
                if (daytrue) {
                    let hign = signHistoy[day]
                    day++;
                    if (hign) {
                        curItem.getComponent("DateItem").DateItemFun("Signed", day)
                    } else {
                        curItem.getComponent("DateItem").DateItemFun("Nosign", day)
                    }
                } else {
                    curItem.getComponent("DateItem").DateItemFun("blank", 0)
                }
                if (day == Last) {
                    daytrue = false;
                }
            }
        })
    }

    lblNumberOfCheck() {

        let SignInInfo = Model.instance.getSignInInfo()
        cc.log("---------------------------------------------------")
        cc.log(SignInInfo)
        cc.log("---------------------------------------------------")
        if (SignInInfo == null) {
            this.lblNumberOfChecknull();
            return;
        }
        let SignHistoy = Model.instance.getSignHistoy()
        let Dates = new Date();
        let dateJT = Dates.getDate();//得到日期
        if (SignHistoy[dateJT - 1] == 1) {
            this.node.getChildByName("btnsign").getComponent(cc.Button).interactable = false;
        }

        let integral = SignInInfo.integral
        let value = SignInInfo.count
        let consume = SignInInfo.consume
        let curMonthDays = SignInInfo.continueDay
        let last = curMonthDays - value

        this.node.getChildByName("lblAccumulated").getComponent(cc.Label).string = "您需完成一局游戏才可签到（补签消耗" + consume + "活动积分）";
        this.node.getChildByName("lblIntegral").getComponent(cc.Label).string = "活动积分：" + integral;
        this.node.getChildByName("lblPrompt").getComponent(cc.Label).string = "本月已累计" + value + "天，再签到" + last + "天可额外获得500活动积分。";
    }

    lblNumberOfChecknull() {
        this.node.getChildByName("lblIntegral").getComponent(cc.Label).string = "";
        this.node.getChildByName("lblPrompt").getComponent(cc.Label).string = "";
        this.node.getChildByName("btnsign").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("btnbusign").getComponent(cc.Button).interactable = false;
    }
    btnCloseCallBackFun() {
        Model.instance.informationReception(false);
        SignModule.instance.hide();
    }

    btnHavesigned() {
        let signrid = Model.instance.getsignrid()

        SignController.instance.C_SignIn(signrid, 0)
    }

    btnRetroactive() {
        let signrid = Model.instance.getsignrid()
        SignController.instance.C_SignIn(signrid, 1)
    }
}