import ActivityScrollView from "../../../activity/view/gadgets/ActivityScrollView"
const {ccclass, property} = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
@ccclass
export default class NoticeScrollView extends ActivityScrollView {



    onLoad(){
        super.onLoad()
    }
    
    onDestroy(){
        super.onDestroy()
    }



    // @property(cc.Node)
    // sprUpLogo:cc.Node=null;
    // @property(cc.Node)
    // sprBelowLogo:cc.Node=null;
    // dataArr:any=[
    //     {name:"notice",num:1},
    //     {name:"notice",num:2},
    //     {name:"notice",num:3},
    //     {name:"notice",num:4},
    //     {name:"notice",num:5},
    //     {name:"notice",num:6},
    //     {name:"notice",num:7},
    //     {name:"notice",num:8},
    //     {name:"notice",num:9},
    //     {name:"notice",num:10}
    // ];
  
    // onLoad() {

    //     this.sprUpLogo.active=false;
    //     this.sprBelowLogo.active=false;
    //     this.upDataNoticeFun();
    // }
    // onDestroy(){
    // }
    // upDataNoticeFun()
    // {
    //     if(this.dataArr.length>6){
    //         this.sprBelowLogo.active=true;
    //     }
    //     ResCfg.loadPrefab(this,"noticeActivityItem",function(self,Prefab){
    //         var ctrNotice=null;
    //         for(var index in self.dataArr){
    //             ctrNotice=cc.instantiate(Prefab);
    //             ctrNotice.getComponent("NoticeActivityItem").upDataSprHandoverFun(self.dataArr[index]);
    //             self.node.getComponent(cc.ScrollView).content.addChild(ctrNotice);
    //         }
    //     },false,true)
    // }
    // upSprLogoOutFun()
    // {

    //     let Coord:cc.Vec2=this.node.getComponent(cc.ScrollView).getScrollOffset();
    //     let maxCoord:cc.Vec2=this.node.getComponent(cc.ScrollView).getMaxScrollOffset();
    //     if(this.dataArr.length<7){
    //         return;
    //     }
    //     if(Coord.y<=0)
    //     {
    //         this.sprUpLogo.active = false;
    //         this.sprBelowLogo.active = true;
    //     }else if(Coord.y < maxCoord.y&&Coord.y > 0){
    //         this.sprUpLogo.active = true;
    //         this.sprBelowLogo.active = true;
    //     }else if(Coord.y >= maxCoord.y){
    //         this.sprUpLogo.active = true;
    //         this.sprBelowLogo.active = false;
    //     }
            
    // }

}
