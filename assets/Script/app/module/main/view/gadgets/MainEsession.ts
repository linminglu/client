import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { MainController } from "../../controller/MainController"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager";
import { MainModel } from "../../model/MainModel"

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainEsession extends cc.Component {
    @property(cc.ScrollView)
    Scrol: cc.ScrollView = null;
    @property(cc.Node)
    nodeGame: cc.Node = null;

    curView = {};

    onLoad() {
        this.node.active = false
        Emitter.register(EmitterCfg.MAIN_HIDES, this.initView, this);

        this.node.getChildByName("nodeBg").on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation()
        })
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_HIDES, this.initView, this)
    }

    initView(eventName: string, gameData) {
        //////////cc.log(gameData)
        if (gameData) {
            MainModel.instance.getCurEsessionData(gameData, function (data, self) {
                // //////////cc.log(data)
                ResCfg.loadPrefab(self, "esessionItem", function (self, prefab) {
                    for (let i = 0; i < data.length; i++) {
                        if (! cc.isValid(self.curView[i])) {
                            self.curView[i] = cc.instantiate(prefab)
                            self.Scrol.content.addChild(self.curView[i])
                        }
                        self.curView[i].getComponent('EsessionItem').updateItemFun(data[i])
                    }
                })
            }, this)
            
            this.node.active = true
            this.nodeGame.active=false
        } else {
            this.node.active = false
            this.nodeGame.active=true
        }
    }

    btnFallbackFun() {
        this.node.active = false
        this.nodeGame.active=true
        GameColMgr.instance.initGameData()
    }

}
