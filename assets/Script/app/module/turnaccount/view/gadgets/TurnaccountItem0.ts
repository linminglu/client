const {ccclass, property} = cc._decorator;
import { TurnaccountController } from "../../controller/TurnaccountController"
@ccclass
export default class TurnaccountItem0 extends cc.Component {

  

    onLoad() {
        
    }
    upDataTurnaccountFun0(data){
        let lblArr = this.node.children;
        let dataS = data
        let type = "转入"
        // for(let i = 1 ; i < 9 ; i++){
        //     lblArr[i].getComponent(cc.Label).string = "-"
        // }
        if(dataS.type){
            type = "转出"
        }
        lblArr[1].getComponent(cc.Label).string = dataS.orderId.toString()
        lblArr[2].getComponent(cc.Label).string = type;
        lblArr[3].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.applyMoney).toString();
        lblArr[4].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.poundageMoney).toString();
        lblArr[5].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.actualMoney).toString();
        lblArr[6].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.beforeMoney).toString();
        lblArr[7].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.afterMoney).toString();
        lblArr[8].getComponent(cc.Label).string = dataS.createTime.toString()
        
        /**optional int64 orderId = 1; //订单号
	optional int32 type = 2;//类型（0-转入 1-转出）
	optional int32 applyMoney = 3;//申请金额
	optional int32 poundageMoney = 4;//手续费
	optional int32 actualMoney = 5;//实际金额
	optional int32 beforeMoney = 6; //交易前金额
	optional int32 afterMoney = 7;//交易后金额
	optional string createTime = 8;//交易时间 */
        

    }
    lblInitFun(){
        let lblArr = this.node.children;
       for( let i = 1 ; i < 9 ;i++){
        lblArr[i].getComponent(cc.Label).string = "";
       }
    }
}
