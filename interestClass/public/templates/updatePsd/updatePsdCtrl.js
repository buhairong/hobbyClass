/**
 * Created by Administrator on 2017-02-10.
 */

//密码修改
myapp.controller("updatePsdCtrl",function($scope,$http,userData){
    $scope.loginId=sessionStorage.userId;

    //验证两次输入密码是否一致
    $scope.validPsd=function(){
        $scope.psdErr=false;
        if($scope.password && $scope.againPsd && $scope.password!=$scope.againPsd){
            $scope.psdErr=true;
        }
    };

    $scope.updateMyInfo=function(){
        $scope.updated=false;
        $scope.hasError=false;
        var url="/doUpdateUser";
        if(userData.validLogin($scope.loginId,$scope.userPsd)){
            $http.post(url,{
                    userId:$scope.loginId,
                    userPsd:$scope.password
                })
                .success(function(){
                    //重新读取用户数据
                    $scope.updated=true;
                    $scope.userPsd=null;
                    $scope.password=null;
                    $scope.againPsd=null;
                    $scope.updatePsdForm.$setPristine();
                });
        }else{
            $scope.hasError=true;
        };
    };
});