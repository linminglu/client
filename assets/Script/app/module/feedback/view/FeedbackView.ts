import BaseView from "../../../common/baseui/BaseView";
import {EmitterManager as Emitter} from "../../../common/manager/EmitterManager";
import {EmitterCfg} from "../../../../app/config/EmitterConfig"
import {FeedbackModel as Model} from "../model/FeedbackModel";
import {FeedbackController as Ctr} from "../controller/FeedbackController";
import {FeedbackModule} from "../FeedbackModule";
import {ResConfig as ResCfg} from "../../../common/util/ResConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackView extends BaseView {
   
 

    constructor() {
        super();
    }
    
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            event.stopPropagation();
        })
        
    }
    onDestroy() {
        super.destructor();
    }
    
    updateLabelFunc(eventName:string, args1:string, args2:number) {

    }

    changeDatFunc() {

    }

    btnCloseCallBack() {


    }
    btnShutCallBack() {
        FeedbackModule.instance.hide();
    }
    btnFrListCallBack()
    {

       
    }

    btnAddFrCallBack()
    {
        

    }

}