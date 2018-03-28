import { GameManager, PlayerMsg } from "../../../common/manager/GameManager"
import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { TweenMsgView } from "../../../common/ui/TweenMsgView"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { GameController } from "../controller/GameController"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { AudioManager } from "../../../common/manager/AudioManager"

export class GameModel extends BaseModel {
    private awardNo = null
    private gameId = null
    private deyTime = 0
    private minMoney = 0                //当前场次最小投注筹码
    private maxMoney = 0                //当前场次最大投注筹码
    private curSelectJetton = null      //当前选中的筹码
    private curJettonIdx = 0
    private jettonWorldPos = []         //筹码的世界坐标
    private roleGold = 0                //角色剩余的金币
    private usableGold = 0              //角色可用的金币

    private singleminMoney=0                    //当前区域最小投注筹码
    private singlemaxMoney=0                    //当前区域最大投注筹码

    private betJettonList = []          //未确认的下注筹码列表
    private confirmBetJettonList = []   //确认的下注筹码列表
    private confirmSendJettonList = []  //确认发送的下注筹码列表
    private lstBetJettonList = []       //上次成功下注筹码列表
    private lstConfirmBetJettonList = []//上次成功下注筹码列表

    private regionalUpperLimit=[]          //区域额度上限

    private betjettonNum = 0            //未确认的下注额度
    private confirmBetJettonNum = 0     //确认的下注额度
    private lstConfirmBetJettonNum = 0  //确认的下注额度
    private betJettonTotalNum = 0       //本局已下注额度
    private lstBetJettonNum = 0

    private myTotal = 0

    private betJettonType = 0

    private _jettonArr = []
    private jettonArr = []

    //初始化数据
    initGameData(msg = null, myTotal = 0,sucAreaTotalsList) {
        // cc.log("-----------initGameData---------")
        this.initJettonData()
        ////////cc.log(msg)
        ////////cc.log(this.gameId)
        if (msg == null || msg.gameId != this.gameId) {
            //cc.log("-----------initGameData---------1")
            this.clearGameData()
        }

        this.gameId = msg.gameId
        if (myTotal == 0) {
        } else {
            this.betJettonTotalNum = myTotal
        }
        cc.log(sucAreaTotalsList)
        for(let i=0;i<sucAreaTotalsList.length-1;i++){
            if(sucAreaTotalsList[i+1]==null)continue;
            this.regionalUpperLimit[i]=sucAreaTotalsList[i+1].money
        }
        cc.log(this.regionalUpperLimit)
        // cc.log("1 this.betJettonTotalNum: ", this.betJettonTotalNum)

        // this.awardNo = msg.awardNo
    }

    initJettonData() {
        let gameArr = GameColMgr.instance.getGameArr()


        this.minMoney = gameArr.minMoney/100
        this.maxMoney = gameArr.maxMoney/100
        this.singleminMoney = gameArr.singleminMoney/100
        this.singlemaxMoney = gameArr.singlemaxMoney/100


        this._jettonArr = GameColMgr.instance.getJettonNumArr()
    }

    //清除当前筹码数据
    clearGameData() {
        //cc.log("-----------clearGameData---------")
        this.betJettonList = []
        this.lstBetJettonList = []
        this.lstBetJettonNum = 0

        this.betjettonNum = 0
        this.betJettonTotalNum = 0
        // cc.log("2 this.betJettonTotalNum: ", this.betJettonTotalNum)
        this.myTotal = 0
        this.regionalUpperLimit=[]
        //3
    }

    //退出清除
    clearData() {
        //cc.log("-----------clearData---------")
        this.clearGameData()
        
        this.jettonWorldPos = []
        
        this.lstConfirmBetJettonList = []
        this.confirmBetJettonList = []
        this.confirmSendJettonList = []
        this.confirmBetJettonNum = 0

        this.gameId = null
    }

    updateGold(roleGold, usableGold) {
        this.roleGold = roleGold
        this.usableGold = usableGold
    }

    //点击下注区下注筹码
    touchBetJetton(betAreaIdx: number = 1) {//betAreaIdx=0为庄家
        if (!this.betJettonList[betAreaIdx]) {
            this.betJettonList[betAreaIdx] = []
        }

        if (this.curSelectJetton == null) {
            //////cc.log("this.curSelectJetton is null")
            return
        }

        if ((this.usableGold - this.curSelectJetton.jettonNum) < 0) {
            TweenMsgView.getInstance().showMsg(5)
            return
        }
        // //////cc.log("===========", this.betJettonTotalNum, this.curSelectJetton.jettonNum, this.maxMoney)
        if ((this.betJettonTotalNum + this.curSelectJetton.jettonNum) > this.maxMoney) {
            TweenMsgView.getInstance().showMsg(1)
            return
        }
      
      
        if((this.regionalUpperLimit[betAreaIdx]+this.curSelectJetton.jettonNum)>this.singlemaxMoney){
            TweenMsgView.getInstance().showMsg(8)
            return
        }
        //1
        if(this.regionalUpperLimit[betAreaIdx]==null){
            this.regionalUpperLimit[betAreaIdx]=this.curSelectJetton.jettonNum

        }else{
            this.regionalUpperLimit[betAreaIdx]+=this.curSelectJetton.jettonNum
        }
       
        cc.log("-------------------------------------")
        cc.log(this.regionalUpperLimit[betAreaIdx])
        cc.log(this.regionalUpperLimit)
        this.roleGold -= this.curSelectJetton.jettonNum
        this.usableGold -= this.curSelectJetton.jettonNum
        this.betJettonList[betAreaIdx].push(this.curSelectJetton.jettonNum)

        this.betjettonNum += this.curSelectJetton.jettonNum
        this.betJettonTotalNum += this.curSelectJetton.jettonNum
        this.myTotal += this.curSelectJetton.jettonNum

        AudioManager.instance.playEffect(`eff_chouma${this.curJettonIdx}`)

        Emitter.fire(EmitterCfg.GAME_MY_TOTAL, this.myTotal)
        this.changedModel("GAME_UPDATE_JETTON_CHANGE", this.roleGold, this.usableGold)

        this.changedModel("GAME_TOUCH_BET_JETTON_CHANGE" + betAreaIdx, this.curSelectJetton)
    }

    cancelBetJetton() {
        if (this.betJettonList.length == 0) {
            this.changedModel("COMMON_CLEAR_BET_JETTON_CHANGE", true)
            return
        }

        for(let i=0;i<this.betJettonList.length;i++){
            if(this.regionalUpperLimit[i]==null)continue;
            cc.log(this.regionalUpperLimit[i])
            cc.log(this.betJettonList[i])
            let JettonValue=0
            if(this.betJettonList[i]!=null)JettonValue=eval(this.betJettonList[i].join('+'));
            this.regionalUpperLimit[i]-=JettonValue
        }

        for (let i = 0; i < this.betJettonList.length; i++) {
            let betAreaJetton = this.betJettonList[i]
            if (betAreaJetton) {
                this.changedModel("GAME_CANCEL_BET_JETTON_CHANGE" + i, betAreaJetton)
            }
        }

        this.roleGold += this.betjettonNum
        this.usableGold += this.betjettonNum
        this.betJettonTotalNum -= this.betjettonNum
        this.myTotal -= this.betjettonNum

        this.betjettonNum = 0
        this.betJettonList = []

        Emitter.fire(EmitterCfg.GAME_MY_TOTAL, this.myTotal)
        this.changedModel("GAME_UPDATE_JETTON_CHANGE", this.roleGold, this.usableGold)
    }

    private float2Int(num: number) {
        return num * 100
    }

    confirmBetJetton() {
        let canBet = false
        
        for (let i = 0; i < this.betJettonList.length; i++) {
            if (this.betJettonList[i] && this.betJettonList[i].length > 0) {
                canBet = true
                break
            }
        }

        if (! canBet) {
            return
        }
        
        let total = 0
        let bettingMsgList = []
        for (let i = 1; i < this.betJettonList.length; i++) {
            let posId = i + 1
            let money = 0
            
            let tempList = this.betJettonList[i]
            if (! tempList) {
                tempList = []
            }
            
            for (let j = 0; j < tempList.length; j++) {
                money += tempList[j]
            }
            
            total += money
            bettingMsgList.push({posId: posId, money: money})
        }

        for (let i = 0; i < bettingMsgList.length; i++) {
            ////////////cc.log(this.float2Int(bettingMsgList[i].money))
            bettingMsgList[i].money = this.float2Int(bettingMsgList[i].money)
        }

        this.confirmBetJettonNum = total
        this.lstBetJettonNum = total
        this.lstBetJettonList = this.betJettonList
        this.confirmSendJettonList = bettingMsgList

        this.betJettonType = 1
        this.deyTime = 0
        GameController.instance.C_Betting(this.confirmSendJettonList)
    }

    updateConfirmBetJetton(betJettonList) {
        let self = this
        //cc.log("-----------------updateConfirmBetJetton----------------------", this.betJettonType)
        if (this.betJettonType == 1) {
            this.lstConfirmBetJettonList = this.lstBetJettonList
            this.lstConfirmBetJettonNum = this.lstBetJettonNum
            this.betJettonList = []
            this.betjettonNum = 0

            //cc.log("1-----------------updateConfirmBetJetton----------------------", this.betJettonType)
            self.changedModel("GAME_CONFIRM_BET_SUCC_CHANGE")
        }

        this.confirmBetJettonList = this.lstConfirmBetJettonList
        this.confirmBetJettonNum = this.lstConfirmBetJettonNum
        FuncUtil.delayFunc(function () {
            for (let i = 0; i < self.confirmBetJettonList.length; i++) {
                let betAreaJetton = self.confirmBetJettonList[i]
                if (betAreaJetton) {
                    self.changedModel("GAME_CONFIRM_BET_JETTON_CHANGE" + i, betAreaJetton, self.betJettonType == 2)
                }
            }
        }, self.deyTime)
    }

    repeatBetJetton() {
        if (this.confirmBetJettonList.length <= 0) {
            TweenMsgView.getInstance().showMsg(6)
            return
        }

        if ((this.usableGold - this.confirmBetJettonNum - this.betjettonNum) < 0) {
            TweenMsgView.getInstance().showMsg(5)
            return
        }
        
        // cc.log("1===========", this.betJettonTotalNum, this.confirmBetJettonNum, this.betjettonNum, this.maxMoney)
        if ((this.betJettonTotalNum + this.confirmBetJettonNum) > this.maxMoney) {
            TweenMsgView.getInstance().showMsg(1)
            return
        }
        //2

        for(let i=0;i<this.confirmBetJettonList.length;i++){
            if(this.confirmBetJettonList[i]==null)continue;
            let JettonValue=0;
            if(this.confirmBetJettonList[i]!=null)JettonValue=eval(this.confirmBetJettonList[i].join('+'));
            if((this.regionalUpperLimit[i]+JettonValue)>this.singlemaxMoney){
                TweenMsgView.getInstance().showMsg(8)
                return
            }
            cc.log(this.regionalUpperLimit[i])
            cc.log(JettonValue)
            cc.log(this.confirmBetJettonList[i])
        }

        for(let i=2;i<this.regionalUpperLimit.length;i++){
            let JettonValue1=0;
            if(this.confirmBetJettonList[i]!=null)JettonValue1=eval(this.confirmBetJettonList[i].join('+'));
            this.regionalUpperLimit[i]+=JettonValue1
        }

        this.roleGold = this.roleGold - this.confirmBetJettonNum
        this.usableGold = this.usableGold - this.confirmBetJettonNum
        
        this.betJettonTotalNum += this.confirmBetJettonNum
        this.myTotal = this.myTotal + this.confirmBetJettonNum

        // for (let i = 0; i < this.confirmBetJettonList.length; i++) {
        //     let betAreaJetton = this.confirmBetJettonList[i]
        //     if (betAreaJetton) {
        //         this.changedModel("GAME_REPEAT_BET_JETTON_CHANGE" + i, betAreaJetton)
        //     }
        // }

        AudioManager.instance.playEffect(`eff_chouma${this.curJettonIdx}`)

        for (let i = 0; i < this.confirmBetJettonList.length; i++) {
            let betAreaJetton = this.confirmBetJettonList[i]
            if (betAreaJetton) {
                let newList = this.parasData(betAreaJetton)
                this.changedModel("GAME_REPEAT_BET_JETTON_CHANGE" + i, newList)
            }
        }


        Emitter.fire(EmitterCfg.GAME_MY_TOTAL, this.myTotal)

        this.deyTime = 0.3
        this.changedModel("GAME_UPDATE_JETTON_CHANGE", this.roleGold, this.usableGold)

        this.betJettonType = 2
        GameController.instance.C_Betting(this.confirmSendJettonList)
    }

    public getBetjettonNum() {
        return this.betjettonNum
    }

    private parasData(betAreaJetton) {
        let data = 0
        for (let i = 0; i < betAreaJetton.length; i++) {
            data += betAreaJetton[i]
        }

        this.jettonArr = []
        this._jettonArr.sort(function (a, b) { return b - a })
        ////////////cc.log(this._jettonArr)
        
        for (let i = 0; i < this._jettonArr.length; i++) {
            let key = this._jettonArr[i]
            let curNum = Math.floor(data / key)
            for (let i = 0; i < curNum; i++) {
                this.jettonArr.push(Number(key))

                data -= key
            }
        }

        return this.jettonArr.sort(function (a, b) { return b - a })
    }

    getBetJettonList() {
        return this.betJettonList
    }

    getBetJettonByIdx(betAreaIdx: number) {
        return this.betJettonList[betAreaIdx]
    }

    setCurSelectJetton(jetton) {
        this.curSelectJetton = jetton

        let arr = GameColMgr.instance.getJettonNumArr()
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == jetton) {
                this.curJettonIdx = i
                break
            }
        }
    }

    getCurJettonIdx() {
        return this.curJettonIdx
    }

    getCurSelectJetton() {
        return this.curSelectJetton
    }

    setJettonWorldPos(worldPos: Object) {
        this.jettonWorldPos.push(worldPos)
    }

    getJettonWorldPos(jettonNum: number = null) {
        if (jettonNum == null) {
            jettonNum = this.curSelectJetton.jettonNum
        }

        for (let v of this.jettonWorldPos) {
            if (v.jettonNum == jettonNum) {
                return v
            }
        }

        return this.jettonWorldPos[0]
    }

    destructor() {
        super.destructor()
        GameModel.instance = null
    }

    public static instance: GameModel = new GameModel()

    private constructor() {
        super()
    }
}