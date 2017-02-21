/**
 * Created by hxsd on 2017/1/17.
 */

//主模块
var myapp = angular.module("myapp", ["ionic", "ngMessages","ui.bootstrap"]);

//配置
myapp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //去掉后退按钮的文字
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText("");

    //配置路由
    //引导页
    $stateProvider.state("guide", {
            url: "/guide",
            templateUrl: "templates/guide/guide.html",
            controller: "guideCtrl"
        })
        //登录页面
        .state("login",
            {
                url: "/login",
                templateUrl: "templates/login/login.html",
                controller: "loginCtrl"
            })
        //注册页面
        .state("register",
            {
                url: "/register",
                templateUrl: "templates/register/register.html",
                controller: "registerCtrl"
            })
        //用户管理页面
        .state("usersList",
            {
                url: "/usersList",
                templateUrl: "templates/usersList/usersList.html",
                controller: "usersListCtrl"
            })
        //兴趣班
        .state("interestClassList",
            {
                url: "/interestClassList",
                cache:false,
                templateUrl: "templates/interestClassList/interestClassList.html",
                controller: "interestClassListCtrl"
            })
        //最近开班
        .state("newClass",
            {
                url: "/newClass",
                templateUrl: "templates/newClass/newClass.html",
                controller: "newClassCtrl"
            })
        //课程报名
        .state("signUp",
            {
                url: "/signUp",
                cache:false,
                templateUrl: "templates/signUp/signUp.html",
                controller: "signUpCtrl"
            })
        //我的
        .state("myInfo",
            {
                url: "/myInfo",
                templateUrl: "templates/myInfo/myInfo.html",
            })
        //我的信息
        .state("myRegInfo",
            {
                url: "/myRegInfo",
                templateUrl: "templates/myRegInfo/myRegInfo.html",
                controller:"myRegInfoCtrl"
            })
        //修改密码
        .state("updatePsd",
            {
                url: "/updatePsd",
                templateUrl: "templates/updatePsd/updatePsd.html",
                controller:"updatePsdCtrl"
            })
        //我的报名
        .state("signInfo",
            {
                url: "/signInfo",
                templateUrl: "templates/signInfo/signInfo.html",
                controller:"signInfoCtrl"
            })


    //默认引导页
    $urlRouterProvider.otherwise("/guide");
});

//全局共享数据工厂
myapp.factory("userData", function ($http) {
    //用户数据
    var users = [];

    //兴趣班
    var hobbies = [];

    //最近开班
    var newClasses = [];

    //读取记录用户信息的JSON数据
    $http.get("data/user.json")
        .success(function (data) {
            users = data;
        });

    //读取记录兴趣班信息的JSON数据
    $http.get("data/hobby.json")
        .success(function (data) {
            hobbies = data;
        });

    //读取记录最近开班信息的JSON数据
    $http.get("data/class.json")
        .success(function (data) {
            newClasses = data;
        });

    return {
        //验证登录账号和密码是否正确
        validLogin: function (userId, userPsd) {
            var flag = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].userId == userId && users[i].userPsd == userPsd) {
                    sessionStorage.userId=userId;
                    sessionStorage.userNk=users[i].userNk;
                    sessionStorage.root=users[i].root;
                    flag = true;
                    return flag;
                };
            };
            return flag;
        },
        //获取登录用户数据
        getUser: function () {
            return users;
        },
        //验证注册账号是否已经存在
        validRegisterId: function (userId) {
            var flag = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].userId == userId) {
                    flag = true;
                    return flag;
                };
            };
            return flag;
        },
        register: function (id, nk, root) {
            sessionStorage.userId=id;
            sessionStorage.userNk=nk;
            sessionStorage.root=root;
        },
    };
});

//主控制器
myapp.controller("myCtrl", function ($scope, $state) {
    //控制底部tab导航栏显示隐藏
    $scope.showTabs = false;
    $scope.$on("$ionicView.beforeEnter", function () {
        if ($state.current.name == "interestClassList") {
            $scope.showTabs = true;
        }
        ;
    });

    //检查是否登录
    $scope.checkLogin = function (stateGo) {
        sessionStorage.stateGo=stateGo;
        if (sessionStorage.userId) {
            $state.go(stateGo);
        } else {
            $state.go("login");
        };
    };
});