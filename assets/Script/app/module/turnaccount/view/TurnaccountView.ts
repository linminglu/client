import { TurnaccountModule } from "../TurnaccountModule"
import { TurnaccountModel } from "../model/TurnaccountModel"
import { FuncUtil } from "../../../common/util/FuncUtil"
import BaseView from "../../../common/baseui/BaseView";

const { ccclass, property } = cc._decorator

@ccclass

export default class TurnaccountView extends BaseView {
    // @property(cc.Node)
    // _timeLabel: cc.Node = null;

    btnArr = [];

    scrollArr = []
    optionView: cc.Node = null
    _time=11
    _alertTime=3
    // s:number = 0 
    // sd:number = 0
    target:cc.Node = null
    _endTime:number = 1
    onLoad() {
        // cc.log("ssssssssssssss==",this.tupian)//Texture2D) 
        // //this.spr.spriteFrame.texture =
    
        // let tex = new cc.SpriteFrame(this.tupian,cc.rect(42, 42, this.tupian.width, this.tupian.height));
        // cc.log(tex)
        // this.ssssss.addComponent(cc.Sprite).spriteFrame = tex
        // //this.ssssss.setPosition(0,0)
        // let sss = this.node.getChildByName("s4")
        // // let s=sss.getComponent(cc.Sprite).createGraySprite(res.HelloWorld_png);
        // cc.log("ssssssssss===",sss.getComponent(cc.Sprite));
        // let sss = "投注:   1202    10"
        // cc.log("///////////////////////////==",sss.split(/[^/z]+/ig))
        // cc.log("/*/*/*/*/*//////////====",sss.split(/[^0-9]/ig))
            //sss.replace(/[^0-9]/ig,"");
        //     let da = new Date(sssss)
        //     cc.log(da.getDate())
        //    cc.log(da.getMonth())
        //    cc.log(da)

        // let s = new Date()
        // console.log(Date.now()); //当前时间的时间戳
        // console.log( new Date(Date.now()))
     
        // var reg=new RegExp ("({["+5+"]})","g"); 
        // console.log(reg)
        // let eventHandler = new cc.Component.EventHandler();
        // console.log(eventHandler)
        //    this.target =this.node.getChildByName("New Sprite")
        //     this.addClickEvent(this.target,this.node,"TurnaccountView","onBtnClicked");      
        //     //  let a=this.node.addComponent("SprTime");  
        //     // console.log()
        // this._timeLabel = this.target.getChildByName("New Label").getComponent(cc.Label)
        // this._timeLabel.color = new cc.Color()
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        this.btnArr = this.node.getChildByName("btnLay").children;
        this.optionView = this.node.getChildByName("turnaccountFindLay").getChildByName("optionView")
        this.optionView.active = false;
        this.scrollArr = this.node.getChildByName("scrollViewLay").children;
        this.btnArr[0].getComponent(cc.Button).interactable = false;  
       
        // console.log(typeof(this.add));
        // console.log(typeof(this));
        for(let i = 0 ; i < 18 ; i++){
            FuncUtil.getJsonConfig("gamehall",(i+1),function(data,self){

                TurnaccountModel.instance.gameArr.push(data)
                // console.log(data)
                //     remark7 = data.des //什么厅
             },this)
        }
        
    }
   
    // onBtnClicked(event){
    //     console.log("1111111111111111111111111111")
    //     console.log(event)
        
    // }

    // update(dt) {
    //     //cc.audioEngine.play()
    //    this.target.rotation = this.target.rotation - dt*60;
    //     if(this._time > 0){
    //         this._time -= dt;
    //         // if(this._alertTime > 0 && this._time < this._alertTime){
    //         //     this._alertTime = -1;
    //         // }
    //         let pre = "";
    //         if(this._time < 0){
    //             this._time = 0;
    //         }
            
    //         let t = Math.ceil(this._time);
    //         //console.log(t)
    //         if(t < 10){
    //             pre = "0";
    //         }
    //         this._timeLabel.string = pre + t; 
    //     }
        

    // }
   
        
    // addClickEvent(node,target,component,handler){
    //     console.log(component + ":" + handler);
    //     let eventHandler = new cc.Component.EventHandler();
    //     eventHandler.target = target;
    //     eventHandler.component = component;
    //     eventHandler.handler = handler;
    //     var clickEvents = node.getComponent(cc.Button).clickEvents;
    //     clickEvents.push(eventHandler);
    //     // eventHandler.emit(["paramss"]);
    //     // console.log(eventHandler.customEventData)
    //     // console.log(clickEvents)
    // }
    // start(){
       
    //     // String.prototype.charCodeAt= function(a) {   //该底层
    //     //     let args = a.toString()
    //     //     console.log(args)
    //     //     if (arguments.length>0) { 
    //     //         var result = this; 
    //     //         if (arguments.length == 1 && typeof (args) == "object") { 
    //     //             for (var key in args) { 
    //     //                 var reg=new RegExp ("({"+key+"})","g"); 
    //     //                 result = result.replace(reg, args[key]); 
    //     //             } 
    //     //         } 
    //     //         else { 
    //     //             for (var i = 0; i < arguments.length; i++) { 
    //     //                 if(arguments[i]==undefined) { 
    //     //                     return ""; 
    //     //                 } 
    //     //                 else { 
    //     //                     var reg=new RegExp ("({["+i+"]})","g"); 
    //     //                     result = result.replace(reg, arguments[i]); 
    //     //                 } 
    //     //             } 
    //     //         } 
    //     //         return result; 
    //     //     } 
    //     //     else { 
    //     //         return this; 
    //     //     } 
    //     // };
    // }
    onDestroy() {
        
    }

    btnLisCallBack(data,CustomEventData) {
        // console.log("CustomEventData=",CustomEventData)
        let Name = data.currentTarget.name
        for (let i = 0; i < 2; i++) {

            if (Name == this.btnArr[i].name) {
                TurnaccountModel.instance.setstateYe(i)
                if (i == 1) {
                    this.optionView.active = true
                } else {
                    this.optionView.active = false
                    this.optionView.getChildByName("optionScroll").active = false
                }
                this.btnArr[i].getComponent(cc.Button).interactable = false;
                this.scrollArr[i].active = true
            } else {
                this.btnArr[i].getComponent(cc.Button).interactable = true;
                this.scrollArr[i].active = false;
            }
        }

    }

    btnShutCallBack() {

        TurnaccountModel.instance.initModelFun()
        TurnaccountModule.instance.hide()

    }
}