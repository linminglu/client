/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import { BaseModel } from "../../../common/baseui/BaseModel"

export class ChatModel extends BaseModel {
    Messages: any = [];
    Friends=[];
    setStoreMessages(dara) {
        if (this.Messages.length == 8) {
            this.Messages.shift();
        }else{
            
        }
        this.Messages.push(dara)
        //////////cc.log(this.Messages)
    }
    getStoreMessages() {
        return this.Messages;
    }
    destructor() {
        super.destructor();
        ChatModel.instance = null;
    }

    public static instance: ChatModel = new ChatModel()

    private constructor() {
        super();
    }
}