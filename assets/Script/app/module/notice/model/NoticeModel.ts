/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"


export class NoticeModel extends BaseModel {
    public toTalNum: number = 0;    //下注额度

    destructor() {
        super.destructor();
        NoticeModel.instance = null;
        
        this.toTalNum = 0;
    }

    public static instance: NoticeModel = new NoticeModel()

    private constructor() {
        super();
    }
}
