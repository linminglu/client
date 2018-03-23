const {ccclass, property} = cc._decorator;
import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { ExchangeModel } from "../../model/ExchangeModel"
import { ExchangeController } from "../../controller/ExchangeController"
@ccclass
export default class ExchangeIntegral extends cc.Component {

    //积分值
    value:number=0;

    @property(cc.Button)
    btnReduce: cc.Button = null;
    @property(cc.Button)
    btnPlus: cc.Button = null;

    onLoad() {
        // init logic
        this.Exchangeinit();
    }

    Exchangeinit(){
        let playerMsg = ExchangeModel.instance.getintegral()
        let rich=playerMsg;
        if(playerMsg==null){
             rich=0;
        }
        this.value=rich
        this.node.getChildByName("lblPersonal").getComponent(cc.Label).string = "个人积分："+FuncUtil.formatNum(rich);
        if(this.value<5000){
            this.btnReduce.interactable=false
            this.btnPlus.interactable=false
            this.node.getChildByName("btnDetermine").getComponent(cc.Button).interactable=false
            this.node.getChildByName("lblhints").getComponent(cc.Label).string ="兑换积分最少数额5000分，每次变更范围1000分"
            return
        }
        if(rich>5000){
            this.value=5000
        }
        this.lblIntegraldata();
    }

    lblIntegraldata(){
      
        let playerMsg = ExchangeModel.instance.getintegral()
        let rich=playerMsg;
        this.btnReduce.interactable=true
        this.btnPlus.interactable=true
        if(this.value==5000){
            this.btnReduce.interactable=false
        }
        if(this.value==rich/1000){
            this.btnPlus.interactable=false
        }
        this.node.getChildByName("lblValue").getComponent(cc.Label).string=this.value.toString();
        let gold=this.value/1000
        this.node.getChildByName("lblGold").getComponent(cc.Label).string="= "+gold+".00 元".toString();
        let surplus=playerMsg-(this.value)
        this.node.getChildByName("lblSurplus").getComponent(cc.Label).string="剩余积分："+FuncUtil.formatNum(surplus).toString();
    }
    //增加
    btnIncreaseFun(){
        this.value+=1000;
        this.lblIntegraldata();
    }

    //减少
    btnReduceFun(){
        if(this.value<=0)return;
        this.value-=1000;
        this.lblIntegraldata();
    }

    btnDetermineFun(){
        let exchange=this.node.getChildByName("lblValue").getComponent(cc.Label).string
        let exchange1=parseInt(exchange)
        let activitySeq=ExchangeModel.instance.getexchangerid()
        ExchangeController.instance.C_Exchange(activitySeq,exchange1)
    }
}
