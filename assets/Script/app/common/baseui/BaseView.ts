/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:view的基类
/////////////////////////////////////////////////////

const {ccclass, property} = cc._decorator

@ccclass
export default class BaseView extends cc.Component {
    protected model: any = null
    protected cotroller: any = null
    
    @property(cc.Button)
    btnClose: cc.Button = null
    
    constructor() {
        super()
    }

    onLoad() {
        
    }

    onDestroy() {
        
    }
    
    destructor() {
        this.model = null
        this.cotroller = null
        
        this.destroy()
    }

    btnCloseCallBack() {
        
    }

}