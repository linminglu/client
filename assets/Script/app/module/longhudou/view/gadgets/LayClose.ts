import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { GameManager }    from "../../../../common/manager/GameManager"
import { LonghudouModel} from "../../../longhudou/model/LonghudouModel";
import { AudioManager } from "../../../../common/manager/AudioManager";
import { AnimationMgr } from "../../../../common/manager/AnimationMgr";
import {GameModel} from "../../../game/model/GameModel"
const { ccclass, property } = cc._decorator;
@ccclass
export class LayClose extends cc.Component {

    @property(cc.Sprite)
    txtHu: cc.Sprite = null;
    @property(cc.RichText)
    closeRichText: cc.RichText = null;
    @property(cc.Node)
    brandItem: cc.Node = null;
    lblNum: string = null;
    lblDS: string = null;
    youWinLos: string = null;
    closeData:any = null;
  //  betFrontGold:any = null


   
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
      
     }
    
    upDataCloseFun() {
        if (!cc.isValid(this.node)) return;
       
        let data = this.upDataColseFun();
        if(data == null)return
        ResCfg.loadPlist(this, "longhudou", function (self, atlas) {
            self.txtHu.spriteFrame = atlas.getSpriteFrame(`longhudou-txt_close_${data.rulName}`);
            self.closeRichText.string = `${data.strName}牌${data.num}点` + "\n\n" + `${data.strName}${data.win}\t${data.DSH}数` + "\n\n" + data.result;
            if( data.cardData == -1){
                self.node.getChildByName("sprBg").active = true;
                self.brandItem.active =false;

            }else{
                self.brandItem.getComponent("BrandItem").brandItemFun(data.cardData);
                self.brandItem.getChildByName("sprBack").active = false;
            }

        }, true)
       
           
          
    }
    btnShutCloseCallBack() {

        this.node.active = false;
        this.node.getChildByName("sprBg").active = false;
        this.brandItem.active =true;
    }
    
    upDataColseFun(){
        let anim = new AnimationMgr(this.node.getChildByName("animshuy"), "lhdying", 1)
        anim.play()
        let data = {rulName:null,strName:null,result:"",num:null,DSH:null,cardData:null,win:"WIN"};
        let dataMy = GameManager.instance.getWinOrLose();
        this.closeData = GameManager.instance.getStartAward();
        if(this.closeData[0].cardType == undefined||this.closeData[0].cardType == null) return null;
        let dataNum1 = this.closeData[0].cardType;
        let dataNum2 = this.closeData[1].cardType;
        let strArr1 = dataNum1.toString();
        let strArr2 = dataNum2.toString();
        if( strArr1[1] == 2){
            ////cc.log("结算平");
            data.rulName = "ping";
            data.strName = "和";
            data.cardData = -1
            data.win = ""
            strArr1[2] == 2?data.DSH ="双":data.DSH ="单"; 
            data.num =this.upDataNumberFun(this.closeData[0].numbers[0]);
            let anim = new AnimationMgr(this.node.getChildByName("animshuy"), "lhdping", 1)
            anim.play()
            AudioManager.instance.playEffect("eff_lhdping")
         }else if(strArr1[1] == 1){
            ////cc.log("结算龙");
            data.rulName = "long";
            data.strName = "龙";
            strArr1[2] == 2?data.DSH ="双":data.DSH ="单"; 
            data.cardData = this.closeData[0].numbers[0];
            data.num = this.upDataNumberFun(this.closeData[0].numbers[0]);
            let anim = new AnimationMgr(this.node.getChildByName("animshuy"), "lhdlong", 1)
            anim.play()
            AudioManager.instance.playEffect("eff_lhdlongwin")
         }else{
            ////cc.log("结算虎");
            data.rulName = "hu";
            data.strName = "虎";
            strArr2[2] == 2?data.DSH ="双":data.DSH ="单"; 
            data.cardData =this.closeData[1].numbers[0];
            data.num = this.upDataNumberFun(this.closeData[1].numbers[0]);
            let anim = new AnimationMgr(this.node.getChildByName("animshuy"), "lhdhu", 1)
            anim.play()
            AudioManager.instance.playEffect("eff_lhdhuwin")
         }
            ////cc.log("结算的消息======",dataMy)
            if(dataMy == null||dataMy.gameType == 0){
                data.result = ""  //没投注
            }else if(dataMy.result > 0){
                data.result =  "你" + "<img src='" + `longhudou-txt_losing`+ "' />" + "了!";
            }else if(dataMy.result < 0){
                data.result = "你" + "<img src='" + `longhudou-txt_winning`+ "' />" + "了!";
            }else{
                data.result = "平分";
            }
            //cc.log("sssssssssssssss===",data);
        return data
    }

    upDataNumberFun(data){
        let num = data;
        let dataNum = null;
        num = (num % 10);
        if(num == 0){
            dataNum = 10;
        }else{
            dataNum = num;
        }
        return dataNum
    }

}


