import config from "../../config";
import RPCClient = require("@alicloud/pop-core");
export async function getToken() {
    const client = new RPCClient({
        accessKeyId: config.ALI_ACCESS_KEY,
        accessKeySecret: config.ALI_ACCESS_KEY_SECRET,
        endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
        apiVersion: '2019-02-28'
    });

    const result: any = await client.request('CreateToken', {});
    console.log(result.Token)
    return result.Token.Id;
}