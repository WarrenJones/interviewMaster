import config from "../../config";
import RPCClient = require("@alicloud/pop-core");
export const getToken = () => {
    const client = new RPCClient({
        accessKeyId: config.ALI_ACCESS_KEY,
        accessKeySecret: config.ALI_ACCESS_KEY_SECRET,
        endpoint: 'http://nls-meta.cn-shanghai.aliyuncs.com',
        apiVersion: '2019-02-28'
    });

    client.request('CreateToken', {}).then((result: any) => {
        console.log(result.Token)
        console.log("token = " + result.Token.Id)
        console.log("expireTime = " + result.Token.ExpireTime)
    });
}