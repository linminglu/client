import { FactoryUtil } from "../../../../common/util/FactoryUtil";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig";
import {RecordController} from "../../controller/RecordController";
import { RecordModel} from "../../model/RecordModel";
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordFindLay extends cc.Component {

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


   // TxtName: string = "全部";

    Cnum:number = 0; //查询项

    publicFindNum:number = 0//查询类型

    //     零时配置
    kaijiangData = ["全部", "最新"];
    gameData  = ["全部","待开奖","已开奖","已撤单"];
    gerenBaobiao = ["按日","按月"];
    peizhiArr = [this.kaijiangData,this.gameData,"2",this.gerenBaobiao]

    onLoad() {
        Emitter.register(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);
        Emitter.register(EmitterCfg.GAME_HISTORY_PAGE, this._initFun,this)
        this._initFun(null,0);
    }
    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_ENTER_GAME, this.changeOptionsMonitor, this);
        Emitter.unregister(EmitterCfg.GAME_HISTORY_PAGE, this._initFun,this)
    }
    

    changeOptionsMonitor(eventName: string, TxtName:string,C_num:number) {
        this.lblTxt.string = TxtName
       // this.TxtName = TxtName
        this.optionScroll.node.active = false;
        this.Cnum = C_num
            ////cc.log("1111111==============================",C_num);
         this.dadeBg1.string = "";
         this.dadeBg2.string = "";
    }


    lbldadeBg1Fun(data) {
        //////////cc.log(data)
    }

    lbldadeBg2Fun(data) {
        //////////cc.log(data)
    }

    btnQueryDateFun() {

        let start = this.dadeBg1.string;  //开始时间
        let end = this.dadeBg2.string;      //结束时间
        let indexNum = RecordModel.instance.getstateYe()
        //c.log("sssssssssssssssssssssss=====",indexNum);
        let param = {
            gameId :GameColMgr.instance.getGameId(),
            beginDate:0,
            endDate:0,
            dateUnit:this.Cnum,//RecordModel.instance.getRecordFindLay_num(),
            pageNum:1
        }
        let cnum =  RecordModel.instance.getFindShowArr()
        if(start.length == 0&&end.length == 0 ){
            if(indexNum == this.publicFindNum&&this.Cnum == cnum[indexNum]){
                ////cc.log("不能重复查询相同时间段的")
                return
            }

            RecordController.instance._sendAgreementFun(indexNum,param);
            RecordModel.instance.setFindShowArr(indexNum,this.Cnum)
            this.dadeBg1.string = "";
            this.dadeBg2.string = "";
            RecordModel.instance.setFindTime("","",indexNum);
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
        // ////cc.log('起始时间：',strstart)
        // ////cc.log('终止时间：',strend)
        ////cc.log("/*/*/*/*/*/*/*/*=====",RecordModel.instance.getRecordFindLay_num());
        param.beginDate = FuncUtil.getTime_1(strstart);
        param.endDate = FuncUtil.getTime_1(strend);
        RecordModel.instance.setFindTime(strstart,strend,indexNum);
        RecordController.instance._sendAgreementFun(indexNum,param);
        RecordModel.instance.setFindShowArr(indexNum,this.Cnum)
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
        // //////////cc.log(numyear)
        // //////////cc.log(nummonth)
        // //////////cc.log(numday)

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

   
    _initFun(eventName:string,dataNum1:number){

        let lalFindShow = RecordModel.instance.getFindShowArr()
        if(dataNum1 == 2)return
        this.dadeBg1.string = ""
        this.dadeBg2.string = ""
        this.optionScroll.node.active = false;
      
        this.removeAllObjFun();

        this.publicFindNum = dataNum1

        let configure = this.peizhiArr[dataNum1] //查询类型

        this.lblTxt.string = configure[lalFindShow[dataNum1]]; //初始化文本框
        
        ResCfg.loadPrefab(this, "recordFindItem", function (self, Prefab) {
            for (let i = 0; i < configure.length; i++) {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.FIND_TERM)
                if(prefab){
                    self.optionScroll.content.addChild(prefab)
                    prefab.getComponent('RecordFindItem').receiveRecordFindItemFun(configure[i],i)
                    self.curView.push(prefab)
                }else{
                    let curView = cc.instantiate(Prefab)
                    self.optionScroll.content.addChild(curView)
                    curView.getComponent('RecordFindItem').receiveRecordFindItemFun(configure[i],i)
                    self.curView.push(curView)
                }
                   
            }
        })

    }
    btnoptionFun() {

            this.optionScroll.node.active = this.blr;
            this.blr = !this.blr
    }
    removeAllObjFun(){
      
       for( let i = 0 ;i < this.curView.length ;i++){

            NodePoolMgr.instance.putNood(this.curView[i], NodePoolKey.FIND_TERM);

        }

    }
}

