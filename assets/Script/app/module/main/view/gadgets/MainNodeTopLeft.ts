import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { RoleModule } from "../../../role/RoleModule"
import { SignModel } from "../../../sign/model/SignModel"
import { SignModule } from "../../../sign/SignModule"
import { SignController } from "../../../sign/controller/SignController"
import { MainController } from "../../controller/MainController"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { TurnaccountModule } from "../../../turnaccount/TurnaccountModule"
import { IconArr } from "../../../../../GameConfig"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNodeTopLeft extends cc.Component {
    @property(cc.Label)
    lblRoleName: cc.Label = null;

    @property(cc.Label)
    lblRoleGold: cc.Label = null;

    @property(cc.Sprite)
    sprHead: cc.Sprite = null;

    @property(cc.Button)
    btnAdd: cc.Button = null;

    playerMsg: PlayerMsg = null;

    async onLoad() {
        GameManager.instance.registerModelChanged("COMMON_PLAYER_CHANGE", this.playerMsgChange, this);
        GameManager.instance.registerModelChanged("COMMON_UPDATE_GOLD_CHANGE", this.updateGoldChange, this);
        Emitter.register(EmitterCfg.GAME_EXIT_SUCC, this.monitorSignCallBackFun, this)
        this.playerMsgChange()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_PLAYER_CHANGE", this.playerMsgChange, this);
        GameManager.instance.unregisterModelChanged("COMMON_UPDATE_GOLD_CHANGE", this.updateGoldChange, this);
        Emitter.unregister(EmitterCfg.GAME_EXIT_SUCC, this.monitorSignCallBackFun, this)
    }

    updateGoldChange() {
        this.playerMsg = GameManager.instance.getPlayerMsg()
        this.lblRoleGold.string = FuncUtil.formatNum(this.playerMsg.gold);
    }

    playerMsgChange() {
        this.playerMsg = GameManager.instance.getPlayerMsg();

        this.lblRoleName.string = this.playerMsg.playerName;

        ResCfg.loadPlist(this, "common", function (self, sprit) {
            let headPath = sprit.getSpriteFrame(IconArr[self.playerMsg.iconId.toString()].icon)
            self.sprHead.spriteFrame = headPath
        })

        this.lblRoleGold.string = FuncUtil.formatNum(this.playerMsg.gold);
    }

    btnheadroleFun() {
        RoleModule.instance.show();
    }
    btnAddRechargeCallBack() {
        TurnaccountModule.instance.show();
    }
    btnAddCallBack() {
        // MainController.instance.C_UpdateIconId({ iconId: 1001 })
    }


    monitorSignCallBackFun() {

        cc.log("monitorSignCallBackFun----------------------------------------------")
        let Signed = SignModel.instance.OneSignADay()
        cc.log(Signed)
        if (Signed) {
            this.btnSignCallBackFun()
        }
    }
    btnSignCallBackFun() {

        //SignModel.instance.informationReception(true);

        MainController.instance.C_Activity_GetAvailableActivityList();
        let self = this;
        FuncUtil.delayFunc(function () {
            SignModule.instance.show()
        }, 0.2, self.node)

    }
}