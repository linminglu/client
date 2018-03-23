/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"

export class NiuniuModel extends BaseModel {

    destructor() {
        super.destructor();
        NiuniuModel.instance = null;
    }

    public static instance: NiuniuModel = new NiuniuModel()
    

    private constructor() {
        super();
    }
}