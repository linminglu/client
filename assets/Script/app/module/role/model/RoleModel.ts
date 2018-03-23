/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"

export class RoleModel extends BaseModel {
    public toTalNum: number = 0;    //下注额度

    destructor() {
        super.destructor();
        RoleModel.instance = null;
        
        this.toTalNum = 0;
    }

    public static instance: RoleModel = new RoleModel()

    private constructor() {
        super();
    }
}