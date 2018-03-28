import { FuncUtil } from "../../common/util/FuncUtil"
import { ResConfig } from "../../common/util/ResConfig"
import { NodePoolMgr, NodePoolKey } from "../manager/NodePoolMgr";
import { MsgTxtItem } from "./MsgTxtItem";

export class TweenMsgView {
    public static msgArr = new Array();
    private static _instance : TweenMsgView = null;
    public static getInstance() : TweenMsgView {
        if( this._instance == null ){
            this._instance = new TweenMsgView();
        }
        return this._instance;
    }

    public showMsg(codeId: number = 0, deleyTime: number = 0.3) {
        let len = TweenMsgView.msgArr.length;
        if( len >= 3 )return;//最多同时出现三个

        let beginPosX = cc.winSize.width/2;
        let beginPosY = cc.winSize.height/2 + 20;
        let endPosX = beginPosX;
        let endPosY = beginPosY + 100;

        FuncUtil.getJsonConfig("tween_msg", codeId, function (data) {
            let str = data.msgContent;
            let nodeMsg:MsgTxtItem =  NodePoolMgr.instance.getNood(NodePoolKey.TWEEN_MSG_TXT);
            if( cc.isValid(nodeMsg) ) {
                nodeMsg.setTxt(str);
            }else {
                nodeMsg = new MsgTxtItem();
                nodeMsg.opacity = 0;
                nodeMsg.scale = 0.9;
                nodeMsg.setContentSize(1000);
                nodeMsg.setTxt(str);
            }
            nodeMsg.position = cc.p(beginPosX, beginPosY);
            // nodeMsg.getTxtItem
            cc.director.getScene().addChild(nodeMsg, 9999);
            TweenMsgView.msgArr.push(nodeMsg);
            let sequence = cc.sequence(
                cc.fadeIn(0.1),
                cc.spawn(
                    cc.moveTo(deleyTime, cc.p(endPosX, endPosY)),
                    cc.scaleTo(0.2, 1, 1),
                ),
                cc.callFunc(function () {
                    nodeMsg.runAction(cc.sequence(cc.delayTime(0.3), cc.fadeOut(0.1), cc.callFunc(function () {
                        // nodeMsg.destroy()
                        NodePoolMgr.instance.putNood(nodeMsg,NodePoolKey.TWEEN_MSG_TXT);
                        TweenMsgView.msgArr.shift();
                    })))
                })
            )
            nodeMsg.runAction(sequence);
        })
    }
}