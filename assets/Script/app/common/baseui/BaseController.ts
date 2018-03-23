/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:controller的基类
/////////////////////////////////////////////////////

import NetworkMgr from "../../network/NetworkMgr";

export class BaseController {
    protected model: any = null;
    protected view: any = null;

    protected netWorkMgr: NetworkMgr = null;

    constructor() {
        this.netWorkMgr = NetworkMgr.instance;
    }

    destructor() {
        this.model = null;
        this.view = null;
    }

    protected sendData(msgName: string, msgData: object = {}) {
        this.netWorkMgr.sendData(msgName, msgData)
    }

    protected register(msgName: string, callBack: Function, context) {
        this.netWorkMgr.register(msgName, callBack, context)
    }
    
    protected int2Float(num: number) {
        return Number((num * 0.01).toFixed(2))
    }

    protected float2Int(num: number) {
        return num * 100
    }
}