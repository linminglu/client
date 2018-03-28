import { ResConfig as ResCfg } from "../util/ResConfig"
import { FuncUtil } from "../util/FuncUtil"
import { EmitterManager as Emitter } from "../manager/EmitterManager"
import { EmitterCfg } from "../../config/EmitterConfig"
import { MainController } from "../../module/main/controller/MainController"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { LonghudouModel } from "../../module/longhudou/model/LonghudouModel"
import { TonghuashunModel } from "../../module/Tonghuashun/model/TonghuashunModel"
import { GameManager } from "../../../app/common/manager/GameManager"
import { AudioManager } from "../manager/AudioManager"
import { GameModel } from "../../module/game/model/GameModel"


const { ccclass, property, executionOrder } = cc._decorator

@ccclass
@executionOrder(1)
export default class RateArea extends cc.Component {
    private betAreaIdx = null                   //下注区索引
    private rateObj = null

    onLoad() {
        this.betAreaIdx = this.node.parent.name.replace(/[^0-9]/ig, "")

        this.rateObj = GameManager.instance.getRegionOdds(Number(this.betAreaIdx) + 1) || {}
        this.initView()
    }

    onDestroy() {

    }

    initView() {
        let lblRate = this.node.getComponent(cc.Label)
        lblRate.string = `1:${this.rateObj.odd}`
    }
}
