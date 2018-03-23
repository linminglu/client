import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { RoleModel as Model } from "../model/RoleModel";
import { RoleController } from "../controller/RoleController";
import { RoleModule } from "../RoleModule";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { FuncUtil } from "../../../common/util/FuncUtil";
import { GameManager } from "../../../common/manager/GameManager"
import { IconArr } from "../../../../GameConfig"


const { ccclass, property } = cc._decorator;

@ccclass
export default class RoleView extends BaseView {
    @property(cc.Button)
    btnConfirm: cc.Button = null;

    @property(cc.EditBox)
    txtname: cc.EditBox = null;

    dianji: number = 0;
    playerName: string = ""
    chgender: string = "female"
    sex: number = -1
    onLoad() {
        this.node.getChildByName("nodeBg").on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })

        Emitter.register(EmitterCfg.ROLE_DIANJI, this.pitchzhiix, this);
        this.localDataFun();
    }

    onDestroy() {

        Emitter.unregister(EmitterCfg.ROLE_DIANJI, this.pitchzhiix, this);
    }

    pitchzhiix(eventName: string, args1: number)     //  接收第几号头像
    {
        this.dianji = args1;
    }

    localDataFun()              //显示本地保存的数据
    {
        let playerMsg = GameManager.instance.getPlayerMsg()

        cc.find("noderole/nodeNickname/lblname", this.node).getComponent(cc.Label).string = playerMsg.playerName;
        let gamegold = FuncUtil.formatNum(playerMsg.gold)
        cc.find("noderole/nodeLabel/lblGold", this.node).getComponent(cc.Label).string = gamegold + "";
        cc.find("noderole/nodeLabel/sprID/lblID", this.node).getComponent(cc.Label).string = playerMsg.playerId + "";
        cc.find("noderole/nodeLabel/sprIP/lblIP", this.node).getComponent(cc.Label).string = playerMsg.loginIP;

        ResCfg.loadPlist(this, "common", function (self, Asste) {
            var Floret = Asste.getSpriteFrame(IconArr[playerMsg.iconId].icon);
            cc.find("noderole/nodebutton/btnHead", self.node).getComponent(cc.Sprite).spriteFrame = Floret
        })

        switch (playerMsg.updateFlag) {
            case 2:
                cc.find("noderole/nodebutton/btnModification", this.node).active = false
                break;
            case 4:
                cc.find("noderole/nodebutton/btnModification", this.node).active = false
                this.btnConfirm.node.active = false;
            case 3:
                if (playerMsg.sex == 0) {
                    this.chgender = "male"
                }
                else {
                    this.chgender = "female"
                }
                ResCfg.loadPlist(this, "role", function (self, Asste) {
                    let sprit = Asste.getSpriteFrame("btn_" + self.chgender);
                    cc.find("noderole/nodebutton/sprchgender", self.node).getComponent(cc.Sprite).spriteFrame = sprit
                })
                cc.find("noderole/nodebutton/btnGender", this.node).active = false
                break;

        }
    }
    //点击修改姓名
    btnModifynameFun() {
        this.txtname.string = cc.find("noderole/nodeNickname/lblname", this.node).getComponent(cc.Label).string;
        this.txtname.node.active = true
    }
    //点击修改性别
    btnSwitchgenderFun() {

        if (this.chgender == "female") {
            this.chgender = "male"
            this.sex = 0
        }
        else {
            this.chgender = "female"
            this.sex = 1
        }
        ResCfg.loadPlist(this, "role", function (self, Asste) {
            let sprit = Asste.getSpriteFrame("btn_" + self.chgender);
            cc.find("noderole/nodebutton/sprchgender", self.node).getComponent(cc.Sprite).spriteFrame = sprit
        })
    }
    //富文本 显示输入内容
    lblEditBoxclickingFun(data) {
        cc.find("noderole/nodeNickname/lblname", this.node).getComponent(cc.Label).string = data;
        this.playerName = data
    }
    //确定 发送
    btndetermine() {
        this.txtname.node.active = false
        this.ConfirmCallBack()
        RoleModule.instance.hide();
    }
    //头像发送
    btnSwitchheadFun() {
        var obj = {
            iconId: this.dianji,
            sex: -1,
        }
        RoleController.instance.C_UpdateIconId(obj)
        ResCfg.loadPlist(this, "common", function (self, Asste) {
            var Floret = Asste.getSpriteFrame(IconArr[self.dianji].icon);
            cc.find("noderole/nodebutton/btnHead", self.node).getComponent(cc.Sprite).spriteFrame = Floret
        })
        this.btnnodeHeadtrueFun()
    }

    //发送
    ConfirmCallBack() {

        let playerMsg = GameManager.instance.getPlayerMsg()
        var obj = {
            playerName: this.playerName,
            sex: this.sex,
        }

        RoleController.instance.C_UpdateIconId(obj)
    }
    //切换  信息界面
    btnnodeHeadtrueFun() {
        this.node.getChildByName("noderole").active = true;
        this.node.getChildByName("nodeHead").active = false;

    }
    //切换  头像界面
    btnnodeHeadFun() {
        this.node.getChildByName("noderole").active = false;
        this.node.getChildByName("nodeHead").active = true;

    }

    //退出
    btnCloseCallBack() {
        ////cc.log("btnCloseCallBack")
        RoleModule.instance.hide();
    }

}