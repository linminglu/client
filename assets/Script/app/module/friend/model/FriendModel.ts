/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"

export class FriendModel extends BaseModel {
    public toTalNum: number = 0;    //下注额度
    freiendData:any = null;
    addFriendData:any = null;
    delFriendData:any = null;
    searchPlayer:any = null;
    setFreiendData(data)
    {
        this.freiendData=data;
        this.changedModel("MAIN_FRIENDDATA_CHANGE", data);
    }
    getFreiendData()
    {
        return this.freiendData
    }
    setAddFriendData(data)
    {
        this.addFriendData=data;
        this.changedModel("MAIN_ADDFRIENDDATA_CHANGE",data);
    }
    setDelFriendData(data)
    {
        this.delFriendData=data
        this.changedModel("MAIN_DELFRIENDDATA_CHANGE", data);
    }
    setPlayerDataSearch(data)
    {
        this.searchPlayer=data;
        this.changedModel("MAIN_SEARCHPLAYERDATA_CHANGE", data);
    }
    destructor() {
        super.destructor();
        FriendModel.instance = null;
        
        this.toTalNum = 0;
    }

    public static instance: FriendModel = new FriendModel()

    private constructor() {
        super();
    }
}