
import {BaseModel} from "../../../common/baseui/BaseModel"
import {AudioManager} from "../../../common/manager/AudioManager"

export class SettingModel extends BaseModel {
    public musicVolume: number = 0
    public effectsVolume: number = 0
    public openMusic: number = 1
    public openEffect: number = 1

    public setMusicVolume(musicVolume: number) {
        this.musicVolume = musicVolume
        AudioManager.instance.setMusicVolume(musicVolume)

        cc.sys.localStorage.setItem("MUSIC_VOLUME", this.musicVolume)
    }

    public setEffectsVolume(effectsVolume: number) {
        this.effectsVolume = effectsVolume
        AudioManager.instance.setEffectVolume(effectsVolume)

        cc.sys.localStorage.setItem("EFFECT_VOLUME", this.effectsVolume)
    }

    public setOpenMusic(music: boolean) {
        //////////cc.log(music)
        let openMusic = 0
        if (music) {
            openMusic = 1
        }
        this.openMusic = openMusic
        AudioManager.instance.setOpenMusic(openMusic == 1)

        cc.sys.localStorage.setItem("MUSIC_OPEN", this.openMusic)
    }

    public setOpenEffect(effect: boolean) {
        //////////cc.log(effect)
        let openEffect = 0
        if (effect) {
            openEffect = 1
        }
        this.openEffect = openEffect
        AudioManager.instance.setOpenEffect(openEffect == 1)

        cc.sys.localStorage.setItem("EFFECT_OPEN", this.openEffect)
    }

    destructor() {
        super.destructor();
        SettingModel.instance = null;
    }

    public static instance: SettingModel = new SettingModel()

    private constructor() {
        super();
    }
}