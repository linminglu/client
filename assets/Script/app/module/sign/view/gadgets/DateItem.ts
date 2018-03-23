const {ccclass, property} = cc._decorator;
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { SignModel } from "../../model/SignModel";
@ccclass
export default class DateItem extends cc.Component {

    tian:number=0;


    onLoad() {
        Emitter.register(EmitterCfg.SIGN_SELECTED, this.SelectedMonitor, this);
        SignModel.instance.registerModelChanged("SIGN_SEND_CHECK_IN", this.monitorSendACheckIn, this);
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.SIGN_SELECTED, this.SelectedMonitor, this);
        SignModel.instance.unregisterModelChanged("SIGN_SEND_CHECK_IN", this.monitorSendACheckIn, this);
    }

    DateItemFun(name,day){
        let now = new Date();
        let date = now.getDate();//得到日期
        if(name=="Signed"){
            this.node.getChildByName("sprSigned").active=true;
            this.node.getChildByName("lblBall").getComponent(cc.Label).string=day.toString();
            if(day==date){
                let daytian=SignModel.instance.getSignHistoy()
                for(let i=0;i<daytian.length;i++){
                    if(daytian[i]==0){
                        Emitter.fire(EmitterCfg.SIGN_SELECTED, i+1);
                        break;
                    }
                }
            }
        }else if(name=="Nosign"){
            this.tian=day
            if(day==date){
                this.node.getChildByName("btnSelected").active=true;
            }
            this.node.getChildByName("sprNull").active=true;
            this.node.getChildByName("lblBall").getComponent(cc.Label).string=day.toString();
        }else{
            this.node.getChildByName("sprNull").active=true;
        }
    }

    SelectedMonitor(eventName: string, ager1:number){
    
        if(this.tian==ager1){
            let now = new Date();
            let dateJT = now.getDate();//得到日期
            if(dateJT<ager1)return
            this.node.getChildByName("btnSelected").active=true;
         }else{

             this.node.getChildByName("btnSelected").active=false;
         }
    }

    monitorSendACheckIn(eventName: string, ager1:number){
        if(this.tian==ager1){
            this.node.getChildByName("sprSigned").active=true;
            let daytian=SignModel.instance.getSignHistoy()
            for(let i=0;i<daytian.length;i++){
                if(daytian[i]==0){
                    let Dates = new Date();
                    let dateJT = Dates.getDate();
                    if(daytian[dateJT-1]==1){
                        Emitter.fire(EmitterCfg.SIGN_SELECTED, i+1);
                    }
                    break;
                }
            }
        }
    }
}
