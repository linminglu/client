
import { GameModule } from "../game/GameModule"
import { NiuniuModel } from "./model/NiuniuModel"
import { NiuniuController } from "./controller/NiuniuController"
import NiuniuView from "./view/NiuniuView"

export class NiuniuModule extends GameModule {
    public destructor() {
        super.destructor()

        NiuniuModule.instance = null
    }
    
    public static instance: NiuniuModule = new NiuniuModule()

    private constructor() {
        super()
        
        this.model = NiuniuModel.instance
        this.controller = NiuniuController.instance
        this.view = new NiuniuView()
    }
}
