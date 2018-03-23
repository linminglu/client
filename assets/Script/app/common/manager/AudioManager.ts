
export class AudioManager {
    public static instance: AudioManager = new AudioManager()

    private effectArr = {}

    private musicPath: string = null
    private effectPath: string = null

    private musicId: number = null
    private effectId: number = null

    private musicVolume: number = 0
    private effectVolume: number = 0

    private openMusic: boolean = false
    private openEffect: boolean = false

    private constructor() {
        this.musicVolume = Number(cc.sys.localStorage.getItem("MUSIC_VOLUME") || 0.5)
        this.effectVolume = Number(cc.sys.localStorage.getItem("EFFECT_VOLUME") || 0.5)

        this.openMusic = (cc.sys.localStorage.getItem("MUSIC_OPEN") || 1) == 1
        this.openEffect = (cc.sys.localStorage.getItem("EFFECT_OPEN") || 1) == 1
    }

    private isOpenMusic(): boolean {
        return this.openMusic
    }

    private isOpenEffect(): boolean {
        return this.openEffect
    }

    public setOpenMusic(openMusic: boolean) {
        this.openMusic = openMusic
        //////////cc.log(openMusic)
        if (openMusic) {
            //////////cc.log(this.musicPath)
            if (this.musicPath) {
                this.playMusic(this.musicPath)
            }
        } else {
            //////////cc.log(this.musicId)
            this.stopMusic()
        }
    }

    public setOpenEffect(openEffect: boolean) {
        this.openEffect = openEffect
        
        if (openEffect) {
            if (this.effectPath) {
                this.playEffect(this.effectPath)
            }
        } else {
            this.stopEffect()
        }
    }

    private play(musicPath: string, loop: boolean = false, volume: number = 1): number {
        //cc.log("volume: ", volume)
        return cc.audioEngine.play(musicPath, loop, volume)
    }

    private stop(audioId: number) {
        //cc.log("stop audioId: ", audioId)
        if (audioId != null) {
            cc.audioEngine.stop(audioId)
        }
    }

    public setMusicVolume(volume: number = 1) {
        this.musicVolume = Number(volume)
        ////cc.log("setMusicVolume: ", volume)
        if (this.musicId != null) {
            cc.audioEngine.setVolume(this.musicId, this.musicVolume)
        }
    }

    public stopMusic() {
        this.stop(this.musicId)
        this.musicId = null
    }

    public playMusic(musicName: string, loop: boolean = true) {
        if (this.musicId != null) {
            this.stop(this.musicId)
        }
        
        let musicPath = cc.url.raw(`resources/audio/bgm/${musicName}.mp3`)
        this.musicPath = musicName
        if (this.openMusic) {
            this.musicId = this.play(musicPath, loop, this.musicVolume)
            cc.audioEngine.setVolume(this.musicId, this.musicVolume)
        }
    }

    public setEffectVolume(volume: number = 1) {
        this.effectVolume = Number(volume)
        ////cc.log("setEffectVolume: ", volume)
        if (this.effectId != null) {
            cc.audioEngine.setVolume(this.effectId, this.effectVolume)
        }
    }

    public stopEffect() {
        this.stop(this.effectId)
        this.effectId = null
    }

    public playEffect(effectName: string, loop: boolean = false) {
        let effectPath = cc.url.raw(`resources/audio/effect/${effectName}.mp3`)
        this.effectPath = effectName
        if (this.openEffect) {
            this.effectId = this.play(effectPath, loop, this.effectVolume)
            cc.audioEngine.setVolume(this.effectId, this.effectVolume)
        }
    }

}