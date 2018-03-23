const { ccclass, property } = cc._decorator;
import { RecordModel } from "../../model/RecordModel"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig";
@ccclass
export default class RecordFindItem extends cc.Component {

    @property(cc.Label)
    lblTxt: cc.Label = null;

    TxtName: string = "";

    C_numberS:number = null;
    onLoad() {
        //Emitter.register(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);

    }

    onDestroy() {
        //Emitter.unregister(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);
    }

    // changeOptionsMonitor(eventName: string, TxtName) {
    //     if(this.TxtName==TxtName){
    //         this.node.active=true
    //     }
    // }

    receiveRecordFindItemFun(data,num) {
        this.lblTxt.string = data;
        this.TxtName = data;
        //this.node.active = bool;
        this.C_numberS = num
    }
   
    btnChangeOptionsFun() {
        Emitter.fire(EmitterCfg.MAIN_ENTER_GAME,this.TxtName,this.C_numberS)
        //this.node.active = false;
        //  点击按钮发送
    }


}
