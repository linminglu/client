
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { NodePoolMgr, NodePoolKey } from "../../common/manager/NodePoolMgr"

interface IpPortObj {
    ip: string;
    port: number;
    sIp: string;
    sPort: number;
}


export namespace FuncUtil {
    export function parseIpPort(ipStr: string, portNum: number, sIpStr: string = null, sPortNum: number = null): IpPortObj {
        let url = location.search;
        let theRequest = null;
        if (url.indexOf("?") != -1) {
            theRequest = new Object();
            let str = url.substr(1);
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
            }
        }

        if (theRequest && Boolean(theRequest.ip) && Boolean(theRequest.port)) {
            ipStr = theRequest.ip;
            portNum = theRequest.port;

            sIpStr = theRequest.sIp;
            sPortNum = theRequest.sPort;
        }

        return { ip: ipStr, port: portNum, sIp: sIpStr, sPort: sPortNum }
    }

    //延时执行
    export function delayFunc(callback, delayTime, node = null): cc.ActionInterval {
        let delay = cc.delayTime(delayTime)
        let sequence = cc.sequence(delay, cc.callFunc(callback))
    
        if (node == null) {
            node = cc.director.getScene().getChildByName("Canvas")
        }
    
        if (cc.isValid(node)) {
            node.runAction(sequence)
        }
        return sequence
    }
    
    export function setTimeout(callback, delayTime) {
        setTimeout(function () {
            callback()
        }, delayTime * 1000)
    }

    export function garbageCollect() {
        if (cc.sys.isNative) {
            cc.sys.garbageCollect()
        }
    }

    export function addViewAnim(tagert: cc.Node) {
        tagert.scaleX = 0.9
        tagert.scaleY = 0.9
        let action = cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 1, 1));
        tagert.runAction(action);
    }

    export function delViewAnim(tagert: cc.Node) {
        let action = cc.spawn(cc.scaleTo(0.2, 0.8, 0.8), cc.fadeOut(0.2), cc.callFunc(delayFunc));
        tagert.runAction(action);
    }

    export function log(data) {
        if (CC_DEBUG) {
            console.log(data)
        }
    }

    export function formatNum(num: number, toInt: boolean = false): string {
        if (toInt) {
            num = Number(Math.floor(num))
        }

        let str = num.toString()
        var newStr = "";
        var count = 0;

        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }

            if (toInt) {
                return newStr
            } else {
                return newStr + ".00";
            }
        } else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }

            return newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        }
    }

    export function getSplitStr(str) {
        let strArr = new Array()
        strArr = str.split(",")
        return strArr

    }

    export function getJsonConfig(fileName: string, codeId: number = null, callback: Function = null, context = null) {
        // //////cc.log(`getJsonConfig fileName: ${fileName}, codeId: ${codeId}`)
        cc.loader.load(cc.url.raw(`resources/config/${fileName}.json`), function (err, data) {
            if (err) {
                FuncUtil.log("not find resources/config/game_exception.json");
            } else {
                if (codeId == null && callback) {
                    callback(data, context)
                    return
                }

                let key = `id${codeId}`
                if (callback) {
                    if (!data[key]) {
                        //////cc.log(`data[${key}] = ${data[key]}`)
                        data[key] = { exceptionMsg: `${fileName}[${codeId}] is undefined` }
                    }

                    callback(data[key], context)
                }
            }
        });
    }

    export function getGameExceptionJson(codeId: number, callback: Function = null, context = null) {
        // //////cc.log("getGameExceptionJson codeId =", codeId)
        getJsonConfig("game_exception", codeId, callback, context)
    }

    export function getNoticeJson(codeId: number, callback: Function = null, context = null) {
        // //////cc.log("getNoticeJson codeId =", codeId)
        getJsonConfig("notice", codeId, callback, context)
    }

    export function upRandomzuobiaoFun(end: number, start: number) {
        var num = Math.floor(Math.random() * start + end);
        return num
    }

    export function parsCard(data) {
        data -= 1;
        let nums: number = parseInt(data % 10 + "")
        let brobg = {
            num: nums,
            Color: parseInt(data / 10 % 4 + ""),
        }
        return brobg
    }

    export function getSettingTag(keystr: string = null, tag: string = null) {
        let gameTag = tag
        if (tag == null) {
            gameTag = GameColMgr.instance.getGameTag()
        }

        if (keystr == null) {
            return gameTag
        }

        keystr = keystr + gameTag
        return keystr
    }

    export function getNum2Obj(num: number = null) {
        if (num == null) return null
        let numS = num
        let numData = numS.toString();
        let dataArr = [];
        let strData = {
            bai: null,
            shi: null,
            ge: null
        }

        if (numData.length == 2) {
            strData = {
                bai: 0,
                shi: Number(numData[0]),
                ge: Number(numData[1]),
            }
        } else if (numData.length == 3) {

            strData = {
                bai: Number(numData[0]),
                shi: Number(numData[1]),
                ge: Number(numData[2]),
            }
        } else {
            strData = {
                bai: 0,
                shi: 0,
                ge: Number(numData)
            }
        }
        return strData;
    }

    export function getTime_1(StrTime) {
        if (StrTime == "") return 0
        let str = StrTime;
        str = str.replace(/-/g, '/');
        let date = new Date(str);
        return date.getTime();
    }

    export function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }

    export function isObj(obj) {
        return typeof obj == "object"
    }

    export function delObj(curObj, obj) {
        if (typeof curObj == "function") {
            return true
        }
        cc.log(curObj)
cc.log(obj)
        if (curObj == obj.__proto__) {
            return true
        }

        if (curObj == obj.$type) {
            return true
        }

        if (curObj == obj.constructor) {
            return true
        }
    }

    export function printObj(obj) {
        let str = ""
        let arr = []
        if (typeof obj == "string") {
            return "\"" + obj.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\str)/g, "\\str").replace(/(\t)/g, "\\t") + "\"";
        }

        if (isObj(obj)) {
            if (isArray(obj)) {
                let r = ""
                for (let i = 1; i <= obj.length; i++) {
                    r += printObj(obj[i - 1])
                    if (i != obj.length) {
                        r += ", "
                    }
                }

                str = "[" + r + "]"
            } else {
                let r = ""
                for (let i in obj) {
                    if (!delObj(obj[i], obj)) {
                        r += "\n"
                        r += "\t" + i + ": " + printObj(obj[i]) + ","
                    }
                }

                str = "{" + r + "\n}"
            }

            return str;
        }

        return obj.toString();
    }

    export function QuiteGame() {

    }
    export function oD(objArr,objName){
        for(let i = 0 ; i < this.objArr.length ; i++){
            if(this.objArr[i]) {
                //console.log("销毁~~~~~~~~111~~~~~~~~~")
                NodePoolMgr.instance.putNood(this.objArr[i], objName)
            }
        }
    }
}