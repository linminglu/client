import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { FuncUtil } from "../../../common/util/FuncUtil"
import { RankingListModule } from "../RankingListModule"
import { MainController } from "../../main/controller/MainController"
import { RankingListModel } from "../../ranking/model/RankingListModel"
import { NodePoolKey,NodePoolMgr} from "../../../common/manager/NodePoolMgr"
import { RankingListController } from "../controller/RankingListController"
const { ccclass, property } = cc._decorator;
@ccclass
export default class RankingListView extends BaseView {

    @property(cc.Sprite)
    txtSprGold: cc.Sprite = null;
    @property(cc.Node)
    layOwnData: cc.Node = null;
    rankingArr = [];
    Content: cc.Node = null;
    btnPageArr: cc.Node[] = [];
    data = []
    scrollViewArr:cc.Node[] = [];

    onLoad() {
        this.btnPageArr = this.node.getChildByName("btnPage").children
        this.scrollViewArr = this.node.getChildByName("scrollViewLay").children
        MainController.instance.C_Activity_GetAvailableActivityList();
        this.node.getChildByName("sprBg").on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        RankingListModel.instance.registerModelChanged("PLAYER_DATA",this.upLayOwnDataFun,this)
        
    }

    onDestroy() {
        RankingListModel.instance.unregisterModelChanged("PLAYER_DATA",this.upLayOwnDataFun,this)
        super.destructor()
    }


    btnShutCallBack() {

        RankingListModule.instance.hide();
        
    }




    btnIntegralCallBack(data, eventNum) {

        // let prame = {
        //     seq:RankingListModel.instance.getRankingSeq(),
        //     type:eventNum
        // }
        // RankingListController.instance.C_IntegralRank(prame);
        for (let i = 0; i < this.btnPageArr.length; i++) {
            if (i == eventNum) {
                this.btnPageArr[i].getComponent(cc.Button).interactable = false;
                this.scrollViewArr[i].active = true
            } else {
                this.btnPageArr[i].getComponent(cc.Button).interactable = true;
                this.scrollViewArr[i].active = false
            }

        }
        
    }

    upLayOwnDataFun(eventName:string,data)   //自己的数据
    {
       let iconArr = ["ranking-icon_flat", "ranking-icon_up", "ranking-icon_down"]
        // optional int32 activitySeq = 1;//活动排期流水号
        // optional string playName = 2 ;//玩家名
        // optional int32 integral = 3;//积分
        // optional int32 historyBest = 4;//历史最佳排行
        // optional int32 nowRank = 5;//昨日当前排行
        // optional int32 upOrDown = 6;//排名变更 （等于0-不变  大于0-上升 小于-下降）

        let lblPlayerName = this.layOwnData.getChildByName("lblPlayerName");
        let lblPlayerGold = this.layOwnData.getChildByName("lblPlayerGold");
        let lblPlayerHistory = this.layOwnData.getChildByName("lblPlayerHistory");
        let lblCurren = this.layOwnData.getChildByName("lblCurren");
        let sprIcon = this.layOwnData.getChildByName("sprIcon");
        lblPlayerName.getComponent(cc.Label).string = data.playName;
        lblPlayerGold.getComponent(cc.Label).string = data.integral.toString();
        lblPlayerHistory.getComponent(cc.Label).string = data.historyBest
        lblCurren.getComponent(cc.Label).string = data.nowRank + "/" + data.historyBest
        ResCfg.loadPlist(this, "main", function (self, atlas) {
            sprIcon.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(iconArr[self.sprIconfun(data.upOrDown)]);
        }, false)

    }
    sprIconfun(upOrDown) {
        let num = 0
        if (upOrDown > 0) {
            num = 1
        } else if (upOrDown < 0) {
            num = 2
        } else {
            num = 0
        }
        return num
    }
}