import { NodePoolKey, NodePoolMgr } from "../../../../common/manager/NodePoolMgr"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { RankingListController } from "../../controller/RankingListController";
import { RankingListModel } from "../../../ranking/model/RankingListModel";
const { ccclass, property } = cc._decorator;
@ccclass
export default class WinPlayerView extends cc.Component {


    contentArr: cc.Node[] = [];
    pageCount_W: number = 1;
    onLoad() {
        this._sendType2()
        this.winPlayerDataScrollViewFun()
        let self = this
        this.node.on("bounce-top", function () {
            if (self.pageCount_W - 1 > 0) {
                self.pageCount_W--
            }

        })
        this.node.on("bounce-bottom", function () {
            if (self.pageCount_W + 1 < RankingListModel.instance.getPageCount_W()) {
                self.pageCount_W++;
            }
        })
        RankingListModel.instance.registerModelChanged("RANKING_DATA_W",this.W_dataListChangeFun,this)
    }
    onDestroy() {
        RankingListModel.instance.unregisterModelChanged("RANKING_DATA_W",this.W_dataListChangeFun,this)
        this.destroyContentFun()
        this.destroy()
    }

    winPlayerDataScrollViewFun() {
        

    }

    W_dataListChangeFun(eventName: string, data) {
        //console.log("W_dataListChangeFun===",data)
         
        ResCfg.loadPrefab(this, "layRankingItem", function (self, Prefab) {
            for (let i = 0; i < data.length; i++) {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.MAIN_RANKING)
                if (cc.isValid(prefab)) {
                    this.node.getComponent(cc.ScrollView).content.addChild(prefab)
                    prefab.getComponent("LayRankingItem").upDataRankingFun(data[i], i)
                   // console.log("///////////////*************************/////////////")
                    this.contentArr.push(prefab)
                } else{
                    let curView = cc.instantiate(Prefab)
                    self.node.getComponent(cc.ScrollView).content.addChild(curView)
                    curView.getComponent("LayRankingItem").upDataRankingFun(data[i], i)
                    self.contentArr.push(curView)
                }

            }
            
        })  
       

    }

    _sendType2() {
        let param = {
            seq: RankingListModel.instance.getRankingSeq(),
            num: 1,
        }
        RankingListController.instance.C_IntegralRank(param)
    }
    destroyContentFun() {

        for (let i = 0; i < this.contentArr.length; i++) {
            NodePoolMgr.instance.putNood(this.contentArr[i], NodePoolKey.MAIN_RANKING)
        }

    }

}
