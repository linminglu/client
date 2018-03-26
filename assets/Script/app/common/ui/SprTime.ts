const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { AudioManager } from "../../common/manager/AudioManager"
import { FuncUtil } from "../util/FuncUtil"
import { TimeUtil } from "../util/TimeUtil"
import { GameManager } from "../manager/GameManager"

@ccclass
export class SprTime extends cc.Component {
    @property(cc.Sprite)
    sprTime: cc.Sprite = null;
    @property(cc.Sprite)
    sprBai: cc.Sprite = null
    @property(cc.Sprite)
    sprShi: cc.Sprite = null;
    @property(cc.Sprite)
    sprGe: cc.Sprite = null;
    @property(cc.Sprite)
    sprS: cc.Sprite = null;
    @property(cc.Sprite)
    txtExplain: cc.Sprite = null;

    surplusTime: any = 1; //剩余时间
    surplusTime1: any = 1; //剩余时间
    timeFun: Function = null;
    timeFun1: Function = null;

    sprNum: any = null
    sprNum1: any = null

    sprAtlas:any = null
    timeTypes:any  = null
    callBackFunS:Function = null

    endTime = 0

    onLoad() {

        this.upSprShowFun(false)
    }

    onDestroy() {
        //this.node.stopAllActions()
    }

    updelayTimeNodeFun(endTime: number = 5, timeType: string = null, explainName: string = null, callBackFun: Function = null) {
        this.endTime = endTime
        this.updateView1(timeType, explainName, callBackFun)
    }

    getTime() {
        return TimeUtil.getRemainTime(this.endTime)
    }

    upSprShowFun(state: boolean = true) {
        this.sprTime.node.active = state
        this.sprBai.node.active = state
        this.sprShi.node.active = state
        this.sprGe.node.active = state
        this.sprS.node.active = state
        this.txtExplain.node.active = state
    }

    updateView1(timeType: string = null, explainName: string = null, callBackFun: Function = null) {
        this.surplusTime1 = this.getTime()
        if (this.surplusTime1 <= 0) {
            this.upSprShowFun(false)
            return
        }

        if (timeType == null) {
            timeType = "txt_time";
        }
        this.timeTypes = timeType
        if (!cc.isValid(this.node)) return;
        this.sprNum1 = FuncUtil.getNum2Obj(this.surplusTime1)

        ResCfg.loadPlist(this, timeType, function (self, atlas, plistName) {
            if (explainName != null) {
                if (!cc.isValid(self.node)) return;
                self.txtExplain.spriteFrame = atlas.getSpriteFrame(`${timeType}-${explainName}`);
            }

            if (timeType == "txt_gold_total") {
                if (!cc.isValid(self.node)) return;
                if (cc.isValid(self.sprTime)) {
                    self.sprTime.spriteFrame = atlas.getSpriteFrame(`${timeType}-txt_time_clock`);
                }
                if (cc.isValid(self.sprS)) {
                    self.sprS.spriteFrame = atlas.getSpriteFrame(`${timeType}-txt_time_s`);
                }
            }
            if (cc.isValid(self.sprBai)) {
                self.sprBai.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.bai}`);
            }
            if (cc.isValid(self.sprShi)) {
                self.sprShi.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.shi}`);
            }
            if (cc.isValid(self.sprGe)) {
                self.sprGe.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.ge}`);
            }
            self.sprAtlas = atlas //
            self.callBackFunS = callBackFun
            self.upSprShowFun()

            // if (self.surplusTime1 > 0) {

            //     self.timeFun1 = function () {
            //         self.surplusTime1 = self.getTime();
            //         self.sprNum1 = FuncUtil.getNum2Obj(self.surplusTime1);
            //         if (callBackFun) {
            //             callBackFun(self.surplusTime1);
            //             if (self.surplusTime1 == 0) {
            //                 self.upSprShowFun(false);
            //             } else {
            //                 if (self.sprShi == null) return;
            //                 if (self.sprNum1.bai == 0) {
            //                     self.sprBai.node.active = false;
            //                     if (self.sprNum1.shi == 0) {
            //                         self.sprShi.node.active = false;
            //                     }
            //                 }
            //                 if (self.sprNum1.shi == 0 && self.sprNum1.ge == 0 && self.sprNum1.bai == 0) {
            //                     self.upSprShowFun(false);
            //                 } else {
            //                     if (cc.isValid(self.sprBai)) {
            //                         self.sprBai.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.bai}`);
            //                     }
            //                     if (cc.isValid(self.sprShi)) {
            //                         self.sprShi.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.shi}`);
            //                     }
            //                     if (cc.isValid(self.sprGe)) {
            //                         self.sprGe.spriteFrame = atlas.getSpriteFrame(`${timeType}-` + `${self.sprNum1.ge}`);
            //                     }
            //                 }
            //             }
            //         }


            //         FuncUtil.delayFunc(function () {
            //             self.timeFun1()
            //         }, 1, self.node)
            //     }

            //     self.timeFun1()
            // }
        });
    }
    update(dt){
    //console.log("11111111111118888")
        if (this.surplusTime1 > 0){
            this.timeFun2()
        }

    }

    timeFun2(){
        this.surplusTime1 = this.getTime();
        this.sprNum1 = FuncUtil.getNum2Obj(this.surplusTime1);
        if (this.callBackFunS) {
            this.callBackFunS(this.surplusTime1);
            if (this.surplusTime1 == 0) {
                this.upSprShowFun(false);
            } else {
                if (this.sprShi == null) return;
                if (this.sprNum1.bai == 0) {
                    this.sprBai.node.active = false;
                    if (this.sprNum1.shi == 0) {
                        this.sprShi.node.active = false;
                    }
                }
                if (this.sprNum1.shi == 0 && this.sprNum1.ge == 0 && this.sprNum1.bai == 0) {
                    this.upSprShowFun(false);
                } else {
                    if (cc.isValid(this.sprBai)) {
                        this.sprBai.spriteFrame = this.sprAtlas.getSpriteFrame(`${this.timeTypes}-` + `${this.sprNum1.bai}`);
                    }
                    if (cc.isValid(this.sprShi)) {
                        this.sprShi.spriteFrame = this.sprAtlas.getSpriteFrame(`${this.timeTypes}-` + `${this.sprNum1.shi}`);
                    }
                    if (cc.isValid(this.sprGe)) {
                        this.sprGe.spriteFrame = this.sprAtlas.getSpriteFrame(`${this.timeTypes}-` + `${this.sprNum1.ge}`);
                    }
                }
            }

    }
}
}
