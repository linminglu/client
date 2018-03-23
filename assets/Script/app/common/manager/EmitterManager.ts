import {Observer} from "../util/Observer";

export class EmitterManager {
    private static listeners = {};

    public static register(name: number, callback: Function, context: any) {
        // //////cc.log(`EmitterManager register ${name}`);
        let observers: Observer[] = EmitterManager.listeners[name];
        if (!observers) {
            EmitterManager.listeners[name] = [];
        }
        
        EmitterManager.listeners[name].push(new Observer(callback, context, name));
    }

    public static unregister(name: number, callback: Function, context: any) {
        let observers: Observer[] = EmitterManager.listeners[name];
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
            delete EmitterManager.listeners[name];
        }
    }

    public static fire(name: number, ...args: any[]) {
        let observers: Observer[] = EmitterManager.listeners[name];
        if (!observers) return;

        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            observer.notify(name, ...args);
        }
    }
}