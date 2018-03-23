/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"

export class LoginModel extends BaseModel {
    httpLoginData = null
    serverList = null
    curServerData = null

    setHttpLoginData(data) {
        this.serverList = data.serverList
        this.httpLoginData = data
    }

    getHttpLoginData() {
        return this.httpLoginData
    }

    getServerList() {
        return this.serverList
    }

    setCurServerData(data) {
        this.curServerData = data
        this.changedModel("LOGIN_SELECT_SEVER", data);
    }

    getCurServerData() {
        if (!this.curServerData) {
            return JSON.parse(cc.sys.localStorage.getItem("LOGIN_SELECT_SEVER"))
        }

        return this.curServerData
    }

    destructor() {
        super.destructor();
        LoginModel.instance = null;
    }

    public static instance: LoginModel = new LoginModel()

    private constructor() {
        super();
    }
}