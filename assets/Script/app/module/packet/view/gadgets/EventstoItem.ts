const {ccclass, property} = cc._decorator;

@ccclass
export default class EventstoItem extends cc.Component {

    @property(cc.Node)
    nodeBox: cc.Node = null;
    
    onLoad() {
       
    }

    onDestroy() {
        
    }

    eventstoItemFun(data){
        this.nodeBox.getChildByName("playerName").getComponent(cc.Label).string=data.key+""
        let datavalue=data.value/100
        this.node.getChildByName("lblgold").getComponent(cc.Label).string=datavalue+""
    }

    KingOfPopularity(){
        this.nodeBox.getChildByName("sprdetails").active=true
    }

}
