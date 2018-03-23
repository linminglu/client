const {ccclass, property} = cc._decorator;
import { RecordController } from "../../controller/RecordController"
@ccclass
export default class PersonalDataItem extends cc.Component {


    onLoad() {
    
        
    }

    recordPersonalDataFun(data){
       /*optional int64 createTime = 1; //日期
	optional int32 totalPosId = 2;//投注次数
	optional int32 totalBetting = 3;//投注金额 
	optional int32 pumpMoney = 4;//抽水金额
	optional int32 winCount = 5;//赢单量
	optional int32 loseCount = 6; //输单量
	optional int32 sameCount = 7;//和单量
	optional int32 winMoney = 8;//赢总额
	optional int32 loseMoney = 9;//输总额*/
        let lblArr = this.node.children;
        lblArr[1].getComponent(cc.Label).string = data.createTime.toString()
        lblArr[2].getComponent(cc.Label).string = data.totalPosId.toString()
        lblArr[3].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.totalBetting).toString()
        lblArr[4].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.pumpMoney).toString()
        lblArr[5].getComponent(cc.Label).string = data.winCount.toString()
        lblArr[6].getComponent(cc.Label).string = data.loseCount.toString()
        lblArr[7].getComponent(cc.Label).string = data.sameCount.toString()
        lblArr[8].getComponent(cc.Label).string = "-"//data.winMoney.toString() //豹子量
        lblArr[9].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.winMoney).toString()
        lblArr[10].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.loseMoney).toString()

    }

    _initLblFun(){
        let lotteryLblArr = this.node.children;
       //////cc.log("*********************************************===",lotteryLblArr)
        for(let i = 1; i < 11; i++){
            lotteryLblArr[i].getComponent(cc.Label).string = ""
        }
    }

}
