const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs','utf8');
const login_page = fs.readFileSync('./login.ejs','utf8');
const style_css = fs.readFileSync('./style.css','utf8');

const max_num = 10; //最大保管数
const filename = 'mydata.txt'; //データファイル名
var massage_data;
readFromFile(filename);

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');
//ここまでメインプログラム==============

//createServerの処理
function getFromClient(request,response){

    var url_parts = url.parse(request,url,true);
    switch(url_parts.pathname){

        case './' ://トップページ
            response_index(request,response);
            break;

        case './login': //ログインページ
            response_login(request,response);
            break;

        case 'style.css':
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(content);
            response.end();
            break;
            
        default:
            response.writeHead(200,{'Content-Type':'text/plain'});
            response.end('no page ...');
            break;

    }
}
//loginのアクセス処理
function response_login(request,response){
    var content = ejs.render(login_page,{});
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
}
