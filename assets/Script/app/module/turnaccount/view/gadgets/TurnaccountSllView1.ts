const { ccclass, property } = cc._decorator;
import { TurnaccountModel } from "../../model/TurnaccountModel"
import { TurnaccountController } from "../../controller/TurnaccountController"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { FuncUtil } from "../../../../common/util/FuncUtil"
@ccclass
export default class TurnaccountSllView1 extends cc.Component {

    @property(cc.Sprite)
    sprLoad: cc.Sprite = null;

    scroll: cc.ScrollView = null;
    Content: cc.Node = null
    turnaccountArr = [];
    pageCount: number = 0;
    countNum: number = 1;
    CoordCurrent: cc.Vec2 = cc.p()
    CoordMax: cc.Vec2 = cc.p();
    param = {
        gameId: 1,
        beginDate: 0,
        endDate: 0,
        dateUnit: 0,
        pageNum: 1
    }
    bottomAndtopblr: boolean = true
    onLoad() {

        ResCfg.loadPrefab(this, "turnaccountItem1", function (self, Prefab1) {
            for (let i = 0; i < 6; i++) {
                self.turnaccountArr[i] = cc.instantiate(Prefab1);
                self.Content.addChild(self.turnaccountArr[i])
            }
            TurnaccountController.instance.C_CostLog(self.param)
        })
        this.scroll = this.node.getComponent(cc.ScrollView)
        this.Content = this.scroll.content;
        let self = this
        this.scroll.node.on("bounce-bottom", function () {
            self.pageCount = TurnaccountModel.instance.getPageCount(1);
            if (self.countNum + 1 <= self.pageCount && (self.CoordCurrent.y > self.CoordMax.y + 33.5)) {
                ++self.countNum;
                self.param.pageNum = self.countNum;
                self.param.beginDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).startTime)
                self.param.endDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).endtTime)
                self.param.dateUnit = TurnaccountModel.instance.getTurnaccountFindLay_num()
                TurnaccountController.instance.C_CostLog(self.param)
                self.bottomAndtopblr = true
            }
        })

        this.scroll.node.on("bounce-top", function () {
            self.pageCount = TurnaccountModel.instance.getPageCount(1);
            if (self.countNum - 1 > 0 && (self.CoordCurrent.y < -45)) {
                --self.countNum;
                self.param.pageNum = self.countNum;
                self.param.beginDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).startTime)
                self.param.endDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(1).endtTime)
                self.param.dateUnit = TurnaccountModel.instance.getTurnaccountFindLay_num()
                TurnaccountController.instance.C_CostLog(self.param)
                self.bottomAndtopblr = false;
            }

        })
       

    }
    onEnable() {

        TurnaccountModel.instance.registerModelChanged("COMMON_TURN_DATA_B", this.turnaccountDataFun1, this)
    }

    onDisable() {

        TurnaccountModel.instance.unregisterModelChanged("COMMON_TURN_DATA_B", this.turnaccountDataFun1, this)

    }
    onDestroy() {
        TurnaccountModel.instance.unregisterModelChanged("COMMON_TURN_DATA_B", this.turnaccountDataFun1, this)
    }


    turnaccountDataFun1(eventName: string, data) {

        //cc.log("~~~~~~~~~~~~~~~转账1~~~~~~~~~~~~~~~~~~~~~")
        let dataArr = data
        let dataLen = dataArr.length
        let turnaccountArrLen = this.turnaccountArr.length
        for (let i = 0; i < 6; i++) {
            this.turnaccountArr[i].getComponent("TurnaccountItem1").lblInitFun()
        }
        for (let i = 0; i < dataArr.length; i++) {
            if (i < turnaccountArrLen) {
                this.turnaccountArr[i].getComponent("TurnaccountItem1").upDataTurnaccountFun1(dataArr[i])
            } else {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.CHANGE_ACCOUNT)
                if (cc.isValid(prefab)) {
                    this.Content.addChild(prefab)
                    prefab.getComponent("TurnaccountItem1").upDataTurnaccountFun1(dataArr[i]);
                    this.turnaccountArr.push(prefab)
                } else {

                    ResCfg.loadPrefab(this, "turnaccountItem1", function (self, Prefab1) {
                        let cView = cc.instantiate(Prefab1);
                        self.Content.addChild(cView)
                        cView.getComponent("TurnaccountItem1").upDataTurnaccountFun1(data[i])
                        self.turnaccountArr.push(cView);

                    })
                }

            }
        }
        if (dataLen > 6) {
            for (let i = dataLen; i < this.turnaccountArr.length; i++) {
                if (cc.isValid(this.turnaccountArr[i])) {
                    NodePoolMgr.instance.putNood(this.turnaccountArr[i], NodePoolKey.CHANGE_ACCOUNT)
                    this.turnaccountArr.splice(i, 1);
                }
            }
        } else {
            for (let i = 6; i < this.turnaccountArr.length; i++) {
                 if (cc.isValid(this.turnaccountArr[i])) {
                    NodePoolMgr.instance.putNood(this.turnaccountArr[i], NodePoolKey.CHANGE_ACCOUNT)
                    this.turnaccountArr.splice(i, 1);
                }
            }
        }

        if (this.bottomAndtopblr) {
            this.scroll.scrollToTop(0.1);
        } else {
            if (dataLen > 6) {
                this.scroll.scrollToBottom(0.1);
            }
        }
    }

    offsetscrollViewFun() {

        this.CoordCurrent = this.scroll.getScrollOffset();
        this.CoordMax = this.scroll.getMaxScrollOffset();
        let CoordMin = -40;
        if (this.CoordCurrent.y < CoordMin) {
            this.sprLoad.node.active = true;
            this.sprLoad.node.setPositionY(150)
            this.sprLoad.node.resumeAllActions();
        } else if (this.CoordCurrent.y > this.CoordMax.y + 35) {
            this.sprLoad.node.setPositionY(-150)
            this.sprLoad.node.active = true;
            this.sprLoad.node.resumeAllActions();
        } else {
            this.sprLoad.node.active = false;
            this.sprLoad.node.pauseAllActions();
        }

    }
}
