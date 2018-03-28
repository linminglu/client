const {ccclass, property} = cc._decorator;

@ccclass
export class MsgTxtItem extends cc.Node {

    private richTxt : cc.RichText = null;

    constructor() {
        super();
        this.addRichTxtItem();
    }

    private addRichTxtItem() : void {
        if(this.richTxt == null){
            this.richTxt = this.addComponent(cc.RichText);
            this.richTxt.string = "";
            this.richTxt.fontSize = 28;
        }
    }

    public getTxtItem() : cc.RichText {
        return this.getComponent(cc.RichText);
    }

    public setTxt( str:string ) : void {
        this.richTxt = this.getTxtItem();
        this.richTxt.string = str;
    }

    public getTxtWidth() : number {

        

        return 0;
    }

    public getTxtHeight() : number {
        return 0;
    }

}
