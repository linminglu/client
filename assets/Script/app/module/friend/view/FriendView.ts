import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { FriendModel as Model } from "../model/FriendModel";
import { FriendController as Ctr } from "../controller/FriendController";
import { FriendModule } from "../FriendModule";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendView extends BaseView {

    @property(cc.Button)
    btnFriendsList: cc.Button = null;
    @property(cc.Button)
    btnAddFriends: cc.Button = null;
    @property(cc.Node)
    frListScrView: cc.Node = null;
    @property(cc.Node)
    nodeAddFr: cc.Node = null;
    constructor() {
        super();
    }

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        this.frListScrView.active = true;
        this.nodeAddFr.active = false;
    }
    onDestroy() {
        super.destructor();
    }

    updateLabelFunc(eventName: string, args1: string, args2: number) {


    }
    changeDatFunc() {

    }
    btnCloseCallBack() {


    }
    btnShutCallBack() {
        this.frListScrView.active = true;
        this.nodeAddFr.active = false;
        FriendModule.instance.hide();
    }
    btnFrListCallBack() {
        if (!cc.isValid(this.node)) return;
        if (this.btnFriendsList.interactable) {
            ResCfg.loadPlist(this, "friends", function (self, atlas) {
                self.btnFriendsList.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`friends-btn_friends_list_1`);
                self.btnAddFriends.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`friends-btn_add_friends_0`);
            }, false)
            this.btnAddFriends.interactable = true;
            this.btnFriendsList.interactable = false;
            this.frListScrView.active = true;
            this.nodeAddFr.active = false;
            this.nodeAddFr.getComponent("NodeAddFriends").upDestroyContentDataFun();
        }
    }
    btnAddFrCallBack() {
        if (!cc.isValid(this.node)) return;
        if (this.btnAddFriends.interactable) {
            ResCfg.loadPlist(this, "friends", function (self, atlas) {
                self.btnAddFriends.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`friends-btn_add_friends_1`);
                self.btnFriendsList.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`friends-btn_friends_list_0`);
            }, false)
            this.btnAddFriends.interactable = false;
            this.btnFriendsList.interactable = true;
            this.frListScrView.active = false;
            this.nodeAddFr.active = true;
        }

    }

}