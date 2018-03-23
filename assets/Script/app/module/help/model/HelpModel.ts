/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"

export class HelpModel extends BaseModel {

    destructor() {
        super.destructor();
        HelpModel.instance = null;
    }

    public static instance: HelpModel = new HelpModel()
    

    private constructor() {
        super();
    }
}