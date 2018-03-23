const {ccclass, property} = cc._decorator;
import { RecordController } from "../../controller/RecordController"
import { AllcardType } from "../../../../../GameConfig";
@ccclass
export default class GameDataItem extends cc.Component {

    onLoad() {
        // init logic
        
    }
    recordGameDataFun(data,gameId){
        /*
        optional int64 orderId = 1; //订单号
	optional string awardNo = 2;//期号
	optional int32 posId = 3;//投注项
	optional int32 cardType = 4;//牌型
	optional int32 totalBetting = 5;//投注额
	optional int32 money = 6;//输赢额
	optional int32 odds = 7;//赔率
	optional int32 pumpMoney = 8;//抽水值
	optional int64 createTime = 9; //时间
    optional int32 result = 10; //结果*/ 
    
        let lblArr = this.node.children;
        for(let i = 1 ;i < 12 ;i++){
            lblArr[1].getComponent(cc.Label).string = "-";
        }
        let longhudouNum = null
        let cardTypeArr  = AllcardType[gameId-1]
       
        if(gameId == 2){
            data.cardType = this.longhudouCardTypeFun(data.cardType)
        }
        if(data.state == 2){
            lblArr[1].getComponent(cc.Label).string = data.orderId.toString()
            lblArr[2].getComponent(cc.Label).string = data.awardNo.toString()
            lblArr[3].getComponent(cc.Label).string = data.posId.toString()
            lblArr[4].getComponent(cc.Label).string = cardTypeArr[data.cardType]; //data.cardType.toString()
            lblArr[5].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.totalBetting).toString()
            lblArr[6].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.money).toString()
            lblArr[7].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.odds).toString() 
            lblArr[8].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.pumpMoney).toString()
            lblArr[9].getComponent(cc.Label).string = data.createTime.toString()
            lblArr[10].getComponent(cc.Label).string = this._shuyingheFun(data.result)
            lblArr[11].getComponent(cc.Label).string = "已开奖";
        }else{
            lblArr[1].getComponent(cc.Label).string = data.orderId.toString()
            lblArr[3].getComponent(cc.Label).string = data.posId.toString()
            lblArr[2].getComponent(cc.Label).string = data.awardNo.toString()
            lblArr[5].getComponent(cc.Label).string = RecordController.instance.getRecordint2Float(data.totalBetting).toString()
            lblArr[11].getComponent(cc.Label).string = "待开奖"
        }
       
    }
    
    _shuyingheFun(num:number){
       let str:string = null;
       if(num == 1){
        str = "赢"
       }else if(num == -1){
        str = "输"
       }else{
        str = "和"
       }
        return str
    }

    _initLblFun(){
        let lotteryLblArr = this.node.children;
        for(let i = 1; i < 12; i++){
            lotteryLblArr[i].getComponent(cc.Label).string = ""
        }
    }
    longhudouCardTypeFun(num:number){
        let num1 = num;
        let str = num1.toString();
        if(str.length > 2){
            return (num % 10);
        }
        return num
    }
}
