
import { BaseModule } from "../../common/baseui/BaseModule"
import { GameModel } from "./model/GameModel"
import { GameController } from "./controller/GameController"
import GameView from "./view/GameView"

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager"
import { GameCollectManager as GameColMgr } from "../../common/manager/GameCollectManager"
import { ResConfig as ResCfg } from "../../common/util/ResConfig"

export class GameModule extends BaseModule {
    protected gameTag: string = null
    protected gameViewName: string = null

    show() {
        if (!this.isShowing) {
            super.show()

            this.gameTag = GameColMgr.instance.getGameTag()
            this.gameViewName = `${this.gameTag}View`

            ResCfg.loadPlistAll(this, this.gameTag, function (self, atlas) {
                LayerMgr.pushView(self.gameViewName, null, true, true)
                self.isShowing = true
            }, true)
        }
    }

    hide() {
        if (this.isShowing) {
            super.hide()

            LayerMgr.popView(this.gameViewName, null, true)
            this.isShowing = false

            this.view = null
        }
    }

    protected constructor() {
        super()

        this.model = GameModel.instance
        this.controller = GameController.instance
        this.view = new GameView()
    }

    destructor() {
        super.destructor()
    }
}