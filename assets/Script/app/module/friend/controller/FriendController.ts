import { BaseController } from "../../../common/baseui/BaseController";
import { FriendModel } from "../model/FriendModel";
import { FriendModule } from "../FriendModule";
import { MainModule } from "../../main/MainModule";
export class FriendController extends BaseController {
    S_FriendList(msg) {             //获取好友列表返回		
        FriendModel.instance.setFreiendData(msg)
    }
    C_FriendList(param) {           //获取好友列表
        let msgName = "C_FriendList"
        let msgData = param
        
        this.sendData(msgName, msgData);
    }
    S_AddFriend(msg) {              //添加好友返回
        //////////cc.log(msg);
        FriendModel.instance.setAddFriendData(msg);
    }
    C_AddFriend(param) {                 //添加好友
        let msgName = "C_AddFriend"
        let msgData = param
        
        this.sendData(msgName, msgData);
    }
    S_DeleteFriend(msg) {              //返回删除的好友
        FriendModel.instance.setDelFriendData(msg);
    }
    C_DeleteFriend(param) {                //删除好友
        let msgName = "C_DeleteFriend"
        let msgData = param
        
        this.sendData(msgName, msgData);
    }	
    
    S_ShowPlayer(msg)               //查询角色信息
    {
        FriendModel.instance.setPlayerDataSearch(msg)
    }
    C_ShowPlayer(param)
    {
        let msgName = "C_ShowPlayer"
        let msgData = param
        
        this.sendData(msgName, msgData);

    }   

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: FriendController = new FriendController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        FriendController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }
    addNetRegister() {
        this.register("S_FriendList", this.S_FriendList, this);
        this.register("S_DeleteFriend", this.S_DeleteFriend, this);
        this.register("S_AddFriend", this.S_AddFriend, this);
        this.register("S_ShowPlayer", this.S_ShowPlayer, this);
    }
    addEveRegister() {

    }
    delEveRegister() {

    }


}