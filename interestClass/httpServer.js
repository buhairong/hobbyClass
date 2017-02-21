/**
 * Created by Administrator on 2017/1/24.
 */

var http=require("http");
var express=require("express");
var app=express();
app.use(express.static("public"));

//调用 userServer 用户模块 对用户信息进行增删改查操作
require("./userServer")(app);

//报名模块
require("./signServer")(app);

var httpServer=http.createServer(app);

httpServer.listen(3000,function(){
    console.log("程序正运行在3000端口...");
});
