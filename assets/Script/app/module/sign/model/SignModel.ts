/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { FactoryUtil } from "../../../common/util/FactoryUtil";
import { SignModule } from "../SignModule";
import { GameManager } from "../../../common/manager/GameManager"
let synNotice: any = []

export class SignModel extends BaseModel {

    private signInInfo = null                  //签到内容
    private signrid = null;                      //活动排期
    private signHistoy = []                    //已签到天数
    private buttonws: boolean = false

    OneSignADay() {

        let todayDate = new Date();
        let playerMsg = GameManager.instance.getPlayerMsg()
        let wodrid = playerMsg.playerId
        let date = todayDate.getDate();
        let month = todayDate.getMonth() + 1;
        let year = todayDate.getFullYear();
        let dateweek = wodrid + "" + year + "" + month + "" + date + "";
        let signstr="SIGNADAY"+wodrid;
        let Signed = cc.sys.localStorage.getItem(signstr)
        if (dateweek != Signed) {
            cc.sys.localStorage.setItem(signstr, dateweek)
            return true
        }
        return false
    }

    SendACheckIn(msg) {
        let now = new Date();
        let date = now.getDate();//得到日期
        if (msg.result == 0) {
            FactoryUtil.createAlertConfirmView("操作失败!")
        } else if (msg.result == 1) {

            this.changedModel("SIGN_SEND_CHECK_IN", date)
        } else if (msg.result == 2) {
            this.setSignHistoy()
        }
    }

    storageSignInInfo(msg) {
        this.signInInfo = msg
        this.signrid = msg.activitySeq
        for (let i = 0; i < 31; i++) {
            this.signHistoy[i] = 0;
        }
        this.splitsignHistoy(msg.signHistoy)
    }

    splitsignHistoy(strHistoy) {

        if (strHistoy.length == 0) return;
        let arr = strHistoy.split(",")
        let arrHistoy = arr.map(function (el) { return parseInt(el); });

        for (let i = 0; i < arrHistoy.length; i++) {
            this.signHistoy[arrHistoy[i] - 1] = 1;
        }
   
    }

    setSignHistoy() {
        for (let i = 0; i < this.signHistoy.length; i++) {
            if (this.signHistoy[i] == 0) {
               
                let Dates = new Date();
                let dateJT = Dates.getDate();//得到日期
                this.changedModel("SIGN_SEND_CHECK_IN", i)
                break;
            }
        }
    }

    getSignHistoy() {
        return this.signHistoy;
    }

    getsignrid() {
        return this.signrid;
    }

    getSignInInfo() {
        return this.signInInfo;
    }


    informationReception(bool) {
        this.buttonws = bool
    }

    getinformationReception() {
        return this.buttonws
    }


    destructor() {
        super.destructor();
        SignModel.instance = null;
    }

    public static instance: SignModel = new SignModel()

    private constructor() {
        super();
    }
}