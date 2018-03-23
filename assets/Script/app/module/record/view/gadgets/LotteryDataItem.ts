const {ccclass, property} = cc._decorator;
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
@ccclass
export default class LotteryDataItem extends cc.Component {

    onLoad() {
        
        
    }
    recordLotteryDataFun(data){
        let lotteryLblArr = this.node.children;
        let str:string = null 
        let gameType = GameColMgr.instance.getGameTyp()
        if(gameType ==2 ){
            str = this.upLonghudouFun(data);
        }else{
            str = this.upOtherDataFun(data);
        }
        lotteryLblArr[1].getComponent(cc.Label).string = data.awardNo
        lotteryLblArr[2].getComponent(cc.Label).string = this.updataArrZstr(data.numbersStr) 
        lotteryLblArr[3].getComponent(cc.Label).string = str//data.cardStr

        /*optional string awardNo = 1;//期号
	optional string numbersStr = 2;//开奖号码组
    optional string cardStr = 3;//分配号码球
    optional string fengCardStr = 4;//风号码球
	optional string yuCardStr = 5;//雨号码球
	optional string leiCardStr = 6;//雷号码球
	optional string bankCardStr = 7;//庄号码球
    */
       
    }
    updataArrZstr(Str:string){
        //////cc.log("strChar=====",strChar)
        let strChar = Str
        if(strChar[0] != "["){
            return "错误"
        }
        let arr = JSON.parse(strChar)
        let str = ""
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 10) {
                str += "0" + arr[i]
            } else {
                str += arr[i]
            }
            if (i < (arr.length - 1)&&i != 9) {
                str += ", "
            }else{
                str +="  "
            }
        }
        return str
    }
    upLonghudouFun(data){
    
        let str1:string ="虎:"+ this.updataArrZstr(data.fengCardStr)
        let str2:string ="龙:"+this.updataArrZstr(data.yuCardStr)
        return str1+str2
    }
    upOtherDataFun(data){

        let str1:string ="风:"+ this.updataArrZstr(data.fengCardStr)
        let str2:string ="雨:"+this.updataArrZstr(data.yuCardStr)
        let str3:string ="雷:"+this.updataArrZstr(data.leiCardStr)
        let str4:string ="庄:"+this.updataArrZstr(data.bankCardStr)
        return  str1+str2+"\n"+str3+str4
    }
    _initLblFun(){
        let lotteryLblArr = this.node.children;
       //////cc.log("*********************************************===",lotteryLblArr)
        for(let i = 1; i < 4; i++){
            lotteryLblArr[i].getComponent(cc.Label).string = ""
        }
    }
   
}
