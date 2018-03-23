import {BaseController} from "../../../common/baseui/BaseController";
import {LonghudouModel} from "../model/LonghudouModel";
import {MainModule} from "../../main/MainModule";
import {LonghudouModule} from "../LonghudouModule";
export class LonghudouController extends BaseController {
    // S_LongHu(msg) {
    //     //////cc.log("从来没有打印过")
    //     ////cc.log("S_LongHu msg")
    //     //////////cc.log(msg)
    //     LonghudouModel.instance.setData(msg);
    // }

    
            /* //{
                zhenzaizuosm:"xiazhu"
        //     lds: param.userId,
        //     key: param.key,
        //     time: param.time,
        //     sign: param.sign,
        //     serverNo: param.serverNo
            listSq: {sq:11,}
        // } */
    // C_LongHu(param) {
    //     let msgName = "C_LongHu"
    //      let msgData = param
    
    //     this.sendData(msgName, msgData);
    // }

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: LonghudouController = new LonghudouController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        LonghudouController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }
    addNetRegister() {
       // this.register("S_LongHu", this.S_LongHu, this);
    }
    addEveRegister() {        
    }
    delEveRegister() {
    }
    

}