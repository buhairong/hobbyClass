/**
 * Created by Administrator on 2017/1/22.
 */

//最近开班控制器
myapp.controller("newClassCtrl", function ($scope,$http,$ionicScrollDelegate) {
    $scope.newClass=[];//用于存储最近开班的信息
    var date = new Date();
    var nowDate = date.getFullYear()+"年"+(date.getMonth>8?(date.getMonth()+1):("0"+(date.getMonth()+1)))+"月"+(date.getDate()>9?date.getDate():("0"+date.getDate()))+"日";
    $scope.num=5;//一次读取5条数据
    var lastIndex=0;//从上一次读取的数据开始读取下次数据
    $scope.flag=false;
    $scope.onRefresh=false;

    //下拉刷新
    $scope.doRefresh=function(){
        $scope.getClass();
    };

    //读取最近开班的信息
    $scope.getClass=function(){
        $http.get("data/class.json")
            .success(function(data){
                angular.forEach(data,function(classData){
                    if(classData.startDate>nowDate){
                        var hobby= $scope.getHobby(classData.hobbyId);
                        $scope.newClass.push({classId:classData.classId,hobby:hobby,startDate:classData.startDate});
                    };
                });
            })
            .finally(function(){
                $scope.broadcast("scroll.infiniteScrollComplete");
            });
    };

    //读取兴趣班的信息
    $scope.getHobby=function(hobbyId){
        var hobby={};
        $http.get("data/hobby.json")
            .success(function(data){
                angular.forEach(data,function(classData){
                    if(classData.hobbyId==hobbyId){
                        hobby.title=classData.title;
                        hobby.price=classData.price;
                        hobby.time=classData.time;
                        hobby.imgsrc=classData.imgsrc;
                        hobby.desc=classData.desc;
                    };
                });
            });
        return hobby;
    };

    //报名
    $scope.signUp=function(signClass){
        sessionStorage.signClass=JSON.stringify(signClass);
        $scope.checkLogin('signUp');
    };

    //回到顶部
    $scope.top=function(){
        $ionicScrollDelegate.scrollTop(true);
    };

    $scope.getClass();//加载第一次数据
});