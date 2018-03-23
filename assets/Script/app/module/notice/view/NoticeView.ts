import BaseView from "../../../common/baseui/BaseView";
import {EmitterManager as Emitter} from "../../../common/manager/EmitterManager";
import {EmitterCfg} from "../../../../app/config/EmitterConfig"
import {NoticeModel as Model} from "../model/NoticeModel";
import {NoticeController as Ctr} from "../controller/NoticeController";
import {NoticeModule} from "../NoticeModule";
import {ResConfig as ResCfg} from "../../../common/util/ResConfig";
import ActivityView from "../../activity/view/ActivityView"


const {ccclass, property} = cc._decorator;

@ccclass
export default class NoticeView extends ActivityView {
   
   
    
    // constructor() {
    //     super();
    // }
    
    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_START, function(event){
        //     event.stopPropagation();
        // })
        super.onLoad()
        
    }
    onDestroy() {
        super.onDestroy();
    }
    
  


    changeDatFunc() {

    }

    btnCloseCallBack() {

    }
    btnShutCallBack() {
        
        NoticeModule.instance.hide();
    }
    
}