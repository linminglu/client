import { FactoryUtil } from "../../../../common/util/FactoryUtil";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig";
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { TurnaccountController as TAController } from "../../controller/TurnaccountController"
import { TurnaccountModel } from "../../model/TurnaccountModel"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnaccountFindLay extends cc.Component {

    @property(cc.EditBox)
    dadeBg1: cc.EditBox = null;
    @property(cc.EditBox)
    dadeBg2: cc.EditBox = null;
    @property(cc.ScrollView)
    optionScroll: cc.ScrollView = null;

    blr:boolean = true

    @property(cc.Label)
    lblTxt: cc.Label = null;
    curView = [];

    Cnum:number = 0; //查询项

    publicFindNum:number = 0//查询类型
    optionView:cc.Node = null ;

    //     零时配置
    // kaijiangData = ["全部", "最新"];
    // gameData  = ["全部","待开奖","已开奖","已撤单"];
    // gerenBaobiao = ["按日","按月"];
   // peizhiArr = [this.kaijiangData,this.gameData,"2",this.gerenBaobiao]
    peizhiArr = ["全部","每月","每日"];

    onLoad() {
            this.optionView = this.node.getChildByName("optionView")
            this._initFun()
            Emitter.register(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);
    }
    onDestroy() {
            Emitter.unregister(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);
    }
    

    changeOptionsMonitor(eventName: string, TxtName:string,C_num:number) {
        cc.log("1111111111111111111111111======",TxtName);
        this.lblTxt.string = TxtName
        this.optionScroll.node.active = false;
        this.Cnum = C_num
        this.dadeBg1.string = "";
        this.dadeBg2.string = "";
    }


    btnQueryDateFun() {

        let start = this.dadeBg1.string;  //开始时间
        let end = this.dadeBg2.string;      //结束时间
        let stateNum = TurnaccountModel.instance.getTurnaccountFindLay_num();
        let state  = TurnaccountModel.instance.getstateYe();
       
        
        //cc.log("/*/*/*/*/*/*/*/*=====",RecordModel.instance.getRecordFindLay_num());
        let Time  = TurnaccountModel.instance.getFindTimeFun(state)
        if(start.length == 0&&end.length == 0){
            //cc.log("11111111111111111********/////===========");
           if(stateNum == this.Cnum) return //cc.log("不能重复查询相同时间段的")
            TurnaccountModel.instance.setFindTimeFun("","",state)
           this._sendParam(state);
           TurnaccountModel.instance.setTurnaccountFindLay_num(this.Cnum);
            this.dadeBg1.string = "";
            this.dadeBg2.string = "";
            return 
        }
        if (start.length < 8 || end.length < 8) {
            FactoryUtil.createAlertConfirmView("您的输入有误!请重新输入!提示正确格式:20180106")
            this.dadeBg1.string = "";
            this.dadeBg2.string = "";
            return;
        }
        let arrstart = start.split("");
        let arrend = end.split("");
        let bool:boolean=false
        bool = this.panduanshifuozhenqueFun(arrstart)
        if (bool) return;
        bool = this.panduanshifuozhenqueFun(arrend)
        if (bool) return;
        let strstart = this.fennianyueriFun(arrstart)
        let strend = this.fennianyueriFun(arrend)
       // let num:number =RecordModel.instance.getRecordFindLay_num(), 
        // cc.log('起始时间：',strstart)
        // cc.log('终止时间：',strend)
        //cc.log("/*/*/*/*/*/*/*/*=====",RecordModel.instance.getRecordFindLay_num());
        TurnaccountModel.instance.setFindTimeFun(strstart,strend,state)
        this._sendParam(state);
        
        this.dadeBg1.string = "";
        this.dadeBg2.string = "";

    }

    fennianyueriFun(arrstart) {
        let year: string = "";      //年
        let month: string = "";     //月
        let day: string = "";       //日

        for (let i = 0; i < arrstart.length; i++) {
            if (i < 4) {
                year += arrstart[i];
            } else if (i < 6) {
                month += arrstart[i];
            } else if (i < 8) {
                day += arrstart[i];
            }
        }

        return year + "-" + month + "-" + day
    }


    panduanshifuozhenqueFun(arrstart) {
        let year: string = "";      //年
        let month: string = "";     //月
        let day: string = "";       //日

        for (let i = 0; i < arrstart.length; i++) {
            if (i < 4) {
                year += arrstart[i];
            } else if (i < 6) {
                month += arrstart[i];
            } else if (i < 8) {
                day += arrstart[i];
            }
        }
        let numyear: number = parseInt(year);
        let nummonth: number = parseInt(month);
        let numday: number = parseInt(day);
        // ////////cc.log(numyear)
        // ////////cc.log(nummonth)
        // ////////cc.log(numday)

        if (nummonth > 12 || nummonth < 1) {
            FactoryUtil.createAlertConfirmView("您的输入有误!请重新输入!")
            this.dadeBg1.string = "";
            this.dadeBg2.string = "";
            return true;
        }
        let large = this.getDaysInOneMonth(numyear, nummonth);
        if (numday > large || numday < 1) {
            FactoryUtil.createAlertConfirmView("您的输入有误!请重新输入!")
            this.dadeBg1.string = "";
            this.dadeBg2.string = "";
            return true;
        }
        return false;
    }




    getDaysInOneMonth(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        var date = new Date(year + "/" + month + "/0")
        return d.getDate();
    }

    getTime_1(StrTime){
        
        let str = StrTime;
        str = str.replace(/-/g,'/'); 
        let date = new Date(str); 
        return  date.getTime();
    }

    _sendParam(state:number){
        let param = null
        if(state == 1){
            //TurnaccountModel.instance.setFindTimeFun(strstart,strend,1)
            param ={
                gameId :1,
                beginDate:FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).startTime),
                endDate:FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).endtTime),
                dateUnit:this.Cnum,
                pageNum:1
            }
            TAController.instance.C_CostLog(param)
            TurnaccountModel.instance.setTurnaccountFindLay_num(this.Cnum);

        }else{
            param ={
                beginDate:FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).startTime),
                endDate:FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).startTime),
                pageNum:1
            }
            TAController.instance.C_TransferRecord(param)
        }
    }
    

    _initFun(){

        this.dadeBg1.string = ""
        this.dadeBg2.string = ""
        this.optionScroll.node.active = false;
        this.lblTxt.string = this.peizhiArr[0];
        TurnaccountModel.instance.setTurnaccountFindLay_num(0);
        //cc.log("2222222======",TxtName);
    

        ResCfg.loadPrefab(this, "recordFindItem", function (self, Prefab) {
            for (let i = 0; i < self.peizhiArr.length; i++) {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.FIND_TERM)
                if(prefab){
                    self.optionScroll.content.addChild(prefab)
                    prefab.getComponent('RecordFindItem').receiveRecordFindItemFun(self.peizhiArr[i],i)
                    self.curView.push(prefab)
                }else{
                    let curView = cc.instantiate(Prefab)
                    self.optionScroll.content.addChild(curView)
                    curView.getComponent('RecordFindItem').receiveRecordFindItemFun(self.peizhiArr[i],i)
                    self.curView.push(curView)
                }
                   
            }
        })

    }
    btnoptionFun() {

            this.optionScroll.node.active = this.blr;
            this.blr = !this.blr
    }
    

}

