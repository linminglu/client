import { EmitterManager as Emitter } from "../manager/EmitterManager";
import { EmitterCfg } from "../../../app/config/EmitterConfig";
import { FactoryUtil } from "../util/FactoryUtil";
import { IconArr } from "../../../GameConfig";
import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { FriendController } from "../../module/friend/controller/FriendController";
import { FriendModel } from "../../module/friend/model/FriendModel";
import { ChatModule } from "../../module/chat/ChatModule";
import { FriendModule } from "../../module/friend/FriendModule";
import { PacketModel } from "../../module/packet/model/PacketModel";
import { PacketModule } from "../../module/packet/PacketModule";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LayPlayerItem extends cc.Component {
    @property(cc.Label)
    lblName: cc.Label = null;

    @property(cc.Label)
    lblOnlineState: cc.Label = null;

    @property(cc.Sprite)
    sprHeadImage: cc.Sprite = null;

    @property(cc.Button)
    btnAdd:cc.Button = null;

    @property(cc.Button)
    btnInvite:cc.Button = null;

    @property(cc.Node)
    nodeLeave:cc.Node = null;

    playerData: any = null;
    addPlaData: any = null;
    // nodeName:cc.Node=null
    param: any = {
        deletePlayerId: null
    }
    onLoad() {
        FriendModel.instance.registerModelChanged("MAIN_DELFRIENDDATA_CHANGE", this.upDelPlayerDataFun, this);
    }
    onDestroy() {
        FriendModel.instance.unregisterModelChanged("MAIN_DELFRIENDDATA_CHANGE", this.upDelPlayerDataFun, this);
    }
    upDataFriendsFun(data) {
        ////////////cc.log(data);
        this.playerData = data;
        this.lblName.string = this.playerData.playerName.toString();
        if (this.playerData.exitTime == 0) {

            this.lblOnlineState.string = "在线";
        } else {
            this.lblOnlineState.string = "下线";
            this.btnAdd.interactable = false;
            this.btnInvite.interactable = false;
            this.nodeLeave.opacity = 255/2;
        }
        ResCfg.loadPlist(this, "common", function (self, sprit) {
            let headPath = sprit.getSpriteFrame(IconArr[self.playerData.iconId.toString()].icon)
            self.sprHeadImage.spriteFrame = headPath;
        })
    }
    upAddFriendsFun(data) {
        this.addPlaData = data.playerMsg;
        this.lblName.string = this.addPlaData.playerName.toString();
        if (this.addPlaData.exitTime == 0) {

            this.lblOnlineState.string = "在线";
        } else {

            this.lblOnlineState.string = "下线";
        }
        ResCfg.loadPlist(this, "common", function (self, sprit) {
            let headPath = sprit.getSpriteFrame(IconArr[self.addPlaData.iconId.toString()].icon)
            self.sprHeadImage.spriteFrame = headPath
        })
    }
    btnDelPlaCallBack() {
        let self = this;
        FactoryUtil.createAlertView({
            tipStr: "是否要删除该好友？",
            cancelObj: {
                txtName: "common-txt_cancel",          //图片名
                callBack: function () {     //按钮回调
                }
            },
            confirmObj: {
                txtName: "common-txt_confirm",         //图片名
                callBack: function () {      //按钮回调
                    self.param = {
                        deletePlayerId: self.playerData.playerId
                    }
                    FriendController.instance.C_DeleteFriend(self.param)
                }
            },
        })
    }
    upDelPlayerDataFun() {
        if (this.playerData == null) return;
        if (this.playerData.playerId == this.param.deletePlayerId) {
            this.playerData = null;
            Emitter.fire(EmitterCfg.MAIN_Del_FRIEND, this.param.deletePlayerId);
            this.node.destroy();
        }
    }

    btnAddRoomCallBack() {

    }
    btnAddFriendCallBack() {
        let param = {
            applyPlayerId: this.addPlaData.playerId
        }
        FriendController.instance.C_AddFriend(param);
    }
    btnInvitePlaCallBack() {


    }
    
    btnChatPlaCallBack_1() {
        ChatModule.instance.show();
        Emitter.fire(EmitterCfg.DIALOGUE_NAME, 2, this.playerData.playerName, this.playerData.playerId);
        FriendModule.instance.hide();
    }

    btnChatPlaCallBack_2() {
        ChatModule.instance.show();
        Emitter.fire(EmitterCfg.DIALOGUE_NAME, 2, this.addPlaData.playerName, this.addPlaData.playerId);
        FriendModule.instance.hide();
    }

    btnPacketCallBack() {
        
        PacketModel.instance.setChioiceFun(2,"main")
        PacketModel.instance.setdepositPlayerdata(this.playerData.playerName,this.playerData.playerId)
        PacketModule.instance.show()
                
    }

}

