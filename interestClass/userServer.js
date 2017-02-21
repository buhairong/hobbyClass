/**
 * Created by Administrator on 2017/1/24.
 */

/*
    root权限：0：系统管理员，分配管理员权限，允许网站数据全部操作
              1:网站管理员，允许网站数据全部操作
            100：普通用户

*/
var bodyParser=require("body-parser");
var fs=require("fs");

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    var jsonFile="public/data/user.json";//用户信息JSON文件路径
    var logFile="public/data/log.txt";//日志文件路径
    var jsonObj=[];
    //写入注册信息
    app.post("/doRegister",function(request,response){
        var newUser={
            userId:request.body.userId,
            userPsd:request.body.userPsd,
            userNk:request.body.userNk,
            regDate:new Date(),
            root:request.body.root
        };
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].userId==request.body.userId){
                    return;
                };
            };
        };
        var log=new Date()+":"+request.body.userId+",register!\n";
        jsonObj.push(newUser);
        fs.writeFileSync(jsonFile,JSON.stringify(jsonObj,null,4));
        fs.appendFileSync(logFile,log);
        response.send();
    });

    //删除用户
    app.get("/doDelUser",function(request,response){
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
        };
        var userId=request.query.userId;
        for(var i=0;i<jsonObj.length;i++){
            if(userId==jsonObj[i].userId){
                jsonObj.splice(i,1);
                break;
            };
        };
        fs.writeFileSync(jsonFile,JSON.stringify(jsonObj,null,4));
        response.send();
    });

    //更新用户信息
    app.post("/doUpdateUser",function(request,response){
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
        };
        var userId=request.body.userId;
        var userPsd=request.body.userPsd;
        var userNk=request.body.userNk;
        var root=request.body.root;
        for(var i=0;i<jsonObj.length;i++){
            if(userId==jsonObj[i].userId){
                if(userPsd) jsonObj[i].userPsd=userPsd;
                if(userNk) jsonObj[i].userNk=userNk;
                if(root) jsonObj[i].root=root;
                break;
            };
        };
        fs.writeFileSync(jsonFile,JSON.stringify(jsonObj,null,4));
        response.send();
    });


    //搜索用户
    app.get("/doSearchUsers",function(request,response){
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
        };
        var searchUsers=[];
        var userId=request.query.userId;
        var userNk=request.query.userNk;
        var root=request.query.root;
        var currentPage=request.query.currentPage;
        var pageSize=request.query.pageSize;
        var startIndex=(currentPage-1)*pageSize;

         //按条件搜索用户
        if(userId){
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].userId.indexOf(userId)!=-1){
                    searchUsers.push(jsonObj[i]);
                };
            };
            jsonObj=searchUsers;
            searchUsers=[];
        };

        if(userNk){
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].userNk.indexOf(userNk)!=-1){
                    searchUsers.push(jsonObj[i]);
                };
            };
            jsonObj=searchUsers;
            searchUsers=[];
        };

        if(root){
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].root==root){
                    searchUsers.push(jsonObj[i]);
                };
            };
            jsonObj=searchUsers;
            searchUsers=[];
        };

        //按日期降序排列
        jsonObj.sort(function(a,b){
                return Date.parse(b.regDate)- Date.parse(a.regDate);
            });

       //按权限升序排列
       /* jsonObj.sort(function(a,b){
            return a.root- b.root;
        });*/

        var subUsers=jsonObj.slice(startIndex,(startIndex-0)+(pageSize-0));
        response.json({totalNum:jsonObj.length,data:subUsers});
    });
};