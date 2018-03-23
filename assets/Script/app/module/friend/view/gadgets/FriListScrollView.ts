
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { FriendModel } from "../../model/FriendModel"
import { FriendController } from "../../controller/FriendController"
const { ccclass, property } = cc._decorator;
@ccclass
export default class FriListScrollView extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Node)
    NodeAddFriendsContent: cc.Node = null;
    blr:boolean =false;
    param = {};
    freiendData: any = null;
    async onLoad() {
       // this.freiendData = FriendModel.instance.getFreiendData();
        //if (this.freiendData == null) {
            FriendController.instance.C_FriendList(this.param);
        //} else {
            //this.upDataFriListFun(this.freiendData);
       // }
        FriendModel.instance.registerModelChanged("MAIN_FRIENDDATA_CHANGE", this.upDataFriendListFun, this);
        FriendModel.instance.registerModelChanged("MAIN_ADDFRIENDDATA_CHANGE", this.upAddDataFriendFun, this);
        Emitter.register(EmitterCfg.MAIN_Del_FRIEND, this.upDelPlqyerDataFun, this);
    }
    onDestroy() {
        FriendModel.instance.unregisterModelChanged("MAIN_FRIENDDATA_CHANGE", this.upDataFriendListFun, this);
        FriendModel.instance.unregisterModelChanged("MAIN_ADDFRIENDDATA_CHANGE", this.upAddDataFriendFun, this);
        Emitter.unregister(EmitterCfg.MAIN_Del_FRIEND, this.upDelPlqyerDataFun, this);
    }
    upDataFriListFun(data) {
        var dataArr = data;
        this.content.removeAllChildren(false);
        ResCfg.loadPrefab(this, "layPlayerItem", function (self, prefab) {
            let curView = null;
            for (var index in dataArr.friendList) {
                curView= cc.instantiate(prefab);
                curView.getComponent("LayPlayerItem").upDataFriendsFun(dataArr.friendList[index]);
                self.content.addChild(curView);
            }
        }, false, true)
    }

    upDataPlayerFun(data)
    {
        var dataPlayer = data.friendMsg;
        ResCfg.loadPrefab(this, "layPlayerItem", function (self, prefab) {
                let curView = null;
                curView= cc.instantiate(prefab);
                curView.getComponent("LayPlayerItem").upDataFriendsFun(dataPlayer);
                self.content.addChild(curView);
        }, false, true)

    }
        
    upDataFriendListFun(eventName: string, data) {
        if (data == null || data == undefined) return;
        this.freiendData = data
        this.upDataFriListFun(data);  
    }
    upAddDataFriendFun(eventName: string, data) {
        if (data == null || data == undefined) return;
        this.NodeAddFriendsContent.removeAllChildren(false);
        this.freiendData.friendList.push(data.friendMsg);
        this.upDataPlayerFun(data);
       // this.upDataFriListFun(this.freiendData);
    }
    upDelPlqyerDataFun(eventName: string, data) {
        if (data == null || data == undefined) return;
        let len = this.freiendData.friendList.length;
        if (len == 1) {
            this.freiendData.friendList = [];
            return;
        }
        for (let i = 0; i < len; i++) {
            if (this.freiendData.friendList[i].playerId == data) {
                for (let j = i; j < len; j++) {
                    this.freiendData.friendList[j] = this.freiendData.friendList[j + 1];
                }
                this.freiendData.friendList.pop();
                break;
            }
        }
        this.upDataFriListFun(this.freiendData);
    }

}
