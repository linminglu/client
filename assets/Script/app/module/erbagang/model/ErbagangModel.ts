/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../config/EmitterConfig"
export class ErbagangModel extends BaseModel {

    public Enter:any=[];

    public SkipAinm:boolean=false;

    dataChip:any=null;
    //进入房间信息
    setSkipAinmFun(bool){
        this.SkipAinm=bool;
    }

    getSkipAinmFun(){
        return this.SkipAinm;
    }

    EnterGameFun(msg){
        this.Enter = msg
    }

 

    setEndChipData(data)
    {
        this.dataChip = data;
        Emitter.fire(EmitterCfg.COM_REPEAT_BET_DATA, data)
    }

    destructor() {
        super.destructor();
        ErbagangModel.instance = null;
    }

    public static instance: ErbagangModel = new ErbagangModel()

    private constructor() {
        super();
    }
}