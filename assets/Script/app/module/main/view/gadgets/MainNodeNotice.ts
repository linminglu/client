import {MainModel} from "../../model/MainModel"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainNodeNotice extends cc.Component {
    @property(cc.Node)
    nodeBg: cc.Node = null;

    @property(cc.Mask)
    mask: cc.Mask = null;

    @property(cc.RichText)
    rlblNotice: cc.RichText = null;

    async onLoad() {
        this.nodeBg.active = false

        MainModel.instance.registerModelChanged("MAIN_SHOW_NOTICE", this.showNoticeFunc, this);
    }

    onDestroy() {
        MainModel.instance.unregisterModelChanged("MAIN_SHOW_NOTICE", this.showNoticeFunc, this);
    }

    showNoticeFunc() {
        // ////cc.log("active = ", this.nodeBg.active)
        if (this.nodeBg.active) {
            return
        } else {
            this.nodeBg.active = true
            // this.scheduleOnce(this.changeNoticeFunc, 0.1)
            this.changeNoticeFunc()
        }
    }

    changeNoticeFunc() {
        let curNotice = MainModel.instance.getNoticeData()
        // ////cc.log("curNotice: ", curNotice)
        if (! curNotice) {
            this.nodeBg.active = false
            return
        }

        this.updateView(curNotice)
    }

    updateView(data) {
        let showStr = data.content
        this.rlblNotice.string = showStr;

        let width = this.mask.node.width;
        let self = this;

        let time = 1.4
        let actTime = time + self.rlblNotice.node.width / width * time
        let noticAct = cc.repeatForever(cc.sequence(
            cc.moveTo(actTime, cc.p(-self.rlblNotice.node.width, self.rlblNotice.node.y)),
            cc.delayTime(2),
            cc.callFunc(function() {
                self.rlblNotice.node.x = width;

                let nextNotice = MainModel.instance.getNoticeData()
                self.rlblNotice.node.stopAction(noticAct)
                if (! nextNotice) {
                    self.nodeBg.active = false
                } else {
                    self.updateView(nextNotice)
                }
            })
        ))
        
        self.rlblNotice.node.runAction(noticAct)
    }
}