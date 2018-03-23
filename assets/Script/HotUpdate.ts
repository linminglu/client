const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpDate extends cc.Component {
    @property(cc.Label)
    loading_lab: cc.Label = null
    @property(cc.Label)
    loading_version: cc.Label = null
    @property(cc.ProgressBar)
    load_progress: cc.ProgressBar = null

    manifestUrl: string = null 
    assetsManager: any = null
    _storagePath: string = null;
    sceneName: string = "hotupdate/hall";
    isUpdating = false;
    updateListener = null;
    checkListener = null;
    step: number = 0
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
      
            if (cc.sys.isNative) {
                //_storagePath是热更新资源下载缓存路径,更新的资源,会存储在这里,这个hotUpdate是自定义的
                this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.sceneName);
                this.manifestUrl = this._storagePath + "/project.manifest";
                if (jsb.fileUtils.isFileExist(this.manifestUrl)) {
                    let s = jsb.fileUtils.getStringFromFile(this.manifestUrl);
                    let data = JSON.parse(s);
                    this.loading_version.string = 'v' + data.version
                } else {
                    this.loading_version.string = 'v' + "1.0.0"
                }
                this.hotUpdate()
      
            } else {
                //直接加载大厅
                this.node.active = false
            }
    }

    removeListener() {
        if (this.updateListener) {
            cc.eventManager.removeListener(this.updateListener);
            this.updateListener = null;
        }
        if (this.checkListener) {
            cc.eventManager.removeListener(this.checkListener);
            this.checkListener = null;
        }
        if (this.assetsManager && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            console.log('使用的是旧内存模型,调用retain方法保证am不会给回收')
            this.assetsManager.release();
        }
        this.assetsManager = null;
        this.isUpdating = false;
    }
    hotUpdate() {
        this.createJSBAssetsManager();
        this.loading_lab.string = "正在更新...";
        this.load_progress.progress = 0;
        this.updateListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.updateCb.bind(this));
        cc.eventManager.addListener(this.updateListener, 1);
        let url = "http://192.168.0.210/" + this.sceneName;
        //自定义一个本地配置，是全部加载子游戏
        let customManifestStr = JSON.stringify({
            "packageUrl": url + "/",
            "remoteManifestUrl": url + "/project.manifest",
            "remoteVersionUrl": url + "/version.manifest",
            "version": "1.0.0",
            "assets": {},
            "searchPaths": []
        });

        if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
            let manifest = new jsb.Manifest(customManifestStr, this._storagePath)
            this.assetsManager.loadLocalManifest(manifest, this._storagePath);
        }
        this.assetsManager.update();
        this.isUpdating = true;
    }
    /**初始化大厅加载控制器*/
    createJSBAssetsManager() {
        this.removeListener();
        //对比版本号
        let versionCompareHandle = function (versionA, versionB) {
            let vA = versionA.split('.');
            let vB = versionB.split('.');
            for (let i = 0; i < vA.length; ++i) {
                let a = parseInt(vA[i]);
                let b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;

                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };
        this.assetsManager = new jsb.AssetsManager('', this._storagePath, versionCompareHandle);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this.assetsManager.retain();
        }
        this.assetsManager.setVerifyCallback(function (path, asset) {
            let compressed = asset.compressed;
            let expectedMD5 = asset.md5;
            let relativePath = asset.path;
            let size = asset.size;
            if (compressed) {
                return true;
            } else {
                return true;
            }
        });
        //安卓系统注意
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.assetsManager.setMaxConcurrentTask(2);
        }
        this.isUpdating = false;
    }
    checkUpdate() {
        this.createJSBAssetsManager();

        var url = "http://192.168.0.210/" + this.sceneName;
        //自定义一个本地配置，是全部加载子游戏
        let remoteManifestUrl = this._storagePath + "/project.manifest";
        this.manifestUrl = remoteManifestUrl;
        var customManifestStr = JSON.stringify({
            "packageUrl": url + "/",
            "remoteManifestUrl": url + "/project.manifest",
            "remoteVersionUrl": url + "/version.manifest",
            "version": "1.0.0",
            "assets": {},
            "searchPaths": []
        });
        if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {

            if (jsb.fileUtils.isFileExist(remoteManifestUrl)) {
                console.log('加载本地Manifest');
                this.assetsManager.loadLocalManifest(this.manifestUrl);
            } else {
                console.log('加载网络Manifest');
                let manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                this.assetsManager.loadLocalManifest(manifest, this._storagePath);
            }
            // var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            // this.assetsManager.loadLocalManifest(manifest, this._storagePath);
        }
        this.checkListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.checkCb.bind(this));
        cc.eventManager.addListener(this.checkListener, 1);
        this.assetsManager.checkUpdate();
        this.isUpdating = true;
    }
    /**检查更新监听*/
    checkCb(event) {
        //console.log('检查更新code: 'event);
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('加载失败');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('加载失败');
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('已经是最新版本');
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('发现新版本');
                break;
            default:
                return;
        }
        cc.eventManager.removeListener(this.checkListener);
        this.checkListener = null;
        this.isUpdating = false;
    }
    /**加载更新监听*/
    updateCb(event) {
        let needRestart = false;
        let failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('加载失败1');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let ByFile = event.getPercentByFile();
                let Percent = event.getPercent()
            
                if (!isNaN(ByFile)) {
                    //百分比
                    let per = Math.ceil(ByFile * 100)
                    this.load_progress.progress = ByFile;
                    // this.loading_lab.string = "正在加载资源（"+ (per) +"%）"; 
                }
                if (!isNaN(Percent)) {
                    this.load_progress.progress = Percent
                    this.loading_lab.string ='正在更新:'+ (event.getDownloadedBytes() / 1024 / 1024).toFixed(2) + 'MB / ' + (event.getTotalBytes() / 1024 / 1024).toFixed(2) + "MB"
            
                   // this.loading_lab.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('加载失败2');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('已经是最新版本了');
                this.node.active = false
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('更新完成');
                this.load_progress.progress = 1;
                this.loading_lab.string = "正在加载资源 (100%）";
                this.loading_version.string = 'v' + this.assetsManager.getLocalManifest().getVersion()
                needRestart = true;
                failed = false;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                //console.log('Update failed. ' + event.getMessage());
                console.log('加载失败3');
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                console.log('加载失败4');
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                //console.log(event.getMessage());
                console.log('加载失败5');
                failed = true;
                break;
            default:

                break;
        }

        if (failed) {
            //继续加载失败的文件
            this.assetsManager.downloadFailedAssets();
        } else {
            if (needRestart) {
                let searchPaths = jsb.fileUtils.getSearchPaths();
                let newPaths = this.assetsManager.getLocalManifest().getSearchPaths();
                console.log(JSON.stringify(newPaths));
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);
                this.removeListener();
                //cc.audioEngine.stopAll();
                cc.game.restart();
            }
        }
    }
    
    onDestroy() {
        this.removeListener();
       
    }
 
}