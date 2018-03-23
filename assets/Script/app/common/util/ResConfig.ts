import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { FuncUtil } from "./FuncUtil"

export class ResConfig {
    private static getPlatformPath(name: string, path: string, isGroup: boolean = false, tag: string = null): string {
        let osPath = "native";
        
        if (isGroup) {
            let gameTag = tag == null ? GameColMgr.instance.getGameTag() : tag;
            return `${osPath}/group_${gameTag}/${path}/${name}`;
        } else {
            return `${osPath}/gameres/${path}/${name}`;
        }
    }

    public static getLayoutComonPath(name: string, isGroup: boolean = false): string {
        return ResConfig.getPlatformPath(name, "layout/comm", isGroup);
    }

    public static getLayoutViewPath(name: string, isGroup: boolean = false): string {
        return ResConfig.getPlatformPath(name, "layout/view", isGroup);
    }

    public static getTexturePath(textureName: string, isGroup: boolean = false, tag: string = null): string {
        return ResConfig.getPlatformPath(textureName, "spritesheet", isGroup, tag);
    }

    public static getAnimPath(animName: string, isGroup: boolean = false): string {
        return ResConfig.getPlatformPath(animName, "animation", isGroup);
    }

    public static getTextureName(textureName: string, name: string): string {
        return `${textureName}-${name}`;
    }

    public static loadPrefab(context, prefabName: string, callBack: Function, isGroup: boolean = false, isComm: boolean = true, data = null) {
        let prefabPath: string = null
        if (isComm) {
            prefabPath = ResConfig.getLayoutComonPath(prefabName, isGroup)
        } else {
            prefabPath = ResConfig.getLayoutViewPath(prefabName, isGroup)
        }
        // ////cc.log(`loadPrefab ${prefabName} begin`)

        cc.loader.loadRes(prefabPath, function (err, prefab) {
            if (err) {
                FuncUtil.log(`loadPrefab ${prefabName} faild`)
                console.error(err.message || err);
                return;
            }
            callBack(context, prefab, data);
        });
    }

    public static loadPlist(context, textureName: string, callBack: Function, isGroup: boolean = false) {
        let texturePath = ResConfig.getTexturePath(textureName, isGroup);
        // ////cc.log(`loadPlist ${texturePath} begin`)

        cc.loader.loadRes(texturePath, cc.Asset, function (err, atlas) {
            if (err) {
                FuncUtil.log(`loadPlist ${textureName} faild`)
                console.error(err.message || err);
                return;
            }

            callBack(context, atlas, textureName);
        });
    }

    //加载 name.plist 图集中的所有 SpriteFrame
    public static loadPlistAll(context, textureName: string, callBack: Function, isGroup: boolean = false) {
        let texturePath = ResConfig.getTexturePath(textureName, isGroup);
        ////cc.log(`loadPlistAll ${texturePath} begin`)
        cc.loader.loadRes(texturePath, cc.Asset, function (err, atlas) {
            if (err) {
                ////cc.log(`loadPlistAll ${texturePath} faild`)
                return
            }

            // cc.textureCache.addUIImage(texturePath)

            callBack(context, atlas)
        })
    }

    public static releasePlist(textureName: string, isGroup: boolean = false, tag: string = null) {
        // //////////cc.log(textureName, isGroup, tag)
        let texturePath = ResConfig.getTexturePath(textureName, isGroup, tag);
        
        // if (cc.sys.isNative) {
        //     cc.textureCache.removeTextureForKey(texturePath)
        // } else {
        //     // //////////cc.log(texturePath)
            // cc.loader.releaseResDir(texturePath)
            // cc.loader.release(texturePath)
        // }
    }

    public static loadAnim(context, animName: string, callBack: Function, isGroup: boolean = false) {
        let animPath = ResConfig.getAnimPath(`${animName}/anim`, isGroup);
        // ////cc.log(`loadAnim ${animPath} begin`)

        cc.loader.loadRes(animPath, function (err, atlas) {                                
            if (err) {
                FuncUtil.log(`loadAnim ${animPath} faild`)
                console.error(err.message || err);
                return;
            }
            
            callBack(context, atlas, animName);
        });
    }

    public static loadAnimPlist(context, animName: string, callBack: Function, isGroup: boolean = false) {
        let texturePath = ResConfig.getAnimPath(`${animName}/ziyuan`, isGroup);
        // ////cc.log(`loadPlist ${texturePath} begin`)
        
        cc.loader.loadRes(texturePath, cc.SpriteAtlas, function (err, atlas) {
            if (err) {
                FuncUtil.log(`loadPlist ${texturePath} faild`)
                console.error(err.message || err);
                return;
            }
            
            callBack(context, atlas);
        });
    }
}