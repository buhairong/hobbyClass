/**
 * Created by Administrator on 2017/1/22.
 */

//引导页控制器
myapp.controller("guideCtrl", function ($scope,$window) {
    //获得窗口高度
    $scope.getHeight=function(){
        return parseInt($window.innerHeight)+"px";
    };

    //获得窗口宽度
    $scope.getWidth=function(){
        return parseInt($window.innerWidth)+"px";
    };
});
