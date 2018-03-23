/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"

export class XiaojiuModel extends BaseModel {

    destructor() {
        super.destructor();
        XiaojiuModel.instance = null;
    }

    public static instance: XiaojiuModel = new XiaojiuModel()
    

    private constructor() {
        super();
    }
}