const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
@ccclass
export default class LonghudouHistory extends cc.Component {

    @property(cc.Sprite)
    sprLong: cc.Sprite = null;
    @property(cc.Sprite)
    sprPing: cc.Sprite = null;
    @property(cc.Sprite)
    sprHu: cc.Sprite = null;
    @property(cc.Sprite)
    Block: cc.Sprite = null;
    @property(cc.Sprite)
    sprMaskBox:cc.Sprite = null;
    onLoad() {


    }
    historyItemFun(data) {
       // ////cc.log("龙虎斗历史记录===",data)
        let closeData = this.upDataFun(data);
      
        this.upDataSprFun(this.sprLong, closeData.long);
        this.upDataSprFun(this.sprHu, closeData.hu);
        switch (closeData.ying) {
            case 0: this.Block.node.setPosition(cc.p(this.Block.node.getPosition().x, 51));
                break;
            case 2: this.Block.node.setPosition(cc.p(this.Block.node.getPosition().x, -0.8));
                    this.upDataSprFun1();
                break;
            case 1: this.Block.node.setPosition(cc.p(this.Block.node.getPosition().x, -54));
                break;
            default: ////cc.log("什么东西" + closeData);
        }
        this.Block.node.runAction(cc.repeatForever(cc.rotateBy(3,360)))
        this.sprMaskBox.node.active = false;
    }
    upDataSprFun(spr, data) {
        if(data&&spr){
            ResCfg.loadPlist(this, "longhudou", function (self, atlas, plistName) {
                spr.spriteFrame = atlas.getSpriteFrame(`longhudou-txt_${data}`);
            }, true);
        }
      
    }

    upDataSprFun1(){
        if(this.node){
            ResCfg.loadPlist(this, "longhudou", function (self, atlas, plistName) {
                self.sprPing.spriteFrame = atlas.getSpriteFrame(`longhudou-txt_ping`);
            }, true);
        }
    }
    
    upDataFun(data){

        let dataArr = data;
        let dataNum1 = dataArr[0].cardType;
        let dataNum2 = dataArr[1].cardType;
        let strArr1 = dataNum1.toString();
        let strArr2 = dataNum2.toString();
        let dataObj = {
            long:null,
            hu:null,
            ying:null
        }
            strArr1[2] == 2?dataObj.long ="shuang":dataObj.long ="dan";
            strArr2[2] == 2?dataObj.hu ="shuang":dataObj.hu ="dan"; 
            if(strArr1[1] == 1){
                dataObj.ying = 0;
            }else if(strArr1[1] == 3){
                dataObj.ying = 1;
            }else{
                dataObj.ying = 2;
            }
            return dataObj
        }


    }

  

        

    


