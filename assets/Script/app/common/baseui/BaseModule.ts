/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:module的基类
/////////////////////////////////////////////////////

import {BaseModel} from "./BaseModel";
import {BaseController} from "./BaseController";
import BaseView from "./BaseView";

export class BaseModule {
    protected model : any = null;
    protected controller : any = null;
    protected view : any = null;
    
    public isShowing : boolean = false;

    constructor() {
        this.isShowing = false;
    }
    
    initMVC() {
    }
    
    show() {
        this.isShowing = true;
    }

    hide() {
        this.isShowing = false;
    }

    getShowState() {
        return this.isShowing
    }

    destructor() {
        if (!this.view) {
            this.view.destructor();
            this.controller.destructor();
            this.model.destructor();

            this.model = null;
            this.controller = null;
            this.view = null;
            this.isShowing = false;
        }
    }
}