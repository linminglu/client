
/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../config/EmitterConfig"
export class DayinModel extends BaseModel {
    private logList = []

    clearLogList() {
        this.logList = []
    }

    getLogList() {
        return this.logList
    }

    setLogList(log) {
        this.logList.push(log)

        if (this.logList.length > 50) {
            this.logList.pop()
        }

        //this.changedModel("TEST_SHOW_LOG", log)

        Emitter.fire(EmitterCfg.GLOBAL_TEST_UPDATE_LOG, this.logList);
    }

    destructor() {
        super.destructor();
        DayinModel.instance = null;
    }

    public static instance: DayinModel = new DayinModel()

    private constructor() {
        super();
    }
}