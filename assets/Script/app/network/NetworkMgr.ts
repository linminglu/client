import GameSocket from "./GameSocket"
import ProtoMgr from "./ProtoMgr"
import { ProtoConfig, MessageConfig } from "../config/ProtoConfig"
import { Observer } from "../common/util/Observer";

import { EmitterManager as Emitter } from "../common/manager/EmitterManager";
import { EmitterCfg } from "../../app/config/EmitterConfig"

import { FuncUtil } from "../common/util/FuncUtil"
import { GameParam } from "../../GameConfig"
import { SimulateNet } from "../../app/module/test/SimulateNet"

import { DayinModel } from "../module/dayin/model/DayinModel"

export default class NetworkMgr {
    public static instance: NetworkMgr = new NetworkMgr();

    private socket: GameSocket = null;
    private static listeners: Object = {};

    private url: string = null;

    register(name: string, callback: Function, context: any) {
        // //////cc.log(`NetworkMgr register ${name}`);
        let observers: Observer[] = NetworkMgr.listeners[name];
        if (!observers) {
            NetworkMgr.listeners[name] = [];
        }

        NetworkMgr.listeners[name].push(new Observer(callback, context, name));
    }

    connectNet(host: string, port: number | string) {
        let url = `${host}:${port}/ws`
        this.url = url;
        FuncUtil.log(url);

        this.socket = new GameSocket(this.url, this.onOpen, this.onData, this.onClose);
    }

    reConnectNet() {
        if (this.url) {
            this.socket = new GameSocket(this.url, this.onOpen, this.onData, this.onClose);
        }
    }

    closeNet() {
        if (this.socket) {
            this.socket.closeSocket()
            this.socket = null
        }
    }

    onOpen() {
        Emitter.fire(EmitterCfg.LOGIN_SEND_LOGIN_SERVER, true);
    }

    onClose() {
        if (this.socket) {
            Emitter.fire(EmitterCfg.GLOBAL_NET_WORK_CLOSED, true)
            this.socket = null
        }
    }

    onData(msgID: number, msgData) {
        let newDate = new Date()
        FuncUtil.log("++++++++++++++++++++++++++ " + newDate.toLocaleString() + " onData 收到数据msgID: " + msgID + " ++++++++++++++++++++++++++")
        let msgName = MessageConfig[msgID]
        let protoName = ProtoConfig[msgName]
        ProtoMgr.getProto(this, protoName, function (self, proto) {
            FuncUtil.log(`onData protoName:${protoName},  msgName:${msgName}`)
            let data = ProtoMgr.parseProtoBuf(proto, msgName, msgData);

            if (CC_DEBUG) {
                if (cc.sys.isNative) {
                    // FuncUtil.log(FuncUtil.printObj(data))
                } else {
                    FuncUtil.log(data)
                }
                // DayinModel.instance.setLogList(`${msgName}\n${FuncUtil.printObj(data)}`)
            }

            let observers: Observer[] = NetworkMgr.listeners[msgName];
            if (!observers) {
                FuncUtil.log(`没有监听协议:${protoName} ${msgName} ${msgID}`)
                return;
            }

            let length = observers.length;
            for (let i = 0; i < length; i++) {
                let observer = observers[i];
                observer.notify(data);
            }
        });
    }

    sendData(msgName: string, data: Object, callBack: Function = null) {
        let newDate = new Date()
        FuncUtil.log("++++++++++++++++++++++++++ " + newDate.toLocaleString() + " sendData 发送数据msgName: " + msgName + " ++++++++++++++++++++++++++")
        if (this.socket) {
            let protoName = ProtoConfig[msgName]
            // FuncUtil.log(`sendData protoName:${protoName},  msgName:${msgName}`)
            ProtoMgr.getProto(this, protoName, function (self, proto) {
                let msgData = ProtoMgr.createProtoBuf(proto, msgName, data);
                let log = ProtoMgr.parseProtoBuf(proto, msgName, msgData)

                if (CC_DEBUG) {
                    if (cc.sys.isNative) {
                        // FuncUtil.log(FuncUtil.printObj(log))
                    } else {
                        FuncUtil.log(log)
                    }
                    // DayinModel.instance.setLogList(`${msgName}\n${FuncUtil.printObj(log)}`)
                }

                if (self.socket) {
                    self.socket.send(MessageConfig[msgName], msgData, callBack);
                }

                if (GameParam.isSimulateNet && callBack) {
                    FuncUtil.delayFunc(function () {
                        callBack()
                    }, 2)
                }
            });
        }
    }

    simulateData(msgName: string, data: Object = null) {
        if (!GameParam.isSimulateNet) {
            return
        }

        FuncUtil.log("======autoData 发送数据msgName:" + msgName)
        if (!data) {
            data = SimulateNet[msgName]
            if (!data) {
                FuncUtil.log(`simulateData SimulateNet.${msgName} is null`);
                return
            }
        }

        if (this.socket) {
            let protoName = ProtoConfig[msgName]
            FuncUtil.log(`simulateData protoName:${protoName},  msgName:${msgName}`)
            ProtoMgr.getProto(this, protoName, function (self, proto) {
                let msgData = ProtoMgr.createProtoBuf(proto, msgName, data);
                FuncUtil.log(msgData)

                self.onData(MessageConfig[msgName], msgData);
            });
        }
    }
}