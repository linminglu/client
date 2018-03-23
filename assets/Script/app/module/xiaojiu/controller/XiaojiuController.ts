import { BaseController } from "../../../common/baseui/BaseController";
import { XiaojiuModel } from "../model/XiaojiuModel";
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager";
import { XiaojiuModule } from "../../xiaojiu/XiaojiuModule";
import { TonghuashunModule } from "../../tonghuashun/TonghuashunModule";
import { TonghuashunController as TongCtr } from "../../tonghuashun/controller/TonghuashunController";
import { TonghuashunModel as TongModel} from "../../tonghuashun/model/TonghuashunModel";
import { LonghudouModule } from "../../longhudou/LonghudouModule";
import { LoginController } from "../../login/controller/LoginController"
import { FactoryUtil } from "../../../common/util/FactoryUtil"
import {FuncUtil} from "../.././../common/util/FuncUtil"
import { GameManager } from "../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"

export class XiaojiuController extends BaseController {
    

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: XiaojiuController = new XiaojiuController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        XiaojiuController.instance = null;
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