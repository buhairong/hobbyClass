/**
 * Created by Administrator on 2017-02-10.
 */

//报名控制器
myapp.controller("signInfoCtrl",function($scope,$http){
    $scope.signInfo=[];
    $scope.loginId=sessionStorage.userId;

    $scope.getSignInfo=function(){
        $http.get("/doSearchSign?userId="+$scope.loginId)
            .success(function(data){
                $scope.signInfo=data;
            });
    };

    $scope.getSignInfo();

});
