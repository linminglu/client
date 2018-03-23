import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LayRankingItem extends cc.Component {

    @property(cc.Sprite)
    sprBg: cc.Sprite = null
    @property(cc.Sprite)
    sprCrown: cc.Sprite = null;
    @property(cc.Sprite)
    txtNum: cc.Sprite = null;
    @property(cc.Label)
    lblPlayerName: cc.Label = null;
    @property(cc.Label)
    lblPlayerGold: cc.Label = null;
    @property(cc.Label)
    lblPlayerHistory: cc.Label = null;
    @property(cc.Label)
    lblCurren: cc.Label = null;
    @property(cc.Sprite)
    sprIcon: cc.Sprite = null;
    iconArr = ["ranking-icon_flat", "ranking-icon_up", "ranking-icon_down"]
    colorArr = [new cc.Color(255,216,60),new cc.Color(238,238,238),new cc.Color(250,94,54)]
    onLoad() {


    }

    upDataRankingFun(data, index) {

        // optional int32 activitySeq = 1;//活动排期流水号
        // optional string playName = 2 ;//玩家名
        // optional int32 integral = 3;//积分
        // optional int32 historyBest = 4;//历史最佳排行
        // optional int32 nowRank = 5;//昨日当前排行
        // optional int32 upOrDown = 6;//排名变更 （等于0-不变  大于0-上升 小于-下降）

        this.lblPlayerName.string = data.playName;
        this.lblPlayerGold.string = data.integral.toString();;
        this.lblPlayerHistory.string = data.historyBest
        this.lblCurren.string = data.nowRank + "/" + data.historyBest
        ResCfg.loadPlist(this, "main", function (self, atlas) {

            self.sprIcon.spriteFrame = atlas.getSpriteFrame(self.iconArr[self.sprIconfun(data.upOrDown)]);
            if (index < 3) {
                self.sprCrown.spriteFrame = atlas.getSpriteFrame(`ranking-icon_crown_${index + 1}`);
                self.txtNum.spriteFrame = atlas.getSpriteFrame(`ranking-txt_num_${index + 1}`);
                self.lblPlayerName.node.color = self.colorArr[index]
                self.lblPlayerGold.node.color =self.colorArr[index]
                self.lblPlayerHistory.node.color = self.colorArr[index]
                self.lblCurren.node.color = self.colorArr[index]
            } else {
                self.sprCrown.node.active = false;
                self.txtNum.node.active = false;
                self.sprBg.spriteFrame = atlas.getSpriteFrame(`ranking-frame_bg_1`);
            }
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
