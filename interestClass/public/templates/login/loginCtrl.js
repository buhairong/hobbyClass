/**
 * Created by hxsd on 2017/1/18.
 */

//登录控制器
myapp.controller("loginCtrl",function($scope,$state,userData){
    $scope.hasError=false;
    //验证登录账号密码
    $scope.login=function(){
        if(userData.validLogin($scope.loginId,$scope.userPsd)){
            if(sessionStorage.stateGo){
                $state.go(sessionStorage.stateGo);
            }else{
                $state.go("interestClassList");
            };
        }else{
            $scope.hasError=true;
        };
    };
});