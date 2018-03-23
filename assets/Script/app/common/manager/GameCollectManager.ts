import { FuncUtil } from "../../common/util/FuncUtil"

export class GameCollectManager {
    public static instance: GameCollectManager = new GameCollectManager()

    private _gameType: number = null;   //游戏类型
    private _gameTag: string = null;
    private _gameId: number = null; //游戏id

    private _gameArr: Object = {}; //当前游戏数据

    private _jettonArr = []; //当前游戏筹码数据
    private _jettonNumArr = []; //当前游戏筹码额列表

    
    public initGameData() {
        this._gameType = null
        this._gameTag = null
        this._gameId = null
        this._gameArr = {}
        this._jettonArr = []
    }

    public getGameTyp() {
        return this._gameType;
    }

    public getGameTag() {
        return this._gameTag;
    }

    public getGameId() {
        return this._gameId
    }

    public getGameArr() {
        return this._gameArr
    }

    public setSrcGameData(msg, gameTag, gameArr) {
        if (msg.gameType) {
            this._gameType = msg.gameType
        }

        if (msg.gameId) {
            this._gameId = msg.gameId
        }

        if (gameTag) {
            this._gameTag = gameTag
            this.setGameArr(gameArr)
        }
    }

    public setGameData(gameData) {
        this._gameType = gameData.gameType
        this._gameTag = gameData.gameTag
    }

    //进入游戏数据
    public setGameArr(data) {
        // ////////////cc.log(data)
        this._gameId = data.gameId
        this._gameArr = data

        this.setJettonArr(data.chipCombination)
    }

    private setJettonArr(jettonStr: string) {
        this._jettonArr = []
        this._jettonNumArr = []

        let jettonArr = FuncUtil.getSplitStr(jettonStr)

        FuncUtil.getJsonConfig("game_jetton", null, function (data, self) {
            for (let i = 0; i < jettonArr.length; i++) {
                self._jettonArr[i] = data["id" + jettonArr[i]]
                self._jettonNumArr[i] = self._jettonArr[i].jettonNum
            }
        }, this)
    }

    public getJettonArr() {
        return this._jettonArr
    }

    public getJettonNumArr() {
        return this._jettonNumArr
    }
}