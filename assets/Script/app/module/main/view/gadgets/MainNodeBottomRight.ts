
import { MainModule } from "../../MainModule";
import { LoginModule } from "../../../login/LoginModule";
import {SettingModule} from "../../../setting/SettingModule"
import {FriendModule as Freiend} from "../../../friend/FriendModule"
import {NoticeModule as Notice } from  "../../../notice/NoticeModule"
import {ActivityModule as Activity} from "../../../activity/ActivityModule"
import {FeedbackModule as Feedback} from "../../../feedback/FeedbackModule"
import {MainModel} from "../../model/MainModel"


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNodeBottomRight extends cc.Component {

    @property(cc.Button)
    btnFriend: cc.Button = null;

    @property(cc.Button)
    btnActivity: cc.Button = null;

    @property(cc.Button)
    btnNotice: cc.Button = null;

    async onLoad() {
        
    }

    onDestroy(){
        
    }

    btnFriendCallBack() {
        Freiend.instance.show();
    }

    btnActivityCallBack() {
        Activity.instance.show();
    }

    btnNoticeCallBack() {
        Notice.instance.show();
    }
}
