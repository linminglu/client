import {BaseController} from "../../../common/baseui/BaseController";
import {RoleModel as Model} from "../model/RoleModel";
import {RoleModule} from "../RoleModule";
import {MainModule} from "../../main/MainModule";
import {GameManager} from "../../../common/manager/GameManager"

export class RoleController extends BaseController {
    S_UpdateIconId(msg) {
        GameManager.instance.updatePlayerMsg(msg)
    }
    
    C_UpdateIconId(param) {
        let msgName = "C_UpdateIconId"
        let msgData = param
        this.sendData(msgName, msgData);
    }

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: RoleController = new RoleController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        RoleController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.register("S_UpdateIconId", this.S_UpdateIconId, this);
    }

    addEveRegister() {        
    }
    
    delEveRegister() {
    }
}