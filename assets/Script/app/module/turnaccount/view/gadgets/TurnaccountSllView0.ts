const { ccclass, property } = cc._decorator;
import { TurnaccountModel } from "../../model/TurnaccountModel"
import { TurnaccountController } from "../../controller/TurnaccountController"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { FuncUtil } from "../../../../common/util/FuncUtil"
@ccclass
export default class TurnaccountSllView0 extends cc.Component {


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
        beginDate: 0,
        endDate: 0,
        pageNum: 1

    }
    bb:number = 1
    bottomAndtopblr:boolean = true
    onLoad() {

        /**optional int64 beginDate = 1;//查询条件：开始时间
	optional int64 endDate = 2;//查询条件：结束时间
    optional int32 pageNum = 3;//查询条件：第几页 
    
     TURN_ACCOUNT, //转账
        CHANGE_ACCOUNT, //账变

        */
        // let str ="11111111111111;111111111111111;-54;99"
        // //cc.log("输出====",str.split(";"))
       
        this.sprLoad.node.runAction(cc.repeatForever(cc.rotateBy(1.5, 360)))
        ResCfg.loadPrefab(this, "turnaccountItem0", function (self, Prefab1) {
            for (let i = 0; i < 6; i++) {
                self.turnaccountArr[i] = cc.instantiate(Prefab1);
                self.Content.addChild(self.turnaccountArr[i])
            }
            TurnaccountController.instance.C_TransferRecord(self.param);
        })
        this.scroll = this.node.getComponent(cc.ScrollView)
        this.Content = this.scroll.content;
        
        let self = this
        this.scroll.node.on("bounce-bottom", function () {
            self.pageCount = TurnaccountModel.instance.getPageCount(0);
            if (self.countNum + 1 <= self.pageCount && (self.CoordCurrent.y > self.CoordMax.y + 33.5)) {
                ++self.countNum;
                self.param.pageNum = self.countNum;
                self.param.beginDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).startTime)
                self.param.endDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).endtTime)
                TurnaccountController.instance.C_TransferRecord(self.param)
                self.bottomAndtopblr = true
            }
        })
     
        this.scroll.node.on("bounce-top", function (event) {
            cc.log("sssssssssssssssssss===",event)
            self.pageCount = TurnaccountModel.instance.getPageCount(0);
            if (self.countNum - 1 > 0 && (self.CoordCurrent.y < -45)) {
                --self.countNum;
                self.param.pageNum = self.countNum;
                self.param.beginDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).startTime)
                self.param.endDate = FuncUtil.getTime_1(TurnaccountModel.instance.getFindTimeFun(0).endtTime)
                TurnaccountController.instance.C_TransferRecord(self.param)
                self.bottomAndtopblr = false
            }

        })
        
    }
 
    onEnable() {

        TurnaccountModel.instance.registerModelChanged("COMMON_TURN_DATA_A", this.turnaccountDataFun0, this)
    }

    onDisable() {

        TurnaccountModel.instance.unregisterModelChanged("COMMON_TURN_DATA_A", this.turnaccountDataFun0, this)
        //cc.log("this.bb====",this.bb)

    }
    onDestroy() {
        TurnaccountModel.instance.unregisterModelChanged("COMMON_TURN_DATA_A", this.turnaccountDataFun0, this)
        //cc.log("this.bb====",this.bb)
    }
 
    turnaccountDataFun0(eventName: string, data) {
        let dataArr = data
        let dataLen = dataArr.length
        let turnaccountArrLen = this.turnaccountArr.length
        //cc.log("~~~~~~~~~~~~~~~转账0~~~~~~~~~~~~~~~~~~~~~")

        for (let i = 0; i < 6; i++) {
            this.turnaccountArr[i].getComponent("TurnaccountItem0").lblInitFun()
        }

        for (let i = 0; i < dataArr.length; i++) {
            if (i < turnaccountArrLen) {
                this.turnaccountArr[i].getComponent("TurnaccountItem0").upDataTurnaccountFun0(dataArr[i])
            } else {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.TURN_ACCOUNT)
                if (cc.isValid(prefab)) {
                    this.Content.addChild(prefab)
                    prefab.getComponent("TurnaccountItem0").upDataTurnaccountFun0(dataArr[i]);
                    this.turnaccountArr.push(prefab)
                } else {
                    ResCfg.loadPrefab(this, "turnaccountItem0", function (self, Prefab) {
                        let cView = cc.instantiate(Prefab);
                        self.Content.addChild(cView)
                        cView.getComponent("TurnaccountItem0").upDataTurnaccountFun0(data[i])
                        self.turnaccountArr.push(cView);
                    })
                }

            }
        }
        // if (dataLen >= 30) {
        //     this.scroll.elastic = true
        // } else {
        //     this.scroll.elastic = false
        // }

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
