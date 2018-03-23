const {ccclass, property} = cc._decorator;
import { RecordController } from "../../controller/RecordController"
@ccclass
export default class RecordTypeItem1 extends cc.Component {


    onLoad() {
        // init logic
        
    }
    recordGameTypeDataFun(data){  
        let totalsListArr = data.totalsList
        let lblArr = this.node.children;
        lblArr[1].getComponent(cc.Label).string = data.awardNo.toString();
        lblArr[2].getComponent(cc.Label).string ="-";
        lblArr[3].getComponent(cc.Label).string ="-";
        lblArr[4].getComponent(cc.Label).string ="-";
        lblArr[5].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.winOrLose).toString();
        lblArr[6].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.pumpMoney).toString();

        for(let j = 0;j < totalsListArr.length; j ++){
            lblArr[totalsListArr[j].posId].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(totalsListArr[j].money).toString();
        }
    }
    _initLblFun(){
        let lotteryLblArr = this.node.children;
       //////cc.log("*********************************************===",lotteryLblArr)
        for(let i = 1; i < 7; i++){
            lotteryLblArr[i].getComponent(cc.Label).string = ""
        }
    }
  
}
