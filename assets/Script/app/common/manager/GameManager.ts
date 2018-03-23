import { BaseModel } from "../../common/baseui/BaseModel"
import { TimeUtil } from "../../common/util/TimeUtil"
import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import { FuncUtil } from "../util/FuncUtil"
import { GameCollectManager } from "../../common/manager/GameCollectManager"
import { SettingController } from "../../module/setting/controller/SettingController"
import { GameModel } from "../../module/game/model/GameModel"

export interface PlayerMsg {
    playerId: number;
    playerName: string;
    sex: number;
    gold: number;
    usableGold: number;
    severNo: number;
    loginTime: number;
    iconId: number;
    loginIP: string;
    updateFlag: number;
}

//投注信息
export interface BettingMsg {
    posId: number;          // 投注位置编号
    money: number;          // 投注金额
}

//赌桌区域信息
export interface ResultMsg {
    posId: number;          // 投注位置编号 1：庄家
    numbers: number;        // 牌号码组
    cardType: number;       // 牌类型  
    reulst: number;         //  -1：输  0：和  1：赢
}

//他人信息
export interface RoomPlayerMsg {
    playerId: number;           //角色编号
    playerName: string;         // 角色名称	
    iconId: number;             //头像编号
    banker: number;
}

//获取房间内信息
export interface BettingInfo {
    money: number;          // 玩家剩余金额
    bettingMsgList: BettingMsg;          // 当次投注信息
}

export interface RegionOdd {
    region: number;          // 区域
    odd: number;          // 赔率
}

export class GameManager extends BaseModel {
    public static instance: GameManager = new GameManager();

    private playerMsg: PlayerMsg = null;
    private gameLogList = []
    private serverTime: number = 0;
    private gameTypes: number[] = null    //已下载游戏类型
    private rob: number = 0;                 //抢庄
    private robzhuang: number = -1;              //  0 闲   1  庄
    private totalMoney: number = 0      //总投注金额
    private gamePlayState: number = 0       //坐下站起状态
    private bettingMsg: BettingMsg = null   //投注信息
    private bettingInfo = {}                //投注成功

    private betEndTime = 0                   // 投注结束时间搓
    private awardEndTime = 0                   // 发牌结束时间搓
    private resultMsg: ResultMsg = null     //赌桌区域信息
    private cardTotals: number[] = null     //号码球
    private roomPlayerMsg: RoomPlayerMsg[] = []     //他人信息

    private regionOdds: RegionOdd[] = []   //赔率

    private enterGame = {}                  //获取房间内信息

    private bettingTotal = null

    private areaTotalsList = []     //区域总投注
    private selfTotalsList = []
    private sucAreaTotalsList = []  //成功下注列表
    private winOrLose = null;   //玩家金币输赢结算

    private gameEndTime = null                  //结束时间
    private gameState = null                    //游戏阶段状态
    private awardNo: string = ""                //期号
    private lotteryLoglist = null               //历史记录
    private redenvelopes=0                      //红包数量
    private myTotal = 0

    public getPlayerMsg() {
        return this.playerMsg;
    }

    public getServerTime(): number {
        return this.serverTime;
    }

    public getGameTypes(gameType: number = null) {
        if (gameType) {
            for (let v of this.gameTypes) {
                if (v == gameType) {
                    return true
                }
            }

            return false
        }

        return this.gameTypes;
    }

    //开始投注
    public setStartBetting(msg) {
        this.myTotal = 0
        GameModel.instance.clearGameData()

        this.winOrLose = null;
        this.sucAreaTotalsList = []
        this.areaTotalsList = []
        this.selfTotalsList = []

        this.awardNo = msg.awardNo
        this.betEndTime = msg.endTime
        TimeUtil.syncServerTime(msg.currentTime)
        let remainTime = TimeUtil.getRemainTime(msg.endTime)

        this.setGameState(0)
        this.setGameEndTime(msg)
        this.changedModel("COMMON_START_BET_CHANGE", remainTime, msg.endTime)
        this.changedModel("COMMON_TIONRONROBZHUANG")
    }

    public getAwardNo() {
        return this.awardNo
    }

    //开始发牌
    public setStartAward(msg) {
        this.awardEndTime = msg.endTime
        this.resultMsg = msg.resultMsg
        this.cardTotals = msg.cardTotals
        let remainTime = TimeUtil.getRemainTime(msg.endTime)

        this.setGameState(1)
        this.setGameEndTime(msg)

        this.changedModel("COMMON_START_AWARD_CHANGE", remainTime, msg.endTime, msg)
    }

    public endBetting(msg) {
        let remainTime = TimeUtil.getRemainTime(msg.endTime)
        this.changedModel("COMMON_END_BETTING_CHANGE", remainTime, msg.endTime, msg)
    }

    public setWinOrLose(msg) {
        this.winOrLose = msg
    }

    public getCardTotals() {
        return this.cardTotals
    }

    public getStartAward() {
        return this.resultMsg
    }

    public getWinOrLose() {
        return this.winOrLose
    }

    public updateGold(msg) {
        this.playerMsg.gold = msg.gold
        this.playerMsg.usableGold = msg.usableGold

        this.changedModel("COMMON_UPDATE_GOLD_CHANGE", msg.gold)

        GameModel.instance.updateGold(msg.gold, msg.usableGold)
    }


    public updateGameTypes(gameType) {
        this.gameTypes.push(gameType)
    }

    public setLoginData(msg) {
        this.playerMsg = msg.playerMsgs;
        this.serverTime = msg.serverTime;
        this.gameTypes = msg.gameTypes;

        TimeUtil.syncServerTime(msg.serverTime)

        GameModel.instance.updateGold(msg.playerMsgs.gold, msg.playerMsgs.usableGold)

        this.changedModel("COMMON_UPDATE_GOLD_CHANGE", msg.playerMsgs.gold)
    }

    public updatePlayerMsg(msg) {
        this.playerMsg.iconId = msg.iconId
        this.playerMsg.playerName = msg.playerName
        this.playerMsg.sex = msg.sex
        this.playerMsg.updateFlag = msg.updateFlag

        this.changedModel("COMMON_PLAYER_CHANGE", msg);
    }

    public setTotalMoney(msg) {
        this.totalMoney = msg.totalMoney
        this.changedModel("COMMON_TOTAL_MONEY_CHANGE", msg);
    }

    public getTotalMoney() {
        return this.totalMoney
    }

    public setRoomPlayerMsg(msg) {
        // this.roomPlayerMsg = msg.players

        // this.changedModel("COMMON_ROOM_PLAYER_MSG_CHANGE", this.roomPlayerMsg);
    }

    public setRoomPlayerzhuang(playerId, banker) {
        // for (let i = 0; i < this.roomPlayerMsg.length; i++) {
        //     this.roomPlayerMsg[i].banker = 0;
        //     if (this.roomPlayerMsg[i].playerId == playerId) {
        //         this.roomPlayerMsg[i].banker = banker;
        //     }
        // }

    }

    public getRoomPlayerMsg() {
        return this.roomPlayerMsg
    }

    public getOtherRoomPlayerMsg() {
        // let players = this.roomPlayerMsg
        // for (let i = 0; i < players.length; i++) {
        //     if (players[i].playerId == this.playerMsg.playerId) {
        //         players.splice(i, 1)
        //         break
        //     }
        // }

        // return players
    }

    public addRoomPlayerMsg(msg) {
        // this.roomPlayerMsg.push(msg.players)

        // this.changedModel("COMMON_ROOM_PLAYER_MSG_CHANGE", this.roomPlayerMsg);
    }

    public delRoomPlayerMsg(msg) {
        // for (let i = 0; i < this.roomPlayerMsg.length; i++) {
        //     if (this.roomPlayerMsg[i].playerId == msg.playerId) {
        //         this.roomPlayerMsg.splice(i, 1)
        //         break
        //     }
        // }

        // this.changedModel("COMMON_DEL_ROOM_PLAYER_MSG_CHANGE", msg.playerId);
        // this.changedModel("COMMON_ROOM_PLAYER_MSG_CHANGE", this.roomPlayerMsg);
    }


    public setBettingTotal(msg) {
        this.bettingTotal = msg.totalsList
        this.changedModel("COMMON_BATTING_TOTAL_CHANGE", this.bettingTotal);
    }
    //进入房间
    public setEnterGame(msg) {
        TimeUtil.syncServerTime(msg.currentTime)

        msg.remainTime = TimeUtil.getRemainTime(msg.endTime)

        if (msg.playerMsgs) {
            this.playerMsg = msg.playerMsgs
        }
        this.gameLogList = msg.gameLogList
        //////////////cc.log(this.gameLogList)
        this.sucAreaTotalsList = []
        this.myTotal = 0
        for (let i = 0; i < msg.selfTotalsList.length; i++) {
            this.myTotal += msg.selfTotalsList[i].money

            let posId = msg.selfTotalsList[i].posId
            if (this.sucAreaTotalsList[posId] == null) {
                this.sucAreaTotalsList[posId] = msg.selfTotalsList[i]
            } else {
                this.sucAreaTotalsList[posId].money += msg.selfTotalsList[i].money
            }
        }

        GameModel.instance.initGameData(msg, this.myTotal,this.sucAreaTotalsList)

        this.cardTotals = msg.cardTotals
        this.areaTotalsList = msg.totalsList
        this.resultMsg = msg.resultMsg
        this.awardNo = msg.awardNo

        this.regionOdds = msg.regionOdds
        this.gamePlayState = msg.playGame
        this.lotteryLoglist = msg.lotteryLoglist;

        this.playeRoomPlayerMsg(msg)
        this.setTotalMoney(msg)
        this.setRoomPlayerMsg(msg)
        this.setBettingTotal(msg)
        // this.setStartAward(msg)
        this.setGameState(msg.state)
        this.setGameEndTime(msg)

        this.enterGame = msg
        this.changedModel("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame);
    }

    public getGameLogListFun() {
        return this.gameLogList
    }
    // 获取房间所有信息
    public getEnterGame() {
        return this.enterGame
    }

    public getlotteryLoglistmsg() {
        return this.lotteryLoglist
    }

    public setGameEndTime(msg) {
        this.gameEndTime = msg.endTime

        this.changedModel("COMMON_GAME_END_TIME_CHANGE", this.gameEndTime)
    }

    public getGameEndTime() {
        return this.gameEndTime
    }

    public setGameState(gameState) {
        this.gameState = gameState
    }
    // 0:投注阶段  1：开奖阶段	
    public getGameState() {
        return this.gameState
    }

    public getRegionOdds(areaIdx: number = null) {
        if (areaIdx == null) {
            return this.regionOdds
        }

        for (let i = 0; i < this.regionOdds.length; i++) {
            if (this.regionOdds[i].region == areaIdx) {
                return this.regionOdds[i]
            }
        }
    }

    public setSynTotalMoney(msg) {
        this.setTotalMoney(msg)

        for (let j = 0; j < msg.totalsList.length; j++) {
            let find = false

            for (let i = 0; i < this.areaTotalsList.length; i++) {
                if (this.areaTotalsList[i].posId == msg.totalsList[j].posId) {
                    find = true
                    this.areaTotalsList[i] = msg.totalsList[j]
                    break
                }
            }

            if (!find) {
                this.areaTotalsList.push(msg.totalsList[j])
            }
        }

        // this.areaTotalsList = msg.totalsList

        this.changedModel("COMMON_SYN_TOTAL_MONEY_CHANGE", msg);
    }

    //获取区域下注列表
    public getAreaTotalsList(areaIdx: number = null) {
        ////cc.log("getAreaTotalsList ", areaIdx)
        //////////cc.log(this.areaTotalsList)
        if (areaIdx == null) {
            return this.areaTotalsList
        } else {
            for (let i = 0; i < this.areaTotalsList.length; i++) {
                if (this.areaTotalsList[i].posId == areaIdx) {
                    return this.areaTotalsList[i] || { money: 0 }
                }
            }

            return { posId: areaIdx, money: 0 }
        }
    }

    //获取自己区域下注列表
    public getSucAreaTotalsList(areaIdx: number = null) {
        ////cc.log("getSucAreaTotalsList ", areaIdx)
        //////////cc.log(this.sucAreaTotalsList)
        if (areaIdx == null) {
            return this.sucAreaTotalsList
        } else {
            return this.sucAreaTotalsList[areaIdx] || { money: 0 }
        }
    }

    public getMySucBetTotal() {
        //cc.log("---------------getMySucBetTotal--------------")
        ////////cc.log(this.sucAreaTotalsList)
        let myTotal = 0
        for (let i = 0; i < this.sucAreaTotalsList.length; i++) {
            //cc.log("------i: ", i)
            if (this.sucAreaTotalsList[i]) {
                myTotal += this.sucAreaTotalsList[i].money
                ////////cc.log(myTotal)
            }
        }
        //cc.log("myTotal: ", myTotal)
        return myTotal
    }

    //获取其他区域下注列表
    public getOtherAreaTotalsList(areaIdx: number) {
        ////cc.log("getOtherAreaTotalsList ", areaIdx)
        let areaTotalList = this.getAreaTotalsList(areaIdx)
        let myAreaTotalList = this.getSucAreaTotalsList(areaIdx)
        //////////cc.log(areaTotalList)
        //////////cc.log(myAreaTotalList)

        return {
            posId: areaIdx,
            money: areaTotalList.money - myAreaTotalList.money
        }
    }

    public setGamePlayState(msg) {
        this.gamePlayState = msg.state
        this.changedModel("COMMON_GAME_STATE_CHANGE", msg);
    }
    //获取坐下站起
    public getGamePlayState() {
        return this.gamePlayState
    }

    public setBettingMsg(msg) {
        this.bettingMsg = msg

        this.changedModel("COMMON_BETTING_MSG_CHANGE", msg);
    }

    public getBettingMsg() {
        return this.bettingMsg
    }

    //投注成功
    public setBettingInfo(msg) {
        this.bettingInfo.money = msg.money
        this.bettingInfo.bettingMsgList = msg.bettingMsgList

        for (let i = 0; i < msg.bettingMsgList.length; i++) {
            let posId = msg.bettingMsgList[i].posId
            if (this.sucAreaTotalsList[posId] == null) {
                this.sucAreaTotalsList[posId] = msg.bettingMsgList[i]
            } else {
                this.sucAreaTotalsList[posId].money += msg.bettingMsgList[i].money
            }
        }

        this.changedModel("COMMON_BETTING_SUCC_CHANGE", msg)

        GameModel.instance.updateConfirmBetJetton(msg.bettingMsgList)
    }

    public getBettingInfo() {
        return this.bettingInfo
    }

    //抢庄
    public playerrobzhuangMsg(msg) {
        this.rob = msg.rob;
        this.changedModel("COMMON_ROB_ZHUANG_CHANGE", msg);
    }

    public getplayerrob() {
        return this.rob
    }
    
    //判断是否是庄
    public judgePlayerrob(player) {
        let playerMsg = GameManager.instance.getPlayerMsg()
        for (let i = 0; i < player.length; i++) {
            if (player[i].playerId == playerMsg.playerId) {
                if (player[i].banker == 0) {
                    this.robzhuang = -1
                    return
                }
                this.robzhuang = player[i].remainBanker
            }
        }
    }

    // 获取自己是否是庄
    public getjudgePlayerrob() {
        return this.robzhuang;
    }

    //更新玩家列表
    public playeRoomPlayerMsg(msg) {
        this.roomPlayerMsg = msg;
        this.redenvelopes=msg.players.length
        this.changedModel("COMMON_ROOM_PLAYER_CHANGE", msg);
        this.judgePlayerrob(msg.players)
    }

    //取消投注返回
    public setCancelBettingMsg(msg) {
        // let money = 0
        // for (let i = 0; i <= this.bettingInfo.bettingMsgList; i++) {

        // }
        // this.changedModel("COMMON_BETTING_SUCC_CHANGE", msg);
    }  

    public getredenvelopes() {
        return this.redenvelopes
    } 
}