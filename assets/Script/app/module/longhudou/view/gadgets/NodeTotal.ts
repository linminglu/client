const { ccclass, property } = cc._decorator;

@ccclass
export default class NodeTotal extends cc.Component {


    @property(cc.Node)
    layGoldNum: cc.Node = null;
    leaveGold: number = 0;
    onLoad() {

        //this.upDataTotalBetAndRand(0,0,true)
    }
    onDestroy() {

        this.unschedule(this.upDataLayGoldNumFun);
    }
    upDataTotalFun(dt) {
        let num = dt;
        if (!cc.isValid(this.layGoldNum)||!cc.isValid(this.node))return;
        this.schedule(this.upDataLayGoldNumFun, 3, dt)
    }
    unTotalTimeFun()
    {
        this.unschedule(this.upDataLayGoldNumFun);
    }
    upDataLayGoldNumFun()
    {  
        if (!cc.isValid(this.layGoldNum)||!cc.isValid(this.node))return;
        this.leaveGold += this.upDataRandNumFun();
        this.layGoldNum.getComponent("TotalUI").updateTatalFun(this.leaveGold);
    }
    upDataTotalBetAndRand(gold: number = 0,gold1:number = 0, blr: boolean = false) {
        let totalGold = gold + this.leaveGold-gold1;
        if (!cc.isValid(this.layGoldNum)||!cc.isValid(this.node))return;
        if (!blr) {
            this.layGoldNum.getComponent("TotalUI").updateTatalFun(totalGold);
        } else {
            this.leaveGold = 0;
            let totalGold  = 0;
            this.layGoldNum.getComponent("TotalUI").updateTatalFun(gold);
        }
    }
    upDataRandNumFun() {
        let num = Math.floor(Math.random() * 10000 + 1000);
        if (num % 5 == 0) {
            return num;
        } else {
            return this.upDataRandNumFun();
        }
    }
}
