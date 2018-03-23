import BaseAlertView from "../baseui/BaseAlertView"

const { ccclass, property } = cc._decorator;


@ccclass
export class AlertView extends BaseAlertView {
    tipStr: string = ""
    cancelObj: Object = null;
    confirmObj: Object = null;
    confirmOneObj: Object = null;

    @property(cc.Button)
    btnConfirmOne: cc.Button = null;

    //<color=#00ff00>Rich</c><color=#0fffff>Text</color>
    onLoad() {
        this.btnCancel.node.active = false;
        this.btnConfirm.node.active = false;
        this.btnConfirmOne.node.active = false;

        this.node.getChildByName("nodeBg").on(cc.Node.EventType.TOUCH_START, function(event){
            event.stopPropagation();
        })
    }

    constructor() {
        super();
    }
    
    destructor() {
        this.destroy();
    }
    
    btnCancelCallBack() {
        //////cc.log("--AlertView btnCancelCallBack")
        if (this.cancelObj && this.cancelObj.callBack) {
            this.cancelObj.callBack()
        }

        this.node.destroy();
    }

    btnConfirmCallBack() {
        //////cc.log("--AlertView btnConfirmCallBack")
        if (this.confirmObj && this.confirmObj.callBack) {
            this.confirmObj.callBack()
        }

        this.node.destroy();
    }

    btnConfirmOneCallBack() {
        if (this.confirmOneObj && this.confirmOneObj.callBack) {
            this.confirmOneObj.callBack()
        }

        this.node.destroy();
    }
    
    updateView(obj: Object) {
        this.tipStr = obj.tipStr;
        this.confirmOneObj = obj.confirmOneObj;
        this.confirmObj = obj.confirmObj;
        this.cancelObj = obj.cancelObj;

        this.rlblTipStr.string = obj.tipStr;

        if (obj.cancelObj) {
            this.btnCancel.node.active = true;
        }
        
        if (obj.confirmObj) {
            this.btnConfirm.node.active = true;
        }
        
        if (obj.confirmOneObj) {
            this.btnConfirmOne.node.active = true;
        }
    }
}