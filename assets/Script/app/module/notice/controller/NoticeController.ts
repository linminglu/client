import {BaseController} from "../../../common/baseui/BaseController";
import {NoticeModel as Model} from "../model/NoticeModel";
import {NoticeModule} from "../NoticeModule";
import {MainModule} from "../../main/MainModule";

export class NoticeController extends BaseController {
    // changedToTalNum(step: any) {
    //     let model = Model.instance
    //     let num = model.toTalNum;
    //     if (step < 0 && (num + step) < 0) {
    //         return;
    //     } 
    //     model.toTalNum = num + step;
    //     model.changedModel("LOGIN_TOTAL_CHANGE", "");
    // }

 

    destructor() {
        super.destructor();

        NoticeController.instance = null;
    }

    public static instance: NoticeController = new NoticeController()

    private constructor() {
        super();
    }
}