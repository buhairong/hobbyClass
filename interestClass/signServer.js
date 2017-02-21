/**
 * Created by Administrator on 2017-02-10.
 */

var bodyParser=require("body-parser");
var fs=require("fs");

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    var jsonFile="public/data/sign.json";//报名JSON文件路径
    var jsonObj=[];
    //写入报名信息
    app.post("/doSignUp",function(request,response){
        var signInfo={
            userId:request.body.userId,
            childNk:request.body.childNk,
            childAge:request.body.childAge,
            classId:request.body.classId,
            signDate:new Date()
        };
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
            for(var i=0;i<jsonObj.length;i++){
                if(jsonObj[i].classId==request.body.classId && jsonObj[i].childNk==request.body.childNk){
                    response.send(signInfo.childNk+"宝贝已报名过此课程！");
                    return;
                };
            };
        };
        jsonObj.push(signInfo);
        fs.writeFileSync(jsonFile,JSON.stringify(jsonObj,null,4));
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


    //搜索报名信息
    app.get("/doSearchSign",function(request,response){
        //如果JSON文件内已经存在数据，进行JSON格式解析
        if(fs.readFileSync(jsonFile)!=""){
            jsonObj=JSON.parse(fs.readFileSync(jsonFile));
        };
        var hobbyJson=JSON.parse(fs.readFileSync("public/data/hobby.json"));
        var classJson=JSON.parse(fs.readFileSync("public/data/class.json"));

        var userId=request.query.userId;
        var signDate=[];

        for(var i=0;i<jsonObj.length;i++){
            if(userId==jsonObj[i].userId){
                for(var j=0;j<classJson.length;j++){
                    if(jsonObj[i].classId==classJson[j].classId){
                        for(var k=0;k<hobbyJson.length;k++){
                            if(classJson[j].hobbyId==hobbyJson[k].hobbyId){
                                signDate.push({
                                    childNk:jsonObj[i].childNk,
                                    childAge:jsonObj[i].childAge,
                                    signDate:jsonObj[i].signDate,
                                    startDate:classJson[j].startDate,
                                    title:hobbyJson[k].title,
                                    price:hobbyJson[k].price,
                                    time:hobbyJson[k].time
                                 });
                            };
                        };
                    };
                };
            };
        };
        response.json(signDate);
    });
};