import { BaseController } from "../../../common/baseui/BaseController";
export class HelpController extends BaseController {
    

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: HelpController = new HelpController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        HelpController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
    }

    addEveRegister() {
        
    }

    delEveRegister() {
    }
}