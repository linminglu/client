import {LoginModule} from "../login/LoginModule";

import SuperClass from "./SuperClass";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ChildClass extends SuperClass {
    @property(cc.Button)
    btnOpenLogin: cc.Button = null;
    
    onload() {
    }

    updateLabel(eventName:string, args1:string, args2:number) {
        ////cc.log(`${eventName}， ${args1}， ${args2}`);
    }
    
    protected async testAsync(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello, World! From ChildClass!");
                
                this.openLoginClickFunc();
            }, 1000);
        });
    }
    
    openLoginClickFunc() {
        LoginModule.instance.show();
    }
}
