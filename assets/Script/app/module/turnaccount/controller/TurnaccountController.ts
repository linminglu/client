import { BaseController } from "../../../common/baseui/BaseController";
import {TurnaccountModel} from "../model/TurnaccountModel"
export class TurnaccountController extends BaseController {
    

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: TurnaccountController = new TurnaccountController()

    //账变记录
    S_CostLog(mag){

        TurnaccountModel.instance.setCostLog(mag)
    }
    C_CostLog(param){  

        let msgName = "C_CostLog"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }
    //转账记录
    S_TransferRecord(mag){

        TurnaccountModel.instance.setTransferRecord(mag);
    }
    C_TransferRecord(param){
        let msgName = "C_TransferRecord"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }

    getTurnaccountint2Float(num:number){
        return this.int2Float(num);
    }
    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        TurnaccountController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {

        this.netWorkMgr.register("S_CostLog", this.S_CostLog, this);
        this.netWorkMgr.register("S_TransferRecord", this.S_TransferRecord, this);

    }

    addEveRegister() {
        
    }

    delEveRegister() {
    }
}