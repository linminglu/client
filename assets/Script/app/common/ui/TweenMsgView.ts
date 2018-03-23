import { FuncUtil } from "../../common/util/FuncUtil"
import { ResConfig } from "../../common/util/ResConfig"

let beginPosX = 640
let beginPosY = 465
let endPosX = beginPosX
let endPosY = 550

export class TweenMsgView {

//     private static nodeMsg :cc.Node = null;

//     public static getNode(){
//         if(this.nodeMsg==null){
//             cc.log('cc.node == null,执行new cc.node()');
//             this.nodeMsg =new cc.Node()
//             this.nodeMsg.opacity = 0
//             this.nodeMsg.scale = 0.9
//             this.nodeMsg.setContentSize(1000)
//             this.nodeMsg.position = cc.p(beginPosX, beginPosY)
//             cc.director.getScene().addChild(this.nodeMsg, 9999)
//             return this.nodeMsg
//         }else{
//             return this.nodeMsg
//         }
//    }

    public static showMsg(codeId: number = 0, deleyTime: number = 0.3) {
        FuncUtil.getJsonConfig("tween_msg", codeId, function (data) {
            let str = data.msgContent
            let nodeMsg = new cc.Node()
            nodeMsg.opacity = 0
            nodeMsg.scale = 0.9
            nodeMsg.setContentSize(1000)
            nodeMsg.position = cc.p(beginPosX, beginPosY)
            cc.director.getScene().addChild(nodeMsg, 9999)

            // let nodeSpr = new cc.Node()
            // nodeMsg.addChild(nodeSpr, -1)
            // let sprBg = nodeSpr.addComponent(cc.Sprite)
            // ResConfig.loadPlist(this, "common", function (self, sprit) {
            //     sprBg.spriteFrame = sprit.getSpriteFrame("common-spr_tween_msg")
            //     sprBg.setInsetLeft(181)
            //     sprBg.setInsetRight(181)
            //     sprBg.type = cc.Sprite.SpriteType.SIMPLE
            //     sprBg.sizeMode = cc.Sprite.SizeMode.TRIMMED
            // })
            
            let rlblMsg =nodeMsg.addComponent(cc.RichText)
            rlblMsg.string = str
            rlblMsg.fontSize = 28

            let sequence = cc.sequence(
                cc.fadeIn(0.1),
                cc.spawn(
                    cc.moveTo(deleyTime, cc.p(endPosX, endPosY)),
                    cc.scaleTo(0.2, 1, 1),
                ),
                cc.callFunc(function () {
                    nodeMsg.runAction(cc.sequence(cc.delayTime(0.3), cc.fadeOut(0.1), cc.callFunc(function () {
                        nodeMsg.destroy()
                    })))
                })
            )
            nodeMsg.runAction(sequence)
        })
    }
}