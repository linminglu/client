import { FuncUtil } from "../common/util/FuncUtil"
import { FactoryUtil } from "../common/util/FactoryUtil"
import { GameParam } from "../../GameConfig"

const loginKey = "QYQDGAMEDshEFWOKE7Y6GAEDE-WAN-0668-2625-7DGAMESZEFovDDe777"
// const ipPort = "192.168.1.20:8000"
// const ipPort = "192.168.1.22:8000"

const defIp = "192.168.0.211"
const defPort = 8000

const outDefIp = "47.75.6.136"
const outDefPort = 8000

export default class HttpRequestMgr {

    public static instance: HttpRequestMgr = null;
    private xmlHttp: XMLHttpRequest = null;


    private constructor() {
        if(this.xmlHttp == null){
            this.xmlHttp = new XMLHttpRequest();
        }
    }

    public static getInstance() {
        if(this.instance == null){
            return new HttpRequestMgr()
        }else{
            return this.instance
        }
    }
  
    netObj = {
        ip: defIp,
        port: defPort
    }

    private getIpPort() {
        if (GameParam.isOutServer) {
            this.netObj = {
                ip: outDefIp,
                port: outDefPort
            }

            if (cc.sys.isBrowser) {
                this.netObj = FuncUtil.parseIpPort(this.netObj.ip, this.netObj.port);
            }
        }
        return this.netObj
    }

    public xmlHttpRequestLogin(userName, passWord, tourist, time, callBack: Function, timeOutCallBack: Function = null) {
        this.netObj = this.getIpPort()

        let self = this

        let sign = md5(userName + passWord + tourist + time + loginKey)
        let url = `http://${this.netObj.ip}:${this.netObj.port}/login?userName=${userName}&passWord=${passWord}&tourist=${tourist}&time=${time}&sign=${sign}`
        //////cc.log("url: ", url)

        this.xmlHttp.onreadystatechange = function () {
            // //////cc.log("readyState ", self.xmlHttp.readyState)
            // //////cc.log("status ", self.xmlHttp.status)
            if (self.xmlHttp.readyState == 4 && (self.xmlHttp.status >= 200 && self.xmlHttp.status < 400)) {
                var response = self.xmlHttp.responseText;
                callBack(response)
            }
        };

        // this.xmlHttp.responseType = "text"
        this.xmlHttp.open("POST", url, true);        //POST GET
        // this.xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        this.xmlHttp.send();
        this.xmlHttp.timeout = 8000;
        this.xmlHttp.ontimeout = timeOutCallBack();
        // new File()
        // let reader = new FileReader()
        // new Blob()

        // const blob = new Blob([res],{type:"audio/mp3"})
        // const blobUrl = URL.createObjectURL(blob);
        // const audio = new Audio(blobUrl);
        // audio.play();
        // new FormData()
    }


}