import { BaseController } from "../../../common/baseui/BaseController"
import { GameModel } from "../model/GameModel"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { GameModule } from "../../game/GameModule"
import { TonghuashunModule } from "../../tonghuashun/TonghuashunModule"
import { TonghuashunController as TongCtr } from "../../tonghuashun/controller/TonghuashunController"
import { TonghuashunModel as TongModel} from "../../tonghuashun/model/TonghuashunModel"
import { LonghudouModule } from "../../longhudou/LonghudouModule"
import { LoginController } from "../../login/controller/LoginController"
import { FactoryUtil } from "../../../common/util/FactoryUtil"
import {FuncUtil} from "../.././../common/util/FuncUtil"
import { GameManager } from "../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { SignModel } from "../../sign/model/SignModel"
import  { MainController }  from "../../main/controller/MainController"
export class GameController extends BaseController {
    //确定投注
    C_Betting(bettingMsgList) {
        let msgName = "C_Betting"
        let msgData = {bettingMsgList: bettingMsgList}

        this.sendData(msgName, msgData)
    }

    //发送坐下站起
    C_PlayGame(param) {
        let msgName = "C_PlayGame"
        let msgData = param
        this.sendData(msgName, msgData);
    }

    //接受坐下站起
    S_PlayGame(msg) {
        GameManager.instance.setGamePlayState(msg)
    }

    // //确定投注
    // C_Betting(param) {
    //     let msgName = "C_Betting";
    //     let msgData = param
    //     for (let i = 0; i < msgData.bettingMsgList.length; i++) {
    //         //////////cc.log(this.float2Int(msgData.bettingMsgList[i].money))
    //         msgData.bettingMsgList[i].money = this.float2Int(msgData.bettingMsgList[i].money)
    //     }
    //     //////////cc.log(msgData)
    //     this.sendData(msgName, msgData);
    // }
    
    //投注成功
    S_Betting(msg) {
        msg.money = this.int2Float(msg.money)
        //////////cc.log(msg)
        GameManager.instance.setBettingInfo(msg)
    }

    //同步投注金额
    S_SynMoney(msg) {
        msg.totalMoney = this.int2Float(msg.totalMoney)
        for (let i = 0; i < msg.totalsList.length; i++) {
            msg.totalsList[i].money = this.int2Float(msg.totalsList[i].money)
        }

        GameManager.instance.setSynTotalMoney(msg)
    }

    //取消投注
    C_CancelBetting(param) {

    }

    S_CancelBetting(msg) {
        GameManager.instance.setCancelBettingMsg(msg)
    }

    //添加赌桌上玩家
    S_AddRoomPlayer(msg) {
        GameManager.instance.addRoomPlayerMsg(msg)
    }

    //移除赌桌上自己
    C_RemoveRoomPlayer() {
        let msgName = "C_RemoveRoomPlayer";
        this.sendData(msgName);
    }

    //移除赌桌上玩家
    S_RemoveRoomPlayer(msg) {
        GameManager.instance.delRoomPlayerMsg(msg)
    }

    //玩家抢庄
    C_RobBanker(param) {
        //////////cc.log(param)
        let msgName = "C_RobBanker";
        let msgData = {
            rob: param
        }
        this.sendData(msgName, msgData);
    }

    //玩家抢庄返回
    S_RobBanker(msg) {
        //////////cc.log(msg)
        GameManager.instance.playerrobzhuangMsg(msg)
    }

    //开始投注
    S_StartBetting(msg) {
        GameManager.instance.setStartBetting(msg)
    }

    //开始发牌
    S_StartAward(msg) {
         //GameManager.instance.setStartAward(msg)
    }
    
    C_QuiteGame(param = null) {
        let msgName = "C_QuiteGame"
        this.sendData(msgName)
    }

    S_QuiteGame(msg) {
        // console.log("11111111111111111111111========9999999");
        MainController.instance.C_Activity_GetAvailableActivityList()//退出游戏刷新活动列表
        Emitter.fire(EmitterCfg.GAME_EXIT_SUCC, msg)
    }

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: GameController = new GameController()

    destructor() {
        super.destructor()

        this.delEveRegister()     //移除监听
        GameController.instance = null
    }

    private constructor() {
        super()
        this.addNetRegister()     //网络监听
        this.addEveRegister()     //事件监听
    }

    addNetRegister() {
        // this.register("S_SynGold", this.S_SynGold, this);
        // this.register("S_SynNotic", this.S_SynNotic, this);
        // this.register("S_PlayGame", this.S_PlayGame, this);
        // this.register("S_SynMoney", this.S_SynMoney, this);
        // this.register("S_CancelBetting", this.S_CancelBetting, this);
        // this.register("S_Betting", this.S_Betting, this);
        // this.register("S_PlayGame", this.S_PlayGame, this);
        // // this.register("S_EnterGame", this.S_EnterGame, this);

        // this.register("S_AddRoomPlayer", this.S_AddRoomPlayer, this);
        // this.register("S_RemoveRoomPlayer", this.S_RemoveRoomPlayer, this);
        // this.register("S_RobBanker", this.S_RobBanker, this);
        
        // this.register("S_StartBetting", this.S_StartBetting, this);
        // this.register("S_StartAward", this.S_StartAward, this);

        this.register("S_QuiteGame", this.S_QuiteGame, this)
    }

    addEveRegister() {
    }

    delEveRegister() {
    }
}