/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"

export class ExchangeModel extends BaseModel {

    private exchangeInInfo = null;                  //积分内容
    private exchangerid=null;                      //活动排期
    private integral=null;
    storageExchangeInInfo(msg){
        cc.log(msg)
        this.exchangeInInfo=msg
        this.exchangerid=msg.activitySeq
        this.integral=msg.integral
    }

    getexchangerid(){
        return this.exchangerid
    }

    getintegral(){
        return this.integral
    }

    destructor() {
        super.destructor();
        ExchangeModel.instance = null;
    }

    public static instance: ExchangeModel = new ExchangeModel()

    private constructor() {
        super();
    }
}