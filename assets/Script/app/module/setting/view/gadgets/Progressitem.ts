import { SettingModel } from "../../model/SettingModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Progressitem extends cc.Component {

    @property(cc.Slider)
    slider_h: cc.Slider = null;
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    
    onLoad() {
        let prog = 1
        if (this.node.name == "sliderItemEffect") {
            prog = cc.sys.localStorage.getItem("EFFECT_VOLUME") || 0.5
        } else if (this.node.name == "sliderItemMusic") {
            prog = cc.sys.localStorage.getItem("MUSIC_VOLUME") || 0.5
        }

        this.slider_h.progress = prog
        this.updateView(prog)
    }

    updateView(prog) {
        this.progressBar.progress = prog
    }

    _updateMusicVolume(prog) {
        //////////cc.log(prog)

        this.updateView(prog)
    }

    onSliderHEvent(sender, customData) {
        this._updateMusicVolume(sender.progress)

        if (customData == "music") {
            SettingModel.instance.setMusicVolume (sender.progress)
        } else {
            SettingModel.instance.setEffectsVolume(sender.progress)
        }
    }
}
