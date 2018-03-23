/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"

export class FeedbackModel extends BaseModel {
    public toTalNum: number = 0;    //下注额度

    destructor() {
        super.destructor();
        FeedbackModel.instance = null;
        
        this.toTalNum = 0;
    }

    public static instance: FeedbackModel = new FeedbackModel()

    private constructor() {
        super();
    }
}