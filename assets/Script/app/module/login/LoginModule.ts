
import {BaseModule} from "../../common/baseui/BaseModule";
import {LoginModel} from "./model/LoginModel";
import {LoginController} from "./controller/LoginController";
import  LoginView from "./view/LoginView";
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";
export class LoginModule extends BaseModule {
    isShowing = false
    show() {
        if (! this.isShowing) {
            // super.show()
            
            LayerMgr.pushView("loginView", null, true);
            this.isShowing = true

            setTimeout(function() {
                cc.log(LayerMgr.layerArr)
                for(let i in LayerMgr.layerArr) {
                    let view = LayerMgr.layerArr[i]
                    if (i != "loginView") {
                        if (cc.isValid(view)) {
                            view.destroy()
                        }
                        LayerMgr.layerArr[i] = null
                    }
                }
            }, 500)
        }
    }
    
    hide() {
        if (this.isShowing) {
            // super.hide()

            LayerMgr.popView("loginView", null, true);
            this.view = null;
            this.isShowing = false
        }
    }
    
    destructor() {
        super.destructor();

        LoginModule.instance = null;
    }

    private static instance : LoginModule = null

    public static getInstance(){
        if(!this.instance){
            this.instance = new LoginModule();
        }
        return this.instance
    }


    private constructor() {
        super();

        this.model = LoginModel.getInstance()
        // this.controller = LoginController.instance
        this.view = new LoginView();
    }
}