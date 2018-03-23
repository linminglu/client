import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { GameManager } from "../../../../common/manager/GameManager"
import { AudioManager } from "../../../../common/manager/AudioManager";
import { AnimationMgr } from "../../../../common/manager/AnimationMgr";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
const { ccclass, property } = cc._decorator;
@ccclass
export default class GameSettlement extends cc.Component {

    @property(cc.Node)
    nodeGold: cc.Node = null;

    arradena: any = [];
    comma: any = [];
    onLoad() {

    }

    onDestroy() {
        
    }

    ReceiveSettlementFun() {
        let balance = GameManager.instance.getWinOrLose()
        if (balance == null) return;
        if (balance.result > 0) {
            this.node.active = true;
            this.animlihuaFun()
            this.implementSettlementFun(balance.result)
            let self = this;
            FuncUtil.delayFunc(function () {
                self.node.active = false;
            }, 3, self.node)
        }

    }

    animlihuaFun() {
        let self = this;
        for (let i = 0; i < 5; i++) {
            FuncUtil.delayFunc(function () {
                let nodeanim = self.node.getChildByName("Fireworks" + i)
                let  nodeScale= (parseInt(Math.random() * 10 + "")+5)/10
                nodeanim.setScale(nodeScale)
                let anim = new AnimationMgr(nodeanim, "gamelihua", 1)
                anim.play()
            }, 0.1 * i, self.node)

        }
    }


    positionobj() {
        let animX = parseInt(Math.random() * 450 + "")
        let animY = parseInt(Math.random() * 200 + "")
        if (animX % 2 == 1) {
            animX = -animX
        }
        if (animY % 2 == 1) {
            animY = -animY
        }
        let obj = {
            x: animX,
            y: animY
        }
        //////cc.log(obj)
        return obj
    }


    implementSettlementFun(value) {
        // for (let i = 0; i < this.arradena.length; i++) {
        //     if (cc.isValid(this.arradena[i])) this.arradena[i].destroy();
        // }

        // let strvalue = FuncUtil.formatNum(value)
        // let arrvalue = strvalue.split("");
        // let lenvalue = arrvalue.length;



        ResCfg.loadPrefab(this, "adenaItem", function (self, prefab) {

            let anim = new AnimationMgr(self.node.getChildByName("ainmyingfen"), "yingfen", 1)
            anim.play()
            let strvalue = FuncUtil.formatNum(value);
            let arrvalue = strvalue.split("");
            let Removelen = arrvalue.length;
            let Settlement = self.arradena.length

            if (Removelen > Settlement) {
                for (let i = Settlement; i < Removelen; i++) {
                    self.arradena[i] = cc.instantiate(prefab);
                    self.nodeGold.addChild(self.arradena[i]);
                }
            } else if (Removelen < Settlement) {
                for (let i = Removelen; i < Settlement; i++) {
                    self.arradena[i].active = false
                }
            }


            for (let i = 0; i < Removelen; i++) {
                // self.arradena[i] = cc.instantiate(prefab);
                // self.nodeGold.addChild(self.arradena[i])

                let Settlementtrue = self.arradena[i].active
                if (Settlementtrue == false) {
                    self.arradena[i].active = true
                }
                if (arrvalue[i] == ".") {
                    self.fillcommeFun("spot", self.arradena[i])
                } else if (arrvalue[i] == ",") {
                    self.fillcommeFun("comme", self.arradena[i])
                } else {
                    let numvalue = parseInt(arrvalue[i])
                    self.DigitalRollingFun(numvalue, self.arradena[i])
                }
            }
        })
    }

    fillcommeFun(strvalue, comnode) {
        ResCfg.loadPlist(this, "adena", function (self, atlas) {
            let spradena = atlas.getSpriteFrame("adena-txt_adena_" + strvalue);
            comnode.getComponent(cc.Sprite).spriteFrame = spradena
        })
    }

    DigitalRollingFun(numvalue, nodeadend) {

        let rotate = numvalue
        ResCfg.loadPlist(this, "adena", function (self, atlas) {
            let rand = parseInt(Math.random() * 3 + "") + 6
            let time = rand * 0.01;
            //let time = 0.07
            for (let i = 0; i < 20; i++) {
                FuncUtil.delayFunc(function () {
                    // self.scheduleOnce(function () {
                    rotate++;
                    if (rotate == 10) rotate = 0;
                    let spradena = atlas.getSpriteFrame("adena-txt_adena_" + rotate);
                    nodeadend.getComponent(cc.Sprite).spriteFrame = spradena
                }, time * i, self.node)
            }

        })
    }
}
