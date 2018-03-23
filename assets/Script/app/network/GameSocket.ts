import { FuncUtil } from "../common/util/FuncUtil"

export default class GameSocket {
    public socket: WebSocket = null;
    public isOpen: boolean = null;

    private len: number = 0;
    private queue = {}

    messageCall: Function = null;
    closeCall: Function = null;
    openCall: Function = null;

    constructor(host: string, openCall: Function = null, messageCall: Function = null, closeCall: Function = null) {
        FuncUtil.log("GameSocket initSocket host: " + host);

        this.socket = new WebSocket(host);
        this.socket.binaryType = "arraybuffer";
        this.socket.onopen = this.open.bind(this);
        this.socket.onmessage = this.message.bind(this);
        this.socket.onerror = this.error.bind(this);
        this.socket.onclose = this.close.bind(this);

        this.messageCall = messageCall;
        this.closeCall = closeCall;
        this.openCall = openCall;
    }

    private open(event) {
        // FuncUtil.log("GameSocket onopen...");
        this.isOpen = true;
        if (this.openCall) {
            this.openCall()
        }
    }

    private message(event) {
        // FuncUtil.log("GameSocket onmessage...");
        if (this.messageCall) {
            let data = event.data
            // FuncUtil.log("data.byteLength: " + data.byteLength)

            let dav1 = new DataView(data, 4, 4)
            let msgID = dav1.getInt32(0)
            let msgData = new Uint8Array(data, 8);
            // FuncUtil.log("testFunc msgID:" + msgID)
            // FuncUtil.log("testFunc msgData:" + msgData)

            this.messageCall(msgID, msgData);
        }
    }

    private error(event) {
        // FuncUtil.log("GameSocket onerror...");
        // ////////////cc.log(event)
    }

    private close(event) {
        FuncUtil.log("GameSocket onclose...");
        ////////////cc.log(event)

        if (this.closeCall) {
            this.closeCall()
        }

        this.isOpen = false;
        this.socket = null;
    }

    public send(msgId, msgData, callBack) {
        // FuncUtil.log("GameSocket send begin");

        if (!this.isOpen) {
            FuncUtil.log('GameSocket is not inited...');
        } else if (this.socket.readyState == WebSocket.OPEN) {
            // FuncUtil.log('GameSocket send:' + msgId);
            // FuncUtil.log('GameSocket send:' + msgData);

            let needLen = msgData.byteLength + 4
            let buffer = new ArrayBuffer(needLen)
            if (buffer.byteLength === needLen) {
                let dav1 = new DataView(buffer, 0, 4)
                dav1.setInt32(0, msgId)

                let dav2 = new Int8Array(buffer, 4)
                for (let i = 0; i < msgData.byteLength; i++) {
                    dav2[i] = msgData[i];
                }

                this.socket.send(buffer);
            }
        } else {
            FuncUtil.log('GameSocket WebSocket readState: ' + this.socket.readyState);
        }
    }

    public closeSocket() {
        // FuncUtil.log("GameSocket closeSocket begin");
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}