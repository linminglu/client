import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";

import {LoginModel} from "../../model/LoginModel"
import {LoginController} from "../../controller/LoginController"

import { ServerStateArr } from "../../../../../GameConfig"
import {FactoryUtil} from "../../../../common/util/FactoryUtil"
import { FuncUtil } from "../../../../common/util/FuncUtil"

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-1)
export default class NodeServe extends cc.Component {
    canSend = true
    curSerData = null

    @property(cc.Node)
    serveScrollView: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Button)
    btnSelectServe: cc.Button = null;
    
    @property(cc.Button)
    btnAffirm: cc.Button = null;

    @property(cc.Label)
    lblServe: cc.Label = null;

    @property(cc.Sprite)
    sprState: cc.Sprite = null;

    @property(cc.Label)
    lblState: cc.Label = null;

    @property(cc.Label)
    lblTip: cc.Label = null;

    data = []

    onLoad() {
        LoginModel.getInstance().registerModelChanged("LOGIN_SELECT_SEVER", this.changeSelectServerFunc, this);
        
        Emitter.register(EmitterCfg.LOGIN_HTTP_LOGIN, this.updateSeverDataCallBack, this);
        Emitter.register(EmitterCfg.GLOBAL_NET_WORK_CLOSED, this.netWorkClosed, this)

        this.serveScrollView.active = false
        this.btnSelectServe.node.rotation = 0

        this.updateListView();
        this.updateServerView()
    }

    onDestroy() {
        LoginModel.getInstance().unregisterModelChanged("LOGIN_SELECT_SEVER", this.changeSelectServerFunc, this)

        Emitter.unregister(EmitterCfg.LOGIN_HTTP_LOGIN, this.updateSeverDataCallBack, this);
        Emitter.unregister(EmitterCfg.GLOBAL_NET_WORK_CLOSED, this.netWorkClosed, this)
    }

    initView(data) {
        this.lblTip.node.active = !data

        this.lblServe.node.active = data
        this.sprState.node.active = data
        this.lblState.node.active = data
    }

    updateSeverDataCallBack(eventName: string, data: any, args2: number) {
        this.node.active = true

        this.updateListView();
    }

    updateServerView() {
        let data = LoginModel.getInstance().getCurServerData()
        this.curSerData = data
        this.initView(data)

        if (data) {
            let stateArr = ServerStateArr[data.severState - 1]
            this.lblServe.string = data.serverName
            this.lblState.string = stateArr.stateStr
    
            ResCfg.loadPlist(this, "login", function (self, atlas, plistName) {
                self.sprState.spriteFrame = atlas.getSpriteFrame(`server-${stateArr.stateImg}`);
            });
        }
    }

    updateViewState() {
        this.node.active = false
    }

    changeSelectServerFunc() {
        this.updateServerView()
        this.btnSelectServeCallBack()
    }

    updateListView() {
        this.data = LoginModel.getInstance().getServerList()
        if (! this.data) {
            return
        }

        this.content.removeAllChildren()

        ResCfg.loadPrefab(this, "serveItem", function (self, prefab) {
            let CommServeItem = null;

            for (let data of self.data) {
                CommServeItem = cc.instantiate(prefab);
                self.content.addChild(CommServeItem);
                CommServeItem.getComponent("ServeItem").updateListView(data);
            }
        }, false, true);
    }

    btnSelectServeCallBack() {
        this.serveScrollView.active = !this.serveScrollView.active

        let rotation = 0
        if (this.btnSelectServe.node.rotation == 0) {
            rotation = 180
        }
        this.btnSelectServe.node.rotation = rotation
    }
    
    btnAffirmsendDataFun() {
        let self = this
        if (self.canSend) {
            self.canSend = false
            if (!self.curSerData) {
                FactoryUtil.createAlertConfirmView(`请选择服务器！`)
                return
            }
            LoginController.getInstance().connectNet(self.curSerData)
        }
    }

    netWorkClosed() {
        this.canSend = true
    }
}
