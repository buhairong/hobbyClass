/**
 * Created by Administrator on 2017-01-20.
 */

//注册控制器
myapp.controller("registerCtrl",function($scope,$state,$http,userData){
    //验证注册账号是否已经存在
    $scope.validLoginId=function(){
        $scope.idErr=false;
        if($scope.loginId && userData.validRegisterId($scope.loginId)){
            $scope.idErr=true;
        };
    };
    //验证两次输入密码是否一致
    $scope.validPsd=function(){
        $scope.psdErr=false;
        if($scope.password && $scope.againPsd && $scope.password!=$scope.againPsd){
            $scope.psdErr=true;
        }
    };
    //注册
    $scope.register=function(){
        $http.post("/doRegister",{userId:$scope.loginId,userNk:$scope.nk,userPsd:$scope.password,root:100})
            .success(function(){
                userData.register($scope.loginId,$scope.nk,100);
                if(sessionStorage.stateGo){
                    $state.go(sessionStorage.stateGo);
                }else{
                    $state.go("interestClassList");
                };
            });
    };
});