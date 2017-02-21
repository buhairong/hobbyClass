/**
 * Created by Administrator on 2017/1/30.
 */

myapp.controller("usersListCtrl",function($scope,$http,$ionicScrollDelegate,userData){
    $scope.users=[];
    $scope.pageNums=0;
    $scope.currentPage=1;//当前页
    $scope.maxSize = 3;//最多显示3页其他的用···代替
    $scope.pageSize=5;//每页显示5条数据
    $scope.searchUserId="";
    $scope.searchUserNk="";
    $scope.searchUserRoot="";

    $scope.roots=[
        {id:0,name:"系统管理员"},
        {id:1,name:"管理员"},
        {id:100,name:"普通用户"}
    ];


    //验证注册账号是否已经存在
    $scope.validLoginId=function(){
        $scope.idErr=false;
        if($scope.newUserId && userData.validRegisterId($scope.newUserId)){
            $scope.idErr=true;
        };
    };

    //搜索用户
    $scope.searchUser=function(){
        if($scope.searchUserRoot==null){
            $scope.searchUserRoot="";
        };
        var url="/doSearchUsers?currentPage="+$scope.currentPage+"&pageSize="+$scope.pageSize+"&userId="+$scope.searchUserId+"&userNk="+$scope.searchUserNk+"&root="+$scope.searchUserRoot;
        $http.get(url)
            .success(function(data){
                $scope.users=data.data;
                $scope.pageNums=data.totalNum;
            });
    };

    //新增用户
    $scope.addUser=function(){
        $http.post("/doRegister",
            {
                userId:$scope.newUserId,
                userNk:$scope.newUserNk,
                userPsd:$scope.newUserPsd,
                root:$scope.newUserRoot
            })
            .success(function() {
                //重新读取用户数据
                $scope.searchUser();
                $scope.newUserId = null;
                $scope.newUserNk = null;
                $scope.newUserPsd = null;
                $scope.newUserRoot = null;
                $scope.addUserForm.$setPristine();
            })
    };

    //删除用户
    $scope.delUser=function(userId){
        var url="/doDelUser?userId="+userId;
        $http.get(url)
            .success(function(){
                //重新读取用户数据
                $scope.searchUser();
            });
    };

    //更新用户信息
    $scope.updateUser=function(user){
        var url="/doUpdateUser";
        $http.post(url,{
                userId:user.userId,
                userNk:user.userNk,
                userPsd:user.userPsd,
                root:user.root
            })
            .success(function(){
                //重新读取用户数据
                $scope.searchUser();
                $scope.userForm.$setPristine();
            });
    };

    //初始化用户数据
    $scope.searchUser();

});