/**
 * Created by hxsd on 2017/1/18.
 */

//兴趣班控制器
myapp.controller("interestClassListCtrl",function($scope,$http,$ionicScrollDelegate){
    $scope.userId=sessionStorage.userId;//用户ID
    $scope.userNk=sessionStorage.userNk;//用户昵称
    $scope.root=sessionStorage.root;//用户权限
    $scope.classes=[];
    $scope.num=5;//一次读取5条数据
    var lastIndex=0;//从上一次读取的数据开始读取下次数据
    $scope.flag=false;
    $scope.onRefresh=false;

    //兴趣班数据
    $scope.loadInterestClass=function(){
        $scope.onRefresh=true;
        $http.get("data/hobby.json")
            .success(function(data){
                $scope.classNum=data.length;
                for(var i=lastIndex;i<lastIndex+$scope.num;i++){
                    if(i==data.length){
                        $scope.flag=true;
                        return;
                    };
                    $scope.classes.push(data[i]);
                };
                lastIndex+=$scope.num;
            })
            .finally(function(){
                $scope.onRefresh=false;
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
    };

    //验证课程是否已经存在
    $scope.validHobbyName=function(){
        $scope.hobbyNameErr=false;
        /*if($scope.newUserId && userData.validRegisterId($scope.newUserId)){
            $scope.idErr=true;
        };*/
    };

    //添加课程
    $scope.addHobby=function(){

    };

    //回到顶部
    $scope.top=function(){
        $ionicScrollDelegate.scrollTop(true);
    };

    //加载第一页数据
    $scope.loadInterestClass();
});
