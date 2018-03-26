import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { ServerStateArr } from "../../../../../GameConfig"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import {LoginModel} from "../../model/LoginModel"

const { ccclass, property } = cc._decorator;

@ccclass
export default class ServeItem extends cc.Component {

    data: any = null;

    @property(cc.Sprite)
    sprServeBg: cc.Sprite = null;

    @property(cc.Label)
    lblServe: cc.Label = null;

    @property(cc.Sprite)
    sprState: cc.Sprite = null;

    @property(cc.Label)
    lblState: cc.Label = null;

    onLoad() {
        let self = this

        this.sprServeBg.node.active = false

        this.node.on('touchstart', function (event) {
            self.touchstartCallBack();
        }, this);

        this.node.on('touchend', function (event) {
            self.touchendCallBack();
        }, this);
    }

    touchstartCallBack() {
        this.sprServeBg.node.active = true
    }

    touchendCallBack() {
        this.sprServeBg.node.active = false

        LoginModel.getInstance().setCurServerData(this.data)
    }

    updateListView(data) {
        this.data = data
        let stateArr = ServerStateArr[data.severState - 1]

        this.lblServe.string = data.serverName
        this.lblState.string = stateArr.stateStr

        ResCfg.loadPlist(this, "login", function (self, atlas, plistName) {
            self.sprState.spriteFrame = atlas.getSpriteFrame(`server-${stateArr.stateImg}`);
        });
    }
}
