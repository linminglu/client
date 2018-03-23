const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { AudioManager } from "../../common/manager/AudioManager";
import { AnimationMgr } from "../../common/manager/AnimationMgr";
import { GameCollectManager as GameColMgr } from "../../common/manager/GameCollectManager";
import { FuncUtil } from "../../common/util/FuncUtil"
import { GameManager } from "../../common/manager/GameManager"
@ccclass
export default class CompareItem extends cc.Component {

    @property(cc.Sprite)
    sprLeft: cc.Sprite = null;
    @property(cc.Sprite)
    sprRight: cc.Sprite = null;
    sprLeftCard = null;
    sprRightCard = null;

    Animbaozha = null;
    Animgamehe = null;
    Animgametype1 = null;
    Animgametype2 = null;
    Animgamewin = null;
    Animgamelose = null;

    onLoad() {

    }

    onDestroy() {

    }


    //初始化
    Initialization() {

        let len = this.sprLeft.node.getChildByName("nodeBrand").childrenCount;
        if (len > 5 && this.sprLeftCard != null && this.sprRightCard != null) {
            this.initNiuniuFun(this.sprLeftCard, this.sprRightCard);
        }
        this.sprLeft.node.setPosition(-700, 0)
        this.sprRight.node.setPosition(700, 0)
        let sprinflat = this.node.getChildByName("sprinflat")
        if (cc.isValid(sprinflat)) {
            this.node.getChildByName("sprinflat").active = false;
        }
        this.node.getChildByName("nodeResult").active = false;
        this.sprLeft.node.getChildByName("nodeToash").active = false;
        this.sprRight.node.getChildByName("nodeToash").active = false;
        if (cc.isValid(this.Animbaozha))this.Animbaozha.stop()
        if (cc.isValid(this.Animgamehe))this.Animgamehe.stop()
        if (cc.isValid(this.Animgametype1))this.Animgametype1.stop()
        if (cc.isValid(this.Animgametype2))this.Animgametype2.stop()
        if (cc.isValid(this.Animgamewin))this.Animgamewin.stop()
        if (cc.isValid(this.Animgamelose))this.Animgamelose.stop()
    }



    //                      闲家牌型      庄家牌型      输赢   风雨雷    
    receiveCompareItemFun(curViewXian, curViewzhuang, result, xian) {
        let len = this.sprLeft.node.getChildByName("nodeBrand").childrenCount;
        ResCfg.loadPlist(this, "compare", function (self, Asste) {
            let sprxian = Asste.getSpriteFrame("common-txt_xian_" + xian);
            self.sprLeft.node.getChildByName("sprxian").getComponent(cc.Sprite).spriteFrame = sprxian;
        })
        if (len > 5) {
            this.upNiuniuTheCardFun(xian, curViewXian, curViewzhuang)
        } else {
            this.brandValueFun(xian)
        }
        let self = this;
        self.sprRight.node.runAction(cc.moveTo(0.3, 0, 0))
        self.sprLeft.node.runAction(cc.moveTo(0.3, 0, 0))
        if (!cc.isValid(self.Animbaozha))self.Animbaozha = new AnimationMgr(self.node.getChildByName("sprLightn"), "baozha")
        self.Animbaozha.play()
        let nodeResult = self.node.getChildByName("nodeResult")
        let gameName = GameColMgr.instance.getGameTag()
        if (nodeResult.getChildByName("sprRightWin").active == false) {
            nodeResult.getChildByName("sprRightWin").active = true
            nodeResult.getChildByName("sprLeftWin").active = true
        }
        ResCfg.loadPlist(self, gameName, function (self, atlas) {
            let resultxian = null;
            let resultzhuang = null;
            if (result == 0) {
                resultxian = atlas.getSpriteFrame("compare-txt_Win_" + curViewXian);
                resultzhuang = atlas.getSpriteFrame("compare-txt_Win_" + curViewzhuang);
            } else if (result == -1) {
                resultxian = atlas.getSpriteFrame("compare-txt_Defeat_" + curViewXian);
                resultzhuang = atlas.getSpriteFrame("compare-txt_Win_" + curViewzhuang);
                nodeResult.getChildByName("sprRightWin").setPosition(-276, -159)
                nodeResult.getChildByName("sprLeftWin").setPosition(276, -197)
            } else if (result == 1) {
                resultxian = atlas.getSpriteFrame("compare-txt_Win_" + curViewXian);
                resultzhuang = atlas.getSpriteFrame("compare-txt_Defeat_" + curViewzhuang);
                nodeResult.getChildByName("sprLeftWin").setPosition(-276, -159)
                nodeResult.getChildByName("sprRightWin").setPosition(276, -197)
            }
            nodeResult.getChildByName("sprRighttype").getComponent(cc.Sprite).spriteFrame = resultxian
            nodeResult.getChildByName("sprLefttype").getComponent(cc.Sprite).spriteFrame = resultzhuang
        }, true)
        FuncUtil.delayFunc(function () {
            self.sprLeftCard = curViewXian
            self.sprRightCard = curViewzhuang
            self.PlayAnimationFun()
            nodeResult.active = true;
            if (result == 0) {
                nodeResult.getChildByName("sprRightWin").active = false
                nodeResult.getChildByName("sprLeftWin").active = false
                self.node.getChildByName("sprinflat").active = true;
                if (!cc.isValid(self.Animgamehe))self.Animgamehe = new AnimationMgr(self.node.getChildByName("sprinflat"), "gamehe")
                self.Animgamehe.play()

                return;
            } else if (result == -1) {
                self.sprLeft.node.getChildByName("nodeToash").active = true;
                AudioManager.instance.playEffect("eff_bipai_shu")
            } else if (result == 1) {
                self.sprRight.node.getChildByName("nodeToash").active = true;
                AudioManager.instance.playEffect("eff_bipai_ying")
            }

        }, 1, self.node)
    }

    //播放动画
    PlayAnimationFun() {
        let nodeResult = this.node.getChildByName("nodeResult")
        let Animgametype1 = new AnimationMgr(nodeResult.getChildByName("animLefttype"), "gametype", 1)
        let Animgametype2 = new AnimationMgr(nodeResult.getChildByName("animRighttype"), "gametype", 1)
        if (!cc.isValid(this.Animgamewin))this.Animgamewin = new AnimationMgr(nodeResult.getChildByName("sprLeftWin"), "gamewin")
        if (!cc.isValid(this.Animgamelose))this.Animgamelose = new AnimationMgr(nodeResult.getChildByName("sprRightWin"), "gamelose")
        Animgametype1.play()
        Animgametype2.play()
        this.Animgamewin.play()
        this.Animgamelose.play()
    }

    //给牌赋值
    brandValueFun(xian) {
        let nodexian = this.sprLeft.node.getChildByName("nodeBrand");
        let nodezhuang = this.sprRight.node.getChildByName("nodeBrand")
        let brand = GameManager.instance.getStartAward()
        for (let j = 0; j < brand[xian].numbers.length; j++) {
            nodexian.getChildByName("brandItem" + j).active = true;
            nodezhuang.getChildByName("brandItem" + j).active = true;
            let branditem = "BrandItem";
            let gameName = GameColMgr.instance.getGameTag()
            if (gameName == "erbagang") {
                branditem = "MahjongItem";
            }
            nodexian.getChildByName("brandItem" + j).getComponent(branditem).brandItemFun(brand[xian].numbers[j], false);
            nodezhuang.getChildByName("brandItem" + j).getComponent(branditem).brandItemFun(brand[0].numbers[j], false);
        }
    }


    upNiuniuTheCardFun(index, xianCardType, zhuangCardType) {

        this._niuniuTheCardFun1(this.sprLeft, xianCardType, index);
        this._niuniuTheCardFun1(this.sprRight, zhuangCardType, 0);

    }

    _niuniuTheCardFun1(nodePlayerCrad, cardType, index: number = 0) {
        if (nodePlayerCrad == null) return;
        let nodeArr = nodePlayerCrad.node.getChildByName("nodeBrand").children;
        let k = 0;
        let brand = GameManager.instance.getStartAward();
        let Width = nodeArr[0].width / 3;
        for (let i = 0; i < nodeArr.length; i++) {
            nodeArr[i].getComponent("BrandItem").brandItemFun(brand[index].numbers[i], false)
        }
        if (cardType > 0 && cardType < 11) {
            for (let i = 0; i < 3; i++) {
                if (i != 0) {
                    nodeArr[i].setPosition(nodeArr[k].getPosition().x + Width + 5, nodeArr[i].getPosition().y);
                    k++;
                }
            }
            nodeArr[3].setPosition(nodeArr[4].getPosition().x - Width - 5, nodeArr[0].getPosition().y);
        }
    }


    initNiuniuFun(xianCardType, zhuangCardType) {
        this._initPositionFun(this.sprLeft, xianCardType)
        this._initPositionFun(this.sprRight, zhuangCardType)
    }


    _initPositionFun(nodePlayerCrad, cardType) {
        let nodeArr = nodePlayerCrad.node.getChildByName("nodeBrand").children;
        let x = -54;
        if (cardType > 0 && cardType < 11)
            for (let i = 0; i < 3; i++) {
                if (i != 0) {
                    nodeArr[i].setPosition(x, nodeArr[i].getPosition().y)
                    x += 54
                }
            }
        nodeArr[3].setPosition(54, nodeArr[0].getPosition().y);

    }
}


