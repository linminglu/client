const {ccclass, property} = cc._decorator;
import { RecordController } from "../../controller/RecordController"
@ccclass
export default class RecordTypeItem6 extends cc.Component {



    onLoad() {
        
        
    }
    recordGameTypeDataFun(data){
        let totalsListArr = data.totalsList
        let lblArr = this.node.children;
        lblArr[1].getComponent(cc.Label).string = data.awardNo.toString();
        lblArr[8].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.winOrLose).toString();
        lblArr[9].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.pumpMoney).toString();
        for(let i = 2; i < 8 ; i++){
            lblArr[i].getComponent(cc.Label).string ="-";
        }
        for(let j = 0;j < totalsListArr.length; j ++){
            lblArr[totalsListArr[j].posId].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(totalsListArr[j].money).toString();
        }
    }
    _initLblFun(){
        let lotteryLblArr = this.node.children;
       //////cc.log("*********************************************===",lotteryLblArr)
        for(let i = 1; i < 10; i++){
            lotteryLblArr[i].getComponent(cc.Label).string = ""
        }
    }
    
}
