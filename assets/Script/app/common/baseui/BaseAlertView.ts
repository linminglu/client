
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseAlertView extends cc.Component {
    @property(cc.Button)
    btnCancel: cc.Button = null;

    @property(cc.Button)
    btnConfirm: cc.Button = null;

    @property(cc.RichText)
    rlblTipStr: cc.RichText = null;
    
    constructor() {
        super();
    }
    
    destructor() {
        this.destroy();
    }

    btnCancelCallBack() {
       
    }

    btnConfirmCallBack() {
       
    }
}