/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"

export class TurnaccountModel extends BaseModel {
    //游戏属性
    gameArr = [];
    //转账
    public turnAccount = [];
    public accountPageCount0:number = 0;
    //账变
    public accountChange = [];
    public accountPageCount1:number = 0;
    public accountChangeNum:number = 0;
    //2标签页状态
    public stateYe:number = 0;

    //查询时间保存
   public findTime0 ={
        startTime:"",
        endtTime:""
    }
   public findTime1 ={
        startTime:"",
        endtTime:""
    }
    public findTimeArr =[this.findTime0,this.findTime1]

    //转账
    setTransferRecord(mag){
        this.accountPageCount0 =mag.totalNum;
        this.turnAccount  = mag.transferRecordList
        this.changedModel("COMMON_TURN_DATA_A", this.turnAccount) 
    }
    getTransferRecord(mag){

        return this.turnAccount
    }
    //账变
    setCostLog(mag){
        this.accountPageCount1 = mag.totalNum;
        this.accountChange = mag.costLogList
        this.changedModel("COMMON_TURN_DATA_B",this.accountChange) 
    }
    getCostLog(){

        return this.accountChange
    }
    
     //内容数目（页数）
    getPageCount(num:number){        
        let pageCount = 0
        if(num == 1){
            pageCount = this.accountPageCount1
        }else{
            pageCount = this.accountPageCount0
        }
        return pageCount
    }
    //查询时间
    setFindTimeFun(timeStr1:string,timeStr2:string,num:number){
        this.findTimeArr[num].startTime = timeStr1;
        this.findTimeArr[num].endtTime = timeStr2;
    }
    getFindTimeFun(num:number){

        return this.findTimeArr[num]
    }
    
    setstateYe(num){
        this.stateYe = num;
    }
    getstateYe(){
        return this.stateYe
    }
    //标签状态
    setTurnaccountFindLay_num(num:number){
        this.accountChangeNum = num
    }
    getTurnaccountFindLay_num(){  
       return this.accountChangeNum
    }
    destructor() {
        super.destructor();
        TurnaccountModel.instance = null;
    }
    initModelFun(){
        for(let i = 0 ; i < 2 ; i++ ){
            this.findTimeArr[i].startTime = "";
            this.findTimeArr[i].endtTime = "";
        }
        this.stateYe = 0
    }

    public static instance: TurnaccountModel = new TurnaccountModel()
    

    private constructor() {
        super();
    }
}