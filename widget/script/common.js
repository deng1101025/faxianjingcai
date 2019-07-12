function getUserVipType(obj) {
  console.log("进入获取vip用户对象")
  //异步返回结果：
  api.getPrefs({
      key: 'userId'
  }, function(ret, err) {
      var userId = ret.value;
      console.log("获取本地缓存的userId： " + userId)
      if(userId && userId != "" && userId != null) {
        console.log(getModel)
        getModel("user").save({"_id":userId},{"desc":"desc"}, function(ret,err){
          console.log("获取vip用户对象：" + $api.jsonToStr(ret))
          console.log("获取vip用户对象：" + $api.jsonToStr(err))
            if(ret && ret.id){
              obj && obj.callback && obj.callback(ret);
            } else {
              api.toast({
                  msg: '服务器崩溃了，获取vip状态失败！',
                  duration: 2000,
                  location: 'top'
              });
            }
        })
      } else {
        api.toast({
            msg: '亲！您还未登录',
            duration: 2000,
            location: 'top'
        });
      }
  });
}
