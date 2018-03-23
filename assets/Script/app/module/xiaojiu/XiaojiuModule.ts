
import { GameModule } from "../game/GameModule"
import { XiaojiuModel } from "./model/XiaojiuModel"
import { XiaojiuController } from "./controller/XiaojiuController"
import XiaojiuView from "./view/XiaojiuView"

export class XiaojiuModule extends GameModule {
    public destructor() {
        super.destructor()

        XiaojiuModule.instance = null
    }
    
    public static instance: XiaojiuModule = new XiaojiuModule()

    private constructor() {
        super()
        
        this.model = XiaojiuModel.instance
        this.controller = XiaojiuController.instance
        this.view = new XiaojiuView()
    }
}
