import { MainModule } from "../../MainModule";
import { LoginModule } from "../../../login/LoginModule";
import { SettingModule } from "../../../setting/SettingModule"
import { FriendModule as Freiend } from "../../../friend/FriendModule"
import { NoticeModule as Notice } from "../../../notice/NoticeModule"
import { ActivityModule as Activity } from "../../../activity/ActivityModule"
import { FeedbackModule as Feedback } from "../../../feedback/FeedbackModule"
import { MainModel } from "../../model/MainModel"
import { RankingListModule as Ranking } from "../../../ranking/RankingListModule"
import { ExchangeModule } from "../../../exchange/ExchangeModule"
import { MainController } from "../../controller/MainController"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNodeTopRight extends cc.Component {

    @property(cc.Button)
    btnReward: cc.Button = null;

    @property(cc.Button)
    btnRank: cc.Button = null;

    @property(cc.Button)
    btnExchange: cc.Button = null;

    @property(cc.Button)
    btnFeedback: cc.Button = null;

    @property(cc.Button)
    btnSetting: cc.Button = null;

    async onLoad() {

    }

    onDestroy() {

    }

    btnRewardCallBack() {
    }

    btnRankCallBack() {
        Ranking.instance.show();
    }

    btnExchangeCallBack() {
        MainController.instance.C_Activity_GetAvailableActivityList();
        let self=this;
        FuncUtil.delayFunc(function () {
            ExchangeModule.instance.show();
        }, 0.2, self.node)
        
    }

    btnFeedbackCallBack() {
        Feedback.instance.show();
    }

    btnSettingCallBack() {
        SettingModule.instance.show("main")
    }
}
