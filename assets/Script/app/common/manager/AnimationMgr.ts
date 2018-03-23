import { ResConfig as ResCfg } from "../util/ResConfig"

export class AnimationMgr {
    public animation: cc.Animation = null
    public nodeAnim: cc.Node = null
    public sprAnim: cc.Sprite = null
    public anim = null
    
    private repeatCount = null
    private animName: string = ""
    private animPlay = "anim"
    private onFinishedCallBack: Function = null

    public constructor(nodeParent, animName: string, repeatCount: number = null, isGroup: boolean = false, dstBlend = null) {
        let self = this

        this.animName = animName
        this.repeatCount = repeatCount

        this.nodeAnim = new cc.Node()
        nodeParent.addChild(this.nodeAnim)

        this.animation = this.nodeAnim.addComponent(cc.Animation) 
        this.sprAnim = this.nodeAnim.addComponent(cc.Sprite)
        if (dstBlend) {
            this.sprAnim.dstBlendFactor = 0
        }

        ResCfg.loadAnimPlist(this, animName, function (self, atlas, plistName) {
            if (cc.isValid(self.sprAnim)) {
                self.sprAnim.spriteFrame = atlas.getSpriteFrame("1")
            }
            
            return self.nodeAnim
        }, false)
    }

    play(onFinishedCallBack: Function = null) {
        this.onFinishedCallBack = onFinishedCallBack

        ResCfg.loadAnim(this, this.animName, function (self, clip) {
            if (cc.isValid(self.animation)) {
                self.animation.addClip(clip, self.animPlay)
                clip.wrapMode = cc.WrapMode.Loop
                
                self.anim = self.animation.play(self.animPlay)
                if (self.repeatCount) {
                    self.anim.repeatCount = self.repeatCount
                }
    
                self.animation.on('finished', self.onFinished, self)
            }
        })
    }

    stop() {
        let self = this
        if (cc.isValid(self.animation)) {
            this.animation.stop(this.animPlay)
            ResCfg.loadAnimPlist(this, this.animName, function (self, atlas, plistName) {
                if (cc.isValid(self.sprAnim)) {
                    self.sprAnim.spriteFrame = atlas.getSpriteFrame("1")
                }
            }, false)
        }
    }

    private onFinished() {
        if (! this.onFinishedCallBack) {
            this.destructor()
        }
    }

    public destructor() {
        this.animation.off('finished', this.onFinished, this)

        if (cc.isValid(this.nodeAnim)) {
            this.nodeAnim.destroy()
        }
    }

}