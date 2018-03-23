
import { BaseModel } from "../../../common/baseui/BaseModel"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class LonghudouModel extends BaseModel {
    private curChipArr:any = null;
    private bettingInfoMoney :number = 0;
    private myGold:number = 0;
   
    
    getBettingInfoMoney(){

        return this.bettingInfoMoney
    }
    setBettingInfoMoney(msg){
        
        this.bettingInfoMoney = msg;
    }
    // setMyInitMoney(msg){
      
    //     this.myGold = msg;
    // }
    // getMyInitMoney(){
    //     return  this.myGold
    // }
   
    destructor() {
        super.destructor();
        LonghudouModel.instance = null;
    }
    
    public static instance: LonghudouModel = new LonghudouModel()

    private constructor() {

        super();

    }
}