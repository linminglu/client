import { BaseController } from "../../../common/baseui/BaseController";
import { RecordModel } from "../model/RecordModel"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { FactoryUtil } from "../../../common/util/FactoryUtil";
export class RecordController extends BaseController {
    

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: RecordController = new RecordController()

    S_AwardLog(msg) {   
       
        RecordModel.instance.setLottery(msg);
    }
    C_AwardLog(param) {     //开奖记录
        let msgName = "C_AwardLog"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }

    S_BankLog(msg){

        RecordModel.instance.setZhuangjia(msg)
    }
    C_BankLog(param){       //庄家统计
        let msgName = "C_BankLog"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }

    S_GameLog(msg){         //游戏记录

        RecordModel.instance.setGameLog(msg)
    }
    C_GameLog(param){
        
        let msgName = "C_GameLog"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }

    S_PersonalReport(mag){  //个人报表

        RecordModel.instance.setPersonalReport(mag)
    }
    C_PersonalReport(param){  
        let msgName = "C_PersonalReport"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }
    
    
    _sendAgreementFun(num:number,param){
        if(param == null){
                 param = {
                gameId :GameColMgr.instance.getGameId(),
                beginDate:0,
                endDate:0,
                dateUnit:0,
                pageNum:1,
                }
        }
        switch(num){
                case 0:this.C_AwardLog(param);
                    break;
                case 1:this.C_GameLog(param);
                    break;
                case 2:this.C_BankLog(param);
                    break;
                case 3:this.C_PersonalReport(param);
                    break;    
                default:////cc.log("什么标签页==",num)
        }

    }
    getRecordint2Float(num:number){
        return this.int2Float(num);
    }
    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        RecordController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.netWorkMgr.register("S_AwardLog", this.S_AwardLog, this);
        this.netWorkMgr.register("S_BankLog", this.S_BankLog, this);
        this.netWorkMgr.register("S_GameLog", this.S_GameLog, this);
        this.netWorkMgr.register("S_PersonalReport", this.S_PersonalReport, this);
    }

    addEveRegister() {
        
    }

    delEveRegister() {
    }
}