
export namespace HelpFunc {
    export function isAndroid(): boolean {
        return cc.sys.ANDROID == cc.sys.platform
    }
    
    export function isIOS(): boolean {
        return cc.sys.IPHONE == cc.sys.platform || cc.sys.IPAD == cc.sys.platform
    }

    export function isNative(): boolean {
        return cc.sys.isNative
    }
    
    export function isBrowser(): boolean {
        return cc.sys.isBrowser
    }
}