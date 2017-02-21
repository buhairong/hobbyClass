/**
 * Created by Administrator on 2017/2/9.
 */

//报名控制器
myapp.controller("signUpCtrl",function($scope,$state,$http,$ionicScrollDelegate){
    $scope.loginId=sessionStorage.userId;
    $scope.loginNk=sessionStorage.userNk;
    $scope.newClass=JSON.parse(sessionStorage.signClass);
    $scope.msg=null;
    $scope.nk=null;
    $scope.age=null;

    $scope.ages=[
        {"age":6},
        {"age":7},
        {"age":8},
        {"age":9},
        {"age":10},
        {"age":11},
        {"age":12}
    ];


    //报名
    $scope.signUp=function(){
        var signDate={
            userId:$scope.loginId,
            childNk:$scope.nk,
            childAge:$scope.age,
            classId: $scope.newClass.classId
        };
        $http.post("/doSignUp",signDate)
            .success(function(msg){
                if(msg){
                    $scope.msg=msg;
                    $ionicScrollDelegate.scrollTop(true);
                }else{
                    $state.go("signInfo");
                };
            });
    };
});
