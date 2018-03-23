import { ResConfig as ResCfg } from "../util/ResConfig";
import { FuncUtil } from "../util/FuncUtil";

export class LayerManager {
    public static layerArr: cc.Node[] = [];

    public static sceneLayer: cc.Node = null;
    public static uiLayer: cc.Node = null;
    public static alertLayer: cc.Node = null;
    public static topLayer: cc.Node = null;
    public static Record: any = null;
    public static creatLayer() {
        let visibleSize = cc.director.getVisibleSize();

        if (!cc.isValid(LayerManager.sceneLayer)) {
            LayerManager.sceneLayer = new cc.Node();
            LayerManager.sceneLayer.setPosition(cc.p(visibleSize.width / 2, visibleSize.height / 2));
            cc.director.getScene().addChild(LayerManager.sceneLayer, 1000);
        }

        if (!cc.isValid(LayerManager.uiLayer)) {
            LayerManager.uiLayer = new cc.Node();
            LayerManager.uiLayer.setPosition(cc.p(visibleSize.width / 2, visibleSize.height / 2));
            cc.director.getScene().addChild(LayerManager.uiLayer, 2000);
        }

        if (!cc.isValid(LayerManager.alertLayer)) {
            LayerManager.alertLayer = new cc.Node();
            LayerManager.alertLayer.setPosition(cc.p(visibleSize.width / 2, visibleSize.height / 2));
            cc.director.getScene().addChild(LayerManager.alertLayer, 3000);
        }

        if (!cc.isValid(LayerManager.topLayer)) {
            LayerManager.topLayer = new cc.Node();
            LayerManager.topLayer.setPosition(cc.p(visibleSize.width / 2, visibleSize.height / 2));
            cc.director.getScene().addChild(LayerManager.topLayer, 4000);
        }
    }

    public static popView(viewName: string, action = null, noAnim = false) {
        let curView = LayerManager.layerArr[viewName];
        
        if (cc.isValid(curView)) {
            let delayFunc = function () {
                // curView.removeAllChildren()
                // curView.removeFromParent()
                
                curView.destroy();
                LayerManager.layerArr[viewName] = null
            }

            if (action == null) {
                action = cc.spawn(cc.scaleTo(0.2, 0.8, 0.8).easing(cc.easeBackIn()), cc.fadeOut(0.2), cc.callFunc(delayFunc));
            }

            if (noAnim == null) {
                delayFunc();
            } else {
                curView.runAction(action);
            }
        }
    }

    public static pushView(viewName: string, action, noAnim = false, isGroup: boolean = false, zOrder: number = null) {
        if (LayerManager.layerArr[viewName]) {
            return
        }

        // //////cc.log(`pushView prefabPath = ${viewName}`)
        ResCfg.loadPrefab(this, viewName, function (self, prefab) {
            let curView = cc.instantiate(prefab);
            if (zOrder == null) {
                LayerManager.sceneLayer.addChild(curView)
            } else {
                LayerManager.sceneLayer.addChild(curView, zOrder)
            }
            
            LayerManager.layerArr[viewName] = curView;
            if (!action) {
                action = cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 1, 1).easing(cc.easeBackOut()));
            }

            if (!noAnim) {
                curView.scaleX = 0.9
                curView.scaleY = 0.9

                curView.runAction(action);
            }

        }, isGroup, false);
    }

    public static getNodeByName(viewName): cc.Node {
        return LayerManager.layerArr[viewName]
    }

    public static addView(viewName: string, parentName: string, action = null, noAnim = false) {
        let parentView = <cc.Node>LayerManager.layerArr[parentName]
        if (cc.isValid(parentView)) {
            let prefabPath = ResCfg.getLayoutComonPath(viewName)
            //////cc.log(`pushView prefabPath = ${prefabPath}`)
            cc.loader.loadRes(prefabPath, function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }

                let curView = cc.instantiate(prefab);
                parentView.addChild(curView);
                curView.scaleX = 0.9
                curView.scaleY = 0.9

                if (!action) {
                    action = cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 1, 1));
                }

                if (!noAnim) {
                    curView.runAction(action);
                }

                LayerManager.layerArr[viewName] = curView;
            });
        } else {
            //////cc.log("父节点不存在")
        }
    }

    public static delView(viewName: string, action = null, noAnim = false) {
        LayerManager.popView(viewName);
    }

    public static Recording(obj: boolean) {
        ////////////cc.log(111)
        if (obj) {
            ////////////cc.log(111)
            ResCfg.loadPrefab(this, "tapeItem", function (self, prefab) {
                self.Record = cc.instantiate(prefab);
                LayerManager.topLayer.addChild(self.Record);
            });
        } else {
            ////////////cc.log(222)
            if (cc.isValid(this.Record)) {
                this.Record.destroy();
            }
        }

    }
}