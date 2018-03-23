/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:model的基类
/////////////////////////////////////////////////////

import { Observer } from "../util/Observer";

export class BaseModel {
    protected cotroller: any = null;
    protected registerTable = {};

    constructor() {
    }

    destructor() {
        this.cotroller = null;
        this.registerTable = null;
    }

    registerModelChanged(name: string, callback: Function, context: any) {
        // //////cc.log(`BaseModel register ${name}`);

        let observers: Observer[] = this.registerTable[name];
        if (!observers) {
            this.registerTable[name] = [];
        }

        this.registerTable[name].push(new Observer(callback, context, name));
        // ////////////cc.log(this.registerTable)
    }

    unregisterModelChanged(name: string, callback: Function, context: any) {
        let observers: Observer[] = this.registerTable[name];
        if (!observers) return;

        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }

        if (observers.length == 0) {
            delete this.registerTable[name];
        }
    }

    changedModel(name: string, ...args: any[]) {
        let observers: Observer[] = this.registerTable[name];
        if (!observers) return;

        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer) {
                observer.notify(name, ...args);
            }
        }
    }
}