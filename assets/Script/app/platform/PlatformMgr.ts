
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
    let className: string = "org/cocos2dx/lib/Cocos2dxActivity"

    function callStaticMethod(className: string, funcName: string, sin: string, ...args: any[]) {
        if (HelpFunc.isAndroid) {
            jsb.reflection.callStaticMethod(className, funcName, sin, args)
        } else {
            cc.error("请检查是否为Android平台调用")
        }
    }

    export function exitGame() {
        jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxActivity", "exitGame",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", "提示", "确定要退出游戏吗？", "确定", "取消");
    }

    export function getMemory() {
        let memory = jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxActivity", "getMemory", "(I)I", 0);
        return memory
    }
    
}

export namespace IosPlatform {
    
}