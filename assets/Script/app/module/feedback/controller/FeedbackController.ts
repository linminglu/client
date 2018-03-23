import {BaseController} from "../../../common/baseui/BaseController";
import {FeedbackModel as Model} from "../model/FeedbackModel";
import {FeedbackModule} from "../FeedbackModule";
import {MainModule} from "../../main/MainModule";
export class FeedbackController extends BaseController {
    changedToTalNum(step: any) {
        let model = Model.instance
        let num = model.toTalNum;
        if (step < 0 && (num + step) < 0) {
            return;
        } 
        model.toTalNum = num + step;
        model.changedModel("LOGIN_TOTAL_CHANGE", "");
    }

    ChatFunc() {
        
    }
    
    confirmChatFunc(accountStr: string, passwordStr: string) {
      
        
    }

    destructor() {
        super.destructor();

        FeedbackController.instance = null;
    }

    public static instance: FeedbackController = new FeedbackController()

    private constructor() {
        super();
    }
}