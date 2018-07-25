let express = require("express");
const https = require('https');
const path = require("path");
let app = express();
app.set('view engine','ejs');
//appID
let appID = `wxec6fa9e9bc03d885`;
//appsecret
let appSerect = `4c8a0d14cff08959b4e17334cabf9cf0`;
//点击授权后重定向url地址
let redirectUrl = `/getUserInfo`;
let host = `http://127.0.0.1:8800`;
//微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
    `${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

app.get("/login", function(req, res) {
    res.sendFile(path.resolve(__dirname,'login.html'));
});

app.get("/auth", function(req, res) {
    res.writeHead(302, {
        'Location': authorizeUrl
    });
    res.end();
});

app.get("/getUserInfo", function(req, res) {
    wxAuth(req, res);
});
async function wxAuth(req, res) {
    //解析querystring获取URL中的code值
    let code = req.query.code;
    //通过拿到的code和appID、app_serect获取返回信息
    let resObj = await getAccessToken(code);
    //解析得到access_token和open_id
    let access_token = resObj.access_token;
    let open_id = resObj.openid;
    //通过上一步获取的access_token和open_id获取userInfo即用户信息
    let userObj = await getUserInfo(access_token, open_id);
    console.log(userObj);
    res.render(path.resolve(__dirname,'userInfo.ejs'), {userObj: userObj});
    // res.send(userObj);
}


//通过拿到的code和appID、app_serect获取access_token和open_id
function getAccessToken(code) {
    return new Promise( (resolve, reject) => {
        let getAccessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` +
            `${appID}&secret=${appSerect}&code=${code}&grant_type=authorization_code`;
        https.get(getAccessUrl, (res) => {
            var resText = "";
            res.on('data', (d) => {
                resText += d;
            });
            res.on('end', () => {
                var resObj = JSON.parse(resText);
                resolve(resObj);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    });
    
}

//通过上一步获取的access_token和open_id获取userInfo即用户信息
function getUserInfo(access_token, open_id) {
    return new Promise( (resolve, reject) => {
        let getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`;
        https.get(getUserUrl, (res) => {
            var resText = "";
            res.on('data', (d) => {
                resText += d;
            });
            res.on('end', () => {
                var userObj = JSON.parse(resText);
                resolve(userObj);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    })
}

app.listen(8800);