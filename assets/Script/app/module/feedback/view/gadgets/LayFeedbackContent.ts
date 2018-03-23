const {ccclass, property} = cc._decorator;

@ccclass
export default class LayFeedbackContent extends cc.Component {

   @property(cc.EditBox)
   EditBoxHeadline:cc.EditBox=null;

   @property(cc.EditBox)
   EditBoxProblem:cc.EditBox=null;

   @property(cc.EditBox)
   EditBoxPhone:cc.EditBox=null;
   
   @property(cc.EditBox)
   EditBoxMail:cc.EditBox=null;
    onLoad() {
      
        
    }
    
    btnCommitCallBack()
    {
            //提交按钮发出；
        this.EditBoxHeadline.string
        this.EditBoxProblem.string
        this.EditBoxPhone.string
        this.EditBoxHeadline.string
        this.EditBoxMail.string
        ////cc.log("公告消息已发出。。。。。。。。。。。。");
    }
}
