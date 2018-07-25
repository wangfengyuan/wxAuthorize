let express = require("express");
const https = require('https');

let app = express();

//appID
let appID = `wxec6fa9e9bc03d885`;
//appsecret
let appSerect = `4c8a0d14cff08959b4e17334cabf9cf0`;
//点击授权后重定向url地址
let redirectUrl = `/auth`;
let host = `http://127.0.0.1:3000`;
//微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
    `${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

app.get("/index", function(req, res) {
    res.writeHead(302, {
        'Location': authorizeUrl
    });
    res.end();
});

var user = '';
app.get("/auth", function(req, res) {
    let code = req.query.code;
    let getaccess = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` +
        `${appID}&secret=${appSerect}&code=${code}&grant_type=authorization_code`;
    //通过拿到的code和appID、app_serect获取access_token和open_id
    https.get(getaccess, (resText) => {
        var ddd = "";
        resText.on('data', (d) => {
            ddd += d;
        });
        resText.on('end', () => {
            // console.log(ddd);
            var obj = JSON.parse(ddd);
            var access_token = obj.access_token;
            var open_id = obj.openid;
            //通过上一步获取的access_token和open_id获取userInfo即用户信息
            let getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`;
            https.get(getUserUrl, (resText) => {
                user = "";
                resText.on('data', (d) => {
                    user += d;
                });
                resText.on('end', () => {
                    console.log(user);
                    var userobj = JSON.parse(user);
                    res.send(userobj);
                    console.log(userobj);
                });

            })
        });

    }).on('error', (e) => {
        console.error(e);
    });
    // res.end();
});


app.listen(3000);