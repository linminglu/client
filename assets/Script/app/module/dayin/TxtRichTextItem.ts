const {ccclass, property} = cc._decorator;

@ccclass
export default class  TxtRichTextItem extends cc.Component {

    @property(cc.Label)
    lbl:cc.Label = null

    updataFun(data,num){
        let newDate = new Date()
        this.node.getComponent(cc.RichText).string = `\n\n\t\t=======${newDate.toLocaleString()}===`+data;
    }
   

}
