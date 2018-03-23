const {ccclass, property} = cc._decorator;
import { TurnaccountController } from "../../controller/TurnaccountController"
import { TurnaccountModel } from "../../model/TurnaccountModel"
import { FuncUtil } from "../../../../common/util/FuncUtil"
@ccclass
export default class TurnaccountItem1 extends cc.Component {


    onLoad() {
       
            /*	optional int64 orderId = 1; //订单号
	optional int32 money = 2;//操作金额
	optional int32 beforeMoney = 3;//操作前金额
	optional int32 afterMoney = 4;//操作后金额
	optional int32 type = 5;//类型
	optional int64 createTime = 6; //时间
    optional string remark = 7;//备注*/ 
    
    }

    upDataTurnaccountFun1(data){
        cc.log("进来了")
        let lblArr = this.node.children;
        let dataS = data
        let k = 0;
        let Remark = dataS.remark.toString();
        let strArr = null;
        let strArr1 = null;
        let num = 0
        let remark7:string ="";
        let remark8:string ="";
        let remark9:string ="";
        lblArr[1].getComponent(cc.Label).string = dataS.orderId.toString();
        lblArr[2].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.money).toString();
        lblArr[3].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.beforeMoney).toString();
        lblArr[4].getComponent(cc.Label).string = TurnaccountController.instance.getTurnaccountint2Float(dataS.afterMoney).toString();
        lblArr[5].getComponent(cc.Label).string = this._typeStrFun(data.type)
        lblArr[6].getComponent(cc.Label).string = dataS.createTime.toString();
        
       // if(str.indexOf("bc")!=-1){// !=-1含有 ==-1不含有
        //cc.log("钱=====================", dataS.remark)

        if(dataS.remark.indexOf("Mail") == -1){
            // if(data.type != 2||data.type != 16||data.type != 17||data.type != 8||data.type != 9){
            //     strArr = dataS.remark.split(";");
            //     strArr1 = strArr[2].split(":");
            //     num = strArr1[1].replace(/[^0-9]/ig,"");
            //     remark7 = strArr[0];
            //     remark8 = strArr[1];
            //     remark9 = strArr1[0];
            // }else{
            //     strArr = dataS.remark.toString();
            //     strArr1 = strArr.split(":");
            //     num = strArr1[1].replace(/[^0-9]/ig,"");
            //     remark7 =""
            //     remark8 =""
            //     remark9 = strArr1[0];
            // }
            //console.log("_typeRemarksStrFun=====",this._typeRemarksStrFun(1))
                strArr = dataS.remark.split(",")
                if(strArr.length > 1){
                    remark7 = TurnaccountModel.instance.gameArr[Number(strArr[0])-1].des
                    remark8 = "期号:"+strArr[1];
                    remark9 = strArr[2];
                }else{
                    remark7 = strArr[0];
                    remark8 = "";
                }
                //console.log(remark7)
            lblArr[7].getComponent(cc.Label).string = remark7
            lblArr[8].getComponent(cc.Label).string = remark8
            lblArr[9].getComponent(cc.Label).string = "金币:"+TurnaccountController.instance.getTurnaccountint2Float(Number(remark9)).toString();
        }else{
            lblArr[7].getComponent(cc.Label).string = ""//remark7
            lblArr[8].getComponent(cc.Label).string = ""//remark8
            lblArr[9].getComponent(cc.Label).string = dataS.remark
        }
        
       
      
    }

    lblInitFun(){
        let lblArr = this.node.children;
        for( let i = 1 ; i < 10 ;i++){
         lblArr[i].getComponent(cc.Label).string = "";
        }
    }
    // _typeRemarksStrFun(num){
    //     // FuncUtil.getJsonConfig("gamehall",1,function(data,self){
    //     //     // console.log(data)
    //     //     //     remark7 = data.des //什么厅
    //     //  },this)
    //     //     let str =""
    //     // switch (num){
    //     //     case 1: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 2: str ="同花顺钻石厅";
    //     //     break;
    //     //     case 3: str ="同花顺VIP厅";
    //     //     break;
    //     //     case 4: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 5: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 6: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 7: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 8: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 9: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 10: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 11: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 12: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 13: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 14: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 15: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 16: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 17: str ="同花顺黄金厅";
    //     //     break;
    //     //     case 18: str ="同花顺黄金厅";
    //     //     break;
    //     //     default:
    //     // }
    // }
    _typeStrFun(num:number){
        let str:string = "";
        switch(num){
                    case 1:str ="投注";
                    break;
                    case 2:str ="撤单";
                    break;
                    case 3:str ="闲家赢分";
                    break;
                    case 4:str ="闲家输分";
                    break;
                    case 5:str ="庄家赢分";
                    break;
                    case 6:str ="庄家输分";
                    break;
                    case 7:str ="返点";
                    break;
                    case 8:str ="转出";
                    break;
                    case 9:str ="转入";
                    break;
                    case 10:str ="座位费用";
                    break;
                    case 11:str ="后台手动充值";
                    break;
                    case 12:str ="后台手动扣钱";
                    break;
                    case 13:str ="代理手动充值";
                    break;
                    case 14:str ="代理手动扣钱";
                    break;
                    case 15:str ="活动";
                    break;
                    case 16:str ="发红包";
                    break;
                    case 17:str ="领取红包";
                    break;
                    case 18:str ="退还超时红包";
                    break;
                    default://cc.log("什么类型====",str)
                    
        }
        return str
    }

}
