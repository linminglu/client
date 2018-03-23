const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordtypeItem extends cc.Component {

    onLoad() {
        
        
    }

    RecordtypeItem(data){
        for(let i=0;i<data.length;i++){
            let nodelbl=this.node.getChildByName("lbl"+i);
            nodelbl.getComponent(cc.Label).string=data[i]+"".toString();
        }
    }

}
