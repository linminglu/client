//import { FactoryUtil } from "./app/common/util/FactoryUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdate extends cc.Component {
    @property(cc.Label)
    load_label: cc.Label = null
    @property(cc.ProgressBar)
    load_progress: cc.ProgressBar = null
    @property(cc.Label)
    versionName: cc.Label = null

    _serverURL: string = "http://192.168.0.210/hotupdate/hall/";
    _storagePath: string = null;
    _manifestLocal: string = null ;
    assetsManager: any = null;
    updateListener = null;
    checkListener = null;
    isUpdating = false;

    manifestLocalData = null;
    customManifestStr = null;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        this.initPath();
        this.initUpdate();
    }

    initPath(){
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'hot';
        cc.log('this._storagePath = ',this._storagePath);
    }

    initUpdate(){
        cc.log("initUpdate>>>>>>>start");
        this.createJSBAssetsManager();
        
        if (cc.sys.isNative) {
            this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+'hot';
            this._manifestLocal = this._storagePath + "/project.manifest";
            if (jsb.fileUtils.isFileExist(this._manifestLocal)) {
                cc.log('_manifestLocal文件存在！');
                let str = jsb.fileUtils.getStringFromFile(this._manifestLocal);
                this.manifestLocalData= JSON.parse(str);
                this.versionName.string = 'v' + this.manifestLocalData.version
                // customManifestStr = JSON.stringify({
                //     "packageUrl":manifestLocalData.packageUrl,
                //     "remoteManifestUrl": manifestLocalData.remoteManifestUrl,
                //     "remoteVersionUrl": manifestLocalData.remoteVersionUrl,
                //     "version": manifestLocalData.version,
                //     "assets": manifestLocalData.assets,
                //     "searchPaths": manifestLocalData.searchPaths,
                // });
                this.assetsManager.loadLocalManifest(this._manifestLocal);
            } else {
                cc.log('_manifestLocal文件不存在！');
                this.versionName.string = 'v1.0.2'
                this.customManifestStr = JSON.stringify({
                    "packageUrl": this._serverURL,
                    "remoteManifestUrl": this._serverURL + "project.manifest",
                    "remoteVersionUrl": this._serverURL + "version.manifest",
                    "version": "1.0.2",
                    "assets": {},
                    "searchPaths": []
                });
                let manifest = new jsb.Manifest(this.customManifestStr, this._storagePath)
                this.assetsManager.loadLocalManifest(manifest, this._storagePath);
            }
            this.load_label.string = "正在更新...";
            this.load_progress.progress = 0;
            
            if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
                cc.log('manifest uninit');
                let manifest = new jsb.Manifest(this.customManifestStr, this._storagePath)
                this.assetsManager.loadLocalManifest(manifest, this._storagePath);
            }else{
                if (jsb.fileUtils.isFileExist(this._manifestLocal)) {
                    cc.log('manifest inited');
                   // let manifest = new jsb.Manifest(this.customManifestStr, this._storagePath)
                    this.assetsManager.loadLocalManifest(this._manifestLocal);
                } else{
                    cc.log('manifest !isFileExist');
                }
            }

            if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
                cc.log('manifest 还没加载好！');
            }else{
                cc.log('manifest 已经加载好了！');
            }
            // this.updateListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.updateListen.bind(this));
            // cc.eventManager.addListener(this.updateListener, 1);

            this.checkListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.checkListen.bind(this));
            cc.eventManager.addListener(this.checkListener, 1);
            this.assetsManager.checkUpdate();

            // this.assetsManager.update();
            // this.isUpdating = true;
        } else {
            //直接加载大厅
            this.node.active = false
        }
        cc.log("initUpdate>>>>>>>end");
    }


    /**初始化大厅加载控制器*/
    createJSBAssetsManager() {
        this.removeListener();
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
        //安卓系统最大线程2，防止线程太多导致错乱或其它异常，如卡顿等！
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.assetsManager.setMaxConcurrentTask(2);
        }
        this.isUpdating = false;
    }

    alertViewCloseCallBack(){

    }

    checkUpdate() {
        this.createJSBAssetsManager();
        let customManifestStr ;
        let data ;
        this._manifestLocal = this._storagePath + "/project.manifest";
        if (jsb.fileUtils.isFileExist(this._manifestLocal)) {
            cc.log('checkUpdate >>> _manifestLocal文件不存在！');
            let str = jsb.fileUtils.getStringFromFile(this._manifestLocal);
            data= JSON.parse(str);
            customManifestStr = JSON.stringify({
                "packageUrl":data.packageUrl,
                "remoteManifestUrl": data.remoteManifestUrl,
                "remoteVersionUrl": data.remoteVersionUrl,
                "version": data.version,
                "assets": data.assets,
                "searchPaths": data.searchPaths,
            });
        }else {
            cc.log('checkUpdate >>> _manifestLocal文件不存在！');
            this.versionName.string = 'v1.0.2'
            customManifestStr = JSON.stringify({
                "packageUrl": this._serverURL,
                "remoteManifestUrl": this._serverURL + "project.manifest",
                "remoteVersionUrl": this._serverURL + "version.manifest",
                "version": "1.0.2",
                "assets": {},
                "searchPaths": []
            });
        }

        if (this.assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
            if (jsb.fileUtils.isFileExist(this._manifestLocal)) {
                console.log('加载本地Manifest');
                this.assetsManager.loadLocalManifest(this._manifestLocal);
            } else {
                console.log('加载网络Manifest');
                let manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                this.assetsManager.loadLocalManifest(manifest, this._storagePath);
            }
        }
        this.checkListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.checkListen.bind(this));
        cc.eventManager.addListener(this.checkListener, 1);
        this.assetsManager.checkUpdate();
        this.isUpdating = true;
    }

    /**检查更新监听*/
    checkListen(event) {
        var self = this ;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('加载失败!');
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('加载失败');
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('已经是最新版本');
                this.node.active = false
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('发现新版本');
                this.updateListener = new jsb.EventListenerAssetsManager(this.assetsManager, this.updateListen.bind(this));
                cc.eventManager.addListener(this.updateListener, 1);
                this.assetsManager.update();
                this.isUpdating = true;

                // FactoryUtil.createAlertConfirmView("发现新版本，点击确定开始更新！",function(){
                //     self.assetsManager.update();
                // })
                
                break;
            default:
                
                return;
        }
        cc.eventManager.removeListener(this.checkListener);
        this.checkListener = null;
        this.isUpdating = false;
    }

    /**加载更新监听*/
    updateListen(event) {

        let failedCount = 0;
        let needRestart = false;
        let failed = false;

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('加载失败 >>> '+ event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let ByFile = event.getPercentByFile();
                let Percent = event.getPercent()
                if (!isNaN(ByFile)) {
                    //百分比
                    let per = Math.ceil(ByFile * 100)
                    this.load_progress.progress = ByFile;
                    // this.load_label.string = "正在加载资源（"+ (per) +"%）";
                    this.load_label.string ='正在更新：'+ (event.getDownloadedBytes() / 1024 / 1024).toFixed(2) + 'MB / ' + (event.getTotalBytes() / 1024 / 1024).toFixed(2) + "MB"
                }
                if (!isNaN(Percent)) {
                    this.load_progress.progress = Percent
                  //  this.loading_lab1.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('加载失败 >>> '+ event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('当前为最新版本!');
                this.node.active = false
                failed = false;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('更新完成!');
                this.load_progress.progress = 1;
                this.load_label.string = "正在加载资源 (100%）";
              //  console.log('v:' + this.assetsManager.getLocalManifest().getVersion())
                //this.versionName.string = 'v:' + this.assetsManager.getLocalManifest().getVersion()
                needRestart = true;
                failed = false;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('加载失败 >>> Update failed: ' + event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('加载失败 >>> Asset update error: ' + event.getAssetId() + ',Message: ' + event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log('加载失败 >>> ',event.getMessage());
                failed = true;
                break;
            default:
                break;
        }

        if (failed) {
            failedCount++;
            if(failedCount<=3){
                //继续加载失败的文件          
                this.assetsManager.downloadFailedAssets();
            }else{
                console.log('加载失败文件失败超过3次！！！');
                return;
            }
        } 
        else {
            if (needRestart) {
                cc.log("needRestart!!!");
              // var searchPaths = this._storagePath;
                var searchPaths = jsb.fileUtils.getSearchPaths();
                var newPaths = this.assetsManager.getLocalManifest().getSearchPaths();
                cc.log('searchPaths=',searchPaths);
                cc.log('newPaths=',newPaths);

                Array.prototype.unshift(searchPaths, newPaths);
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);
                cc.audioEngine.stopAll();
                cc.game.restart();
            }
              
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
            console.log('使用的是旧内存模型,调用retain()方法保证am不会给回收')
            this.assetsManager.release();
        }
        this.assetsManager = null;
        this.isUpdating = false;
    }

    onDestroy() {
       // this.removeListener();
        //this.unschedule(this.updateLoadingScene);
        //this.node.parent.stopAllActions()
    }
}
