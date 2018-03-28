const { ccclass, property } = cc._decorator;
import { PacketModel } from "../../model/PacketModel";
import { PacketModule } from "../../PacketModule";
import { PacketController } from "../../controller/PacketController";
import { FactoryUtil } from "../../../../common/util/FactoryUtil";
import { GameManager } from "../../../../common/manager/GameManager"
import { TweenMsgView } from "../../../../common/ui/TweenMsgView"
@ccclass
export default class Packethair extends cc.Component {

    Oneonone = null;
    manyPeople = null;

    playerName: string = null;
    playerId: number = null;

    //金额
    money: number = null;
    //数量
    individual: number = null;
    //备注
    remarks: string = null;
    //发红包的类型
    packetype: boolean = true;


    onLoad() {
    }

    onDestroy() {

    }

    //钱
    InputMoneyFun(txt) {
        
        if(isNaN(parseFloat(txt))){
            this.money = null;
            return
        }
        this.money = parseFloat(txt)
   
       
    }
    //数量
    InputIndividualFun(txt) {

        if(isNaN(parseFloat(txt))){
            this.individual = null;
            return
        }
        this.individual = parseFloat(txt)
    }
    //备注
    InputRemarksFun(txt) {
        this.remarks = txt
    }
    //一对一
    hairOneononeFun() {
        this.packetype = true;
        this.Oneonone = this.node.getChildByName("Oneonone")
        this.Oneonone.active = true
        let playerData = PacketModel.instance.getdepositPlayerdata()
        this.playerName = playerData.playerName;
        this.playerId = playerData.playerrId;
        this.displayTheSendingPlayer();

    }


    //多发
    hairmanyPeopleFun() {
        this.packetype = false;
        this.manyPeople = this.node.getChildByName("manyPeople")
        this.manyPeople.active = true
        //this.displayTheSendingPlayer();
    }
    //关闭发红包
    hairOneononemanyPeoplefalse() {
        this.Oneonone = this.node.getChildByName("Oneonone")
        this.manyPeople = this.node.getChildByName("manyPeople")
        this.Oneonone.active = false
        this.manyPeople.active = false
    }


    displayTheSendingPlayer() {
        let toWhom = this.Oneonone.getChildByName("lblGameplayer")
        toWhom.getComponent(cc.Label).string = "给" + this.playerName + "玩家发送红包"
    }

    btnOneononeDetermineFun() {

        if (this.money != null) {
            if (this.money < 0 || this.money > 200) {
                FactoryUtil.createAlertConfirmView("请输入正确的的金额！\n(红包的最大金额为200)")
                return
            }
        } else {
            FactoryUtil.createAlertConfirmView("请输入正确的的金额！\n(红包的最大金额为200)")
            return
        }
        if (this.remarks == null) {
            this.remarks = "恭喜发财！大吉大利！"
        }
        let obj = null
        this.money *= 100;
        if (this.packetype) {
            obj = {
                playerId: this.playerId,
                mailTitle: this.remarks,
                mailContent: "",
                attachment: [{
                    key: 0,
                    value: this.money,
                }]
            }
        }
        PacketController.instance.C_Mail_SendMail(obj);
        TweenMsgView.getInstance().showMsg(7)
        PacketModule.instance.hide();
    }

    btnhairmanyPeopleFun() {
        if (this.money != null) {
            if (this.money < 0 || this.money > 200) {
                FactoryUtil.createAlertConfirmView("请输入正确的的金额！\n(红包的最大金额为200)")
                return
            }
        } else {
            FactoryUtil.createAlertConfirmView("请输入正确的的金额！\n(红包的最大金额为200)")
            return
        }
        let UpperLimit = GameManager.instance.getredenvelopes();
        cc.log(this.individual)
        if (this.individual != null) {
            if (this.individual < 1 || this.individual > UpperLimit) {
                FactoryUtil.createAlertConfirmView("请输入正确的的数量！\n(红包数量不能大于玩家列表人数)")
                return
            }
        } else {
            FactoryUtil.createAlertConfirmView("请输入正确的的数量！\n(红包数量不能大于玩家列表人数)")
            return
        }
        if (this.remarks == null) {
            this.remarks = "恭喜发财！大吉大利！"
        }
        let obj = null
        this.money *= 100;
        obj = {
            playerId: this.playerId,
            mailTitle: this.remarks,
            mailContent: "",
            attachment: [{
                key: 0,
                value: this.money,
            }],
            receivedCount: this.individual
        }
        cc.log(obj)
        PacketController.instance.C_Mail_SendMail(obj);
        TweenMsgView.getInstance().showMsg(7)
        PacketModule.instance.hide();
    }



}
