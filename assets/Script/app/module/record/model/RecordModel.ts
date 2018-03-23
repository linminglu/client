/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { RecordController } from "../controller/RecordController"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"

export class RecordModel extends BaseModel {
    public lotteryArr = [];//开奖记录
    public lotteryPageCount:number = 0;//页数
    public findTime0={       //查询时间
        startTime:"",
        endtTime: "" 
    }
    public gameRecordArr = []; //游戏记录
    public gamePageCount:number = 0;//页数
    public findTime1={       //查询时间
        startTime:"",
        endtTime: "" 
    }

    public zhuangJiaArr = [];  //庄家统计
    public zhuangJiaPageCount:number = 0;//页数
    public findTime2={       //查询时间
        startTime:"",
        endtTime: "" 
    }
    public personalReportArr = [] //个人报表
    public personalPageCount:number = 0;//页数
    public findTime3={       //查询时间
        startTime:"",
        endtTime: "" 
    }


    public stateYe:number = 0; //当前处于那个标签页；

    public blr:boolean = true;

    public findStr:string = null; //查询

    public findTimeArr = [this.findTime0,this.findTime1,this.findTime2,this.findTime3]
    public findShowArr:number[] = [0,0,0,0] //保存查询项的状态


    
    setLottery(mag){  //开奖记录
        this.lotteryArr = mag.awardLogList
        this.lotteryPageCount = mag.totalNum
       // ////cc.log("开奖~~~~~~~~~~~~~~~~~~~~~~记录",this.lotteryArr)
        this.changedModel("COMMON_RECORD_DATA_A", this.lotteryArr) 
    }
    getLottery(){   
        return this.lotteryArr
    }
    getPageCount(num:number){         //内容数目（页数）
        let pageCount = 0
        switch(num){
            case 0:pageCount = this.lotteryPageCount;
                break
            case 1:pageCount = this.gamePageCount;
                break
            case 2:pageCount = this.zhuangJiaPageCount;
                break
            case 3:pageCount = this.personalPageCount;
                break
        }
        return pageCount
    }

    setZhuangjia(mag){     //庄家统计
        this.zhuangJiaArr = mag.bankLogList;
        this.zhuangJiaPageCount = mag.totalNum
        this.changedModel("COMMON_RECORD_DATA_C", this.zhuangJiaArr) 
    }
    getZhuangjia(){
        return this.zhuangJiaArr
    }

    setGameLog(mag){    //游戏记录
        this.gameRecordArr = mag.gameLogList;
        this.gamePageCount = mag.totalNum
        this.changedModel("COMMON_RECORD_DATA_B", this.gameRecordArr) 
    }
    // getGameLog(){
    //     //return
    // }
    setPersonalReport(mag){     //个人报表
        this.personalReportArr = mag.personalReportList;
        this.personalPageCount = mag.totalNum
        this.changedModel("COMMON_RECORD_DATA_D", this.personalReportArr) 
    }

    getPersonalReport(mag){  
        

    }
    getFindData(){  //查询

    }
    setFindData(mag){ //查询

        this.findStr = mag;
    }

    setblrData(bl){     //限制刷新内容
        this.blr = bl
    }   
    getblrData(){
        
        return this.blr
    }

    setstateYe(num){
        this.stateYe = num;
    }
    getstateYe(){
        return this.stateYe
    }

    setFindTime(time1,time2,num:number){
        this.findTimeArr[num].startTime = time1;
        this.findTimeArr[num].endtTime = time2;
    }
    getFindTime(num:number){
        return this.findTimeArr[num]
    }

    setFindShowArr(Index4,stateNum){
        if(Index4==null||stateNum ==null){
            for(let i  in this.findShowArr){
                    this.findShowArr[i] = 0;
                }
        }else{
            this.findShowArr[Index4] = stateNum
        }
        
    }
    getFindShowArr(){

        return this.findShowArr
    }

    sendParamFun(num: number,countNum:number) {
        let findTime = RecordModel.instance.getFindTime(num);
        let param = {
            gameId: GameColMgr.instance.getGameId(),
            beginDate:FuncUtil.getTime_1(findTime.startTime),
            endDate:FuncUtil.getTime_1(findTime.endtTime,),
            dateUnit: this.findShowArr[num],
            pageNum: countNum
        }
        RecordController.instance._sendAgreementFun(num, param);
    }
    initModelFun(){
        for(let i = 0 ; i < 4 ;i++){
            this.findTimeArr[i].startTime = ""
            this.findTimeArr[i].endtTime = ""
        }
        this.stateYe = 0
    }
    destructor() {
        super.destructor();
        RecordModel.instance = null;
    }
    
    
    public static instance: RecordModel = new RecordModel()
    

    private constructor() {
        super();
    }
}