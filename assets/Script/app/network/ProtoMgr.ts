import GameSocket from "./GameSocket"
import { FuncUtil } from "../common/util/FuncUtil"

export default class ProtoMgr {
    private static protoCache: Object = {};

    public static createProtoBuf(proto, msg, data) {
        var msg_class = proto.lookupType(msg);
        var message = msg_class.create(data);
        var body = msg_class.encode(message).finish();
        return body;
    }

    public static parseProtoBuf(proto, msg, data) {
        var msg_class = proto.lookupType(msg);
        var body = msg_class.decode(data);
        return body;
    }

    public static getProtoPath(name: string) {
        let protoPath = `resources/proto/${name}.proto`;
        return cc.url.raw(protoPath);
    }

    public static getProto(context, protoName: string, callBack: Function) {
        if (ProtoMgr.protoCache[protoName]) {
            callBack(ProtoMgr.protoCache[protoName]);
        } else {
            // //////cc.log("protoName: ", protoName)
            let protoPath = ProtoMgr.getProtoPath(protoName);
            // //////cc.log("protoPath: ", protoPath)
            protobuf.load(protoPath, function (err, proto) {
                if (err) {
                    FuncUtil.log("protobuf.load 读取" + protoPath + "失败");
                    return;
                }

                callBack(context, proto);
            });
        }
    }

    //activitydata.proto, S_SignInInfo
    public static parseMsgData(protoName, msgName, msgData, callBack: Function) {
        ProtoMgr.getProto(this, protoName, function (self, proto) {
            FuncUtil.log(`onData protoName:${protoName},  msgName:${msgName}`)
            let data = ProtoMgr.parseProtoBuf(proto, msgName, msgData);

            callBack(data)
        });
    }

    public static parseSendData(protoName, msgName, msgData, callBack: Function) {
        ProtoMgr.getProto(this, protoName, function (self, proto) {
            FuncUtil.log(`onData protoName:${protoName},  msgName:${msgName}`)
            let data = ProtoMgr.createProtoBuf(proto, msgName, msgData);

            callBack(data)
        });
    }
}