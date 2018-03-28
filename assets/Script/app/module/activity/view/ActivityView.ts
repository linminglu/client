import BaseView from "../../../common/baseui/BaseView";
import {EmitterManager as Emitter} from "../../../common/manager/EmitterManager";
import {EmitterCfg} from "../../../../app/config/EmitterConfig"
import {ActivityModel} from "../model/ActivityModel";
import {ActivityController} from "../controller/ActivityController";
import {ActivityModule} from "../ActivityModule";
import {ResConfig as ResCfg} from "../../../common/util/ResConfig";
import {MainController} from "../../main/controller/MainController"

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityView extends BaseView {
   
    @property(cc.Node)
    content:cc.Node=null;
    constructor() {
        super();
    }
    
    onLoad() {
            //this.node.active = false;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            event.stopPropagation();
        })
       
        //MainController.instance.C_Activity_GetAvailableActivityList();
    }
    onDestroy() {
        super.destructor();
      
    }
    onEnable(){
   
    }
    onDisable(){
    
    }
    
    updateLabelFunc(eventName:string, args1:string, args2:number) {

    }

    changeDatFunc() {
        this.node.active = true
    }

    btnCloseCallBack() {


    }
    btnShutCallBack() {
        MainController.instance.C_Activity_GetAvailableActivityList()
        ActivityModule.instance.hide()

    }
    btnFrListCallBack()
    {

       
    }

    btnAddFrCallBack()
    {

    }

}