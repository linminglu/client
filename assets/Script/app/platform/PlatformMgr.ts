
import {HelpFunc} from "../common/util/HelpFunc"

export namespace PlatformMgr {
    
    export function getMemory() {
        if (HelpFunc.isAndroid) {
            return AndroidPlatform.getMemory()
        } else {
            return 0
        }
    }
}

export namespace AndroidPlatform {
    let className: string = "org.cocos2dx.javascript.AppActivity"

    function callStaticMethod(className: string, funcName: string, sin: string, ...args: any[]) {
        if (HelpFunc.isAndroid) {
            jsb.reflection.callStaticMethod(className, funcName, sin, args)
        } else {
            cc.error("请检查是否为Android平台调用")
        }
}

export function exitGame() {
    jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "exitGame", "()V");
}

export function getMemory() {
    console.log('进入原生平台反射！')
    let memory = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getMemory", "()Ljava/lang/String;");
        return memory
}
    
}

export namespace IosPlatform {
    
}