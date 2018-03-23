import { NodePoolKey, NodePoolMgr } from "../../../../common/manager/NodePoolMgr";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { RankingListController } from "../../controller/RankingListController";
import { RankingListModel } from "../../../ranking/model/RankingListModel";
const { ccclass, property } = cc._decorator;
@ccclass
export default class IntegralView extends cc.Component {



    contentArr: cc.Node[] = []
    pageCount_I: number = 1
    onLoad() {


        let self = this
        this.node.on("bounce-top", function () {
            if (self.pageCount_I - 1 > 0) {
                self.pageCount_I--
            }

        })
        this.node.on("bounce-bottom", function () {
            if (self.pageCount_I + 1 < RankingListModel.instance.getPageCount_I()) {
                self.pageCount_I++;
            }
        })
        RankingListModel.instance.registerModelChanged("RANKING_DATA_L", this.I_dataListChangeFun, this)
    }

    onDestroy() {
        //super.destroy()
        RankingListModel.instance.unregisterModelChanged("RANKING_DATA_L", this.I_dataListChangeFun, this)
        this.destroy()
    }

    integralDataScrollViewFun() {


    }
    I_dataListChangeFun(eventName: string, data) {

        //console.log(data)  

        ResCfg.loadPrefab(this, "layRankingItem", function (self, Prefab) {
            let curView = null
            for (let i = 0; i < data.length; i++) {
                curView = cc.instantiate(Prefab)
                self.node.getComponent(cc.ScrollView).content.addChild(curView)
                curView.getComponent("LayRankingItem").upDataRankingFun(data[i], i)
                self.contentArr.push(curView)
            }

        })


    }
    _sendType1() {
        let param = {
            seq: RankingListModel.instance.getRankingSeq(),
            num: 0
        }
        RankingListController.instance.C_IntegralRank(param)
    }
    destroyContentFun() {

        for (let i = 0; i < this.contentArr.length; i++) {
            NodePoolMgr.instance.putNood(this.contentArr[i], NodePoolKey.MAIN_RANKING)
        }

    }

}
