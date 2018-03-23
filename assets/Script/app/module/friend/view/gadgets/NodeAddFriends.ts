
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { FriendModel } from "../../model/FriendModel"
import { FriendController } from "../../controller/FriendController"
import { FactoryUtil } from "../../../../common/util/FactoryUtil"
const { ccclass, property } = cc._decorator;
@ccclass
export default class NodeAddFriends extends cc.Component {

    @property(cc.EditBox)
    edbxSeekPlayer: cc.EditBox = null;
    @property(cc.Node)
    content: cc.Node = null;
    playerNameStr: string = "";
    param: any = null;
    onLoad() {

        FriendModel.instance.registerModelChanged("MAIN_SEARCHPLAYERDATA_CHANGE", this.upDataFriendFun, this);
    }
    onDestroy() {
        FriendModel.instance.unregisterModelChanged("MAIN_SEARCHPLAYERDATA_CHANGE", this.upDataFriendFun, this);
    }
    upSeekBoxDataFun() {

    }
    btnSeekBoxDataCallBack() {
        this.playerNameStr = this.edbxSeekPlayer.string;
        this.param = {
            type: 1,                               //1：角色编号  2：角色名称		
            value: this.playerNameStr              // 输入值
        }
        if (this.playerNameStr == null || this.playerNameStr == "") {
            FactoryUtil.createAlertConfirmView("请输入玩家ID！")
        } else {
            this.checkValue(this.playerNameStr)
        }
        this.upDestroyContentDataFun();
    }
    upSendPlayerDataFun(data) {
        ResCfg.loadPrefab(this, "laySearchPlayerItem", function (self, prefab) {
            let curView: any = null;
            // for(var index in self.data){
            curView = cc.instantiate(prefab);
            curView.getComponent("LayPlayerItem").upAddFriendsFun(data, self.content);
            self.content.addChild(curView);
            //  }
        }, false, true)

    }
    upDataFriendFun(eventName: string, data) {
        this.upSendPlayerDataFun(data)
    }
    checkValue(number) {
        if (isNaN(number)) {
            FactoryUtil.createAlertConfirmView("含有非法字符！")
        } else {
            FriendController.instance.C_ShowPlayer(this.param);
        }
    }


    upDestroyContentDataFun() {
        this.edbxSeekPlayer.string = "";
        this.content.removeAllChildren(false);
    }


}
