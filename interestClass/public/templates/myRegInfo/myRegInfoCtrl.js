/**
 * Created by Administrator on 2017-02-10.
 */

//我的信息
myapp.controller("myRegInfoCtrl",function($scope,$http){
    $scope.loginId=sessionStorage.userId;
    $scope.loginNk=sessionStorage.userNk;
    $scope.oldNk=sessionStorage.userNk;
    $scope.updated=false;

    $scope.updateMyInfo=function(){
        var url="/doUpdateUser";
        $http.post(url,{
                userId:$scope.loginId,
                userNk:$scope.loginNk
            })
            .success(function(){
                //重新读取用户数据
                $scope.updated=true;
                $scope.updateUserForm.$setPristine();
            });
    };
});