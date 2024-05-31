import config from "../../config";
import RPCClient = require("@alicloud/pop-core");
import Nls from 'alibabacloud-nls';
import type { IpcMainEvent } from "electron"

let speechTranscription: {
    sendAudio(arg0: Buffer): unknown;
    on(arg0: string, arg1: (msg: any) => void): unknown; start: (arg0: any, arg1: boolean) => void; defaultStartParams: () => any;
};
const initSpeechTranscription = async (token: string) => {

    console.log('before init SpeechTranscription')
    speechTranscription = new Nls.SpeechTranscription({
        url: "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",
        appkey: config.ALI_NLS_APP_KEY,
        token
    })

    try {
        await speechTranscription.start(speechTranscription.defaultStartParams(), true)
    } catch (error) {
        console.log("error on start:", error)
    }
    speechTranscription.start(speechTranscription.defaultStartParams(), true)
    console.log('after start')
    speechTranscription.on("started", (msg) => {
        console.log("Client recv started:", msg)
    })

    speechTranscription.on("changed", (msg) => {
        console.log("Client recv changed:", msg)
    })

    speechTranscription.on("completed", (msg) => {
        console.log("Client recv completed:", msg)
    })

    speechTranscription.on("closed", () => {
        console.log("Client recv closed")
    })

    speechTranscription.on("failed", (msg) => {
        console.log("Client recv failed:", msg)
    })

    speechTranscription.on("begin", (msg) => {
        console.log("Client recv begin:", msg)
    })

    speechTranscription.on("end", (msg) => {
        console.log("Client recv end:", msg)
    })
}

export async function getToken() {
    const client = new RPCClient({
        accessKeyId: config.ALI_ACCESS_KEY,
        accessKeySecret: config.ALI_ACCESS_KEY_SECRET,
        endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
        apiVersion: '2019-02-28'
    });

    const result: any = await client.request('CreateToken', {});
    await initSpeechTranscription(result.Token.Id)
    console.log(result.Token)

    return result.Token.Id;
}

export async function voiceToText(event: IpcMainEvent, base64String: string) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    console.log('testtttt', binaryString);
    try {
        if (!speechTranscription.sendAudio(Buffer.from(bytes))) {
            throw new Error("send audio failed")
        }
    } catch (err) {
        console.log('voiceToText err', err)
    }

}