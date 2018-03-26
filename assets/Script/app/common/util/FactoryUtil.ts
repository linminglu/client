import { AlertView } from "../ui/AlertView"
import { LayerManager } from "../manager/LayerManager"
import { ResConfig as ResCfg } from "../util/ResConfig";
import { FuncUtil } from "../util/FuncUtil";

export namespace FactoryUtil {

    /*创建提示框：txt_cancel txt_close   txt_confirm txt_delete  txt_no  txt_yes
    FactoryUtil.createAlertView({
        tipStr: "时间的点点滴滴多多多多多多多多大厦附近大开发阶段撒范德萨发简单方法？",
        cancelObj: {
            txtName: "txt_no",          //图片名
            callBack: function () {      //按钮回调
            }
        },
        confirmObj: {
            txtName: "txt_yes",         //图片名
            callBack: function () {      //按钮回调
            }
        },
        confirmOneObj: {
            txtName: "txt_yes",         //图片名
            callBack: function () {      //按钮回调
            }
        }
    })
    */
    export function createAlertView(obj: Object) {
        ResCfg.loadPrefab(this, "alertView", function (self, prefab) {
            let curView = cc.instantiate(prefab);
            LayerManager.topLayer.addChild(curView);
            curView.getComponent("AlertView").updateView(obj)
            FuncUtil.addViewAnim(curView);
        }, null, true);
    }

    export function createAlertConfirmView(tipStr: string, callBack: Function = null) {
        createAlertView({
            tipStr: tipStr,
            confirmOneObj: {
                callBack: function () {
                    if (callBack) {
                        callBack()
                    }
                }
            }
        })
    }
}