/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"

let synNotice: any = []

export class MainModel extends BaseModel {
    // private synNotice = new Array()
    // private synNotice: any = []

    private esessionArr = {}
    private gameData = []
    private lstData = []

    updateNoticeData(data) {
        // //////cc.log("data: ", data)
        synNotice.push(data)
        // //////cc.log("synNotice: ", synNotice)
        this.changedModel("MAIN_SHOW_NOTICE", data);
    }

    getNoticeData() {
        // //////cc.log("synNotice: ", synNotice)
        if (synNotice[0]) {
            return synNotice.shift()
        } else {
            return null
        }
    }

    initGameData(msg) {
        let self = this

        self.gameData = []
        FuncUtil.getJsonConfig("game_item_c", null, function (data, self) {
            self.gameData = msg.baseGameMsgs
            // ////////cc.log(data)
            for (let i = 0; i < self.gameData.length; i++) {
                if (i == 0) {
                    self.gameData[i].light = 1
                } else {
                    self.gameData[i].light = 0
                }
    
                let key = `id${self.gameData[i].gameType}`
                // ////////cc.log(key)
                // ////////cc.log(data[key])
                self.gameData[i].gameTag = data[key].gameTag
                self.gameData[i].gameState = data[key].gameState
            }
    
            self.gameData.sort(function (a, b) { return b.tagType - a.tagType })
    
            self.updateGameData(cc.sys.localStorage.getItem("CUR_GAME_TYPE"))
        }, this)
    }

    updateGameData(gameType) {
        //cc.log("updateGameData: ", gameType)
        // ////////cc.log(this.gameData)

        if (gameType != null) {
            for (let i = 0; i < this.gameData.length; i++) {
                if (this.gameData[i].gameType == gameType) {
                    this.gameData[i].light = 1
                } else {
                    this.gameData[i].light = 0
                }
            }
        }

        this.gameData.sort(function (a, b) { return b.light - a.light })

        // ////////cc.log(this.gameData)

        // this.changedModel("GAME_CUR_GAME_TYPE", this.gameData)
    }

    getGameData() {
        return this.gameData
    }

    getCurEsessionData(gameData, callbackFun: Function, context) {
        // ////////////cc.log(gameData)
        if (this.esessionArr[gameData.gameType]) {
            callbackFun(this.esessionArr[gameData.gameType], context)
            return
        } else {
            this.esessionArr[gameData.gameType] = []
        } 
        // ////////////cc.log(this.esessionArr)
        
        FuncUtil.getJsonConfig("gamehall", null, function (data, self) {
            // ////////////cc.log(data)
            let maxNum = Object.getOwnPropertyNames(data).length
            // ////////////cc.log(maxNum)
            for (let i = 0; i < maxNum; i++) {
                let key = `id${i + 1}`
                if (data[key] && data[key].gameType == gameData.gameType) {
                    self.esessionArr[gameData.gameType].push(data[key])
                }
            }
            callbackFun(self.esessionArr[gameData.gameType], context)
        }, this)
    }

    destructor() {
        super.destructor();
        MainModel.instance = null;
    }

    public static instance: MainModel = new MainModel()

    private constructor() {
        super();
    }
}