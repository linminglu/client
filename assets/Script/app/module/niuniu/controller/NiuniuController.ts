import { BaseController } from "../../../common/baseui/BaseController";
export class NiuniuController extends BaseController {
    

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: NiuniuController = new NiuniuController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        NiuniuController.instance = null;
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