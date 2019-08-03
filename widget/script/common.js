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


function videoPlay(videoPlayer, url, title) {
  console.log("video播放片源的地址————————————————" + url)
  videoPlayer.openPlay({
      rect: {
          x: 0,   //（可选项）数字类型；模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认：0
          y: 0,   //（可选项）数字类型；模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认：0
          w: api.frameWidth, //（可选项）数字类型；模块的宽度；默认：所属的 Window 或 Frame 的宽度
          h: 260  //（可选项）数字类型；模块的高度；默认：w的3/4
      },
      texts: {
          head: {
              title: title
          }
      },
      styles: {
          head: {
              bg: 'rgba(0.5,0.5,0.5,0.7)',
              height: 22,
              titleSize: 20,
              titleColor: '#fff',
              backSize: 22,
              backImg: 'fs://img/back.png',
              setSize: 44,
              setImg: 'widget://img/set.png'
          },
          foot: {
              bg: 'rgba(0.5,0.5,0.5,0.7)',
              height: 44,
              playSize: 22,
              playImg: 'fs://img/back.png',
              pauseImg: 'fs://img/back.png',
              nextSize: 44,
              nextImg: 'widget://img/next.png',
              timeSize: 14,
              timeColor: '#fff',
              sliderImg: 'fs://img/slder.png',
              progressColor: '#696969',
              progressSelected: '#76EE00',
              rotationSize:22,                   //（可选项）数字类型；底部横屏/竖屏按钮大小；默认：foot的高度
              verticalImg:'widget://image/vertical.png',  //（可选项）字符串类型；底部横竖屏切换按钮的背景图片，竖屏状态下的切换按钮，要求本地路径（widget://、fs://）；默认：竖屏按钮图标
              horizontalImg:'widget://image/horizontal.png' //（可选项）字符串类型；底部横竖屏切换按钮的背景图片，横屏状态下的切换按钮，要求本地路径（widget://、fs://）；默认：横屏按钮图标
          }
      },
      isShowBack: false,
      path: url, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
      //在 android 平台上不支持 widget://
      autoPlay: true, //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
      autorotation: false
  }, function(ret, err) {
      if (ret) {
          // alert(JSON.stringify(ret));
      } else {
          // alert(JSON.stringify(err));
      }
  });
  videoPlayer.onBack();
}

function ajaxLoadm3u8(url, success, fail) {
  api.showProgress({
      title: '努力跳转中...',
      text: '先喝杯茶...'
  });
  api.ajax({
      url: 'http://api.5sys.cn/jx/api.php',
      method: 'get',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      data: {
          body: {
              url: encodeURIComponent(url),
              cb:  '',
              _: '1564848281691'
          }
      }
  }, function(ret, err) {
      api.hideProgress();
      var decodeURIStr = decodeURI(decodeURI(err.body));
      var sliceStr = decodeURIStr.slice(1, decodeURIStr.length-2);
      var resData = JSON.parse(sliceStr);
      if(resData.code == 200) {
        success && success(resData)
      } else {
        // success && success({url: url})
        api.toast({
            msg: 'vip播放失败，切换原视频播放',
            duration: 2000,
            location: 'top'
        });
      }
  });
}
