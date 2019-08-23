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

// 充值会员 公共方法
function depositCommon(userId, day) {
  getModel("user").save({"_id":userId},{"desc":"desc"}, function(ret,err){
      if(ret && ret.id){
        obj && obj.callback && obj.callback(ret);
      } else {
        api.toast({
            msg: '服务器崩溃了，充值失败！',
            duration: 2000,
            location: 'top'
        });
      }
  })
}

function videoPlayByX5(data) {
    api.openTabLayout({
        name: 'navZhiboPlay',
        url: 'widget://html/frame_play.html',
        title: '播放中...',
        hideNavigationBar: false,
        pageParam: {
            url: data.url,
            type: 'yingshi',
            address: data.address
        },
        navigationBar: {
            background: '#000000',
            shadow: '#000000',
            color: '#ffffff',
            leftButtons: [{
                iconPath: 'widget://image/back.png',
                fontSize: '14'
            }],
            rightButtons:[{
                text: '切换线路',                //（可选项）按钮标题文字，可以和icon同时存在，字符串类型
                color: '#fff',        //（可选项）按钮标题文字颜色，默认值#000，字符串类型
                // fontSize:             //（可选项）按钮标题字体大小。默认值17，数字类型
                iconPath: 'widget://image/refresh.png'   //（可选项）按钮icon图标路径，可以和text同时存在，图片尺寸需要为4倍图，例如设备上面期望显示的图标尺寸为25*25，则图片实际尺寸需要为100*100，字符串类型
            }]
        }
    });

}
















//自定义播放器
function videoPlayCus(data) {
  api.openFrame({
      name: 'video',
      url: './video.html',
      bgColor: 'rgba(0,0,0,0.0)',
      rect: {
          x: 0,   //（可选项）数字类型；模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认：0
          y: 0,   //（可选项）数字类型；模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认：0
          w: api.frameWidth, //（可选项）数字类型；模块的宽度；默认：所属的 Window 或 Frame 的宽度
          h: 260  //（可选项）数字类型；模块的高度；默认：w的3/4
      },
      pageParam: data
  });
}




function videoPlay(videoPlayer, data, isFullScreen) {
  var filmListClickStatus = 0;
  data.videoPlayer = videoPlayer;
  console.log("video播放片源的地址————————————————" + data.url)
  var params = {
      rect: {
          x: 0,   //（可选项）数字类型；模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认：0
          y: 0,   //（可选项）数字类型；模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认：0
          w: api.frameWidth, //（可选项）数字类型；模块的宽度；默认：所属的 Window 或 Frame 的宽度
          h: 260//isFullScreen ? api.frameHeight : 260  //（可选项）数字类型；模块的高度；默认：w的3/4
      },
      texts: {
          head: {
              title: data.title || "未知"
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
              // setSize: 44,
              // setImg: 'widget://img/set.png',
              customButtons:[{
                  w:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  h:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  marginRight:10, //（可选项）数字类型；按钮右边距；默认：10
                  img:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(未选中状态)，要求本地路径（widget://、fs://）；
                  imgSelected:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(选中状态)，要求本地路径（widget://、fs://）；
                  isSelected:false,               //（可选项）布尔类型；顶部右边设置自定义按钮是否被选中，默认：false；
              },{
                  w:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  h:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  marginRight:10, //（可选项）数字类型；按钮右边距；默认：10
                  img:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(未选中状态)，要求本地路径（widget://、fs://）；
                  imgSelected:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(选中状态)，要求本地路径（widget://、fs://）；
                  isSelected:false,               //（可选项）布尔类型；顶部右边设置自定义按钮是否被选中，默认：false；
              }]
          },
          foot: {
              bg: 'rgba(0.5,0.5,0.5,0.7)',
              height: 44,
              playSize: 22,
              playImg: 'fs://img/back.png',
              pauseImg: 'fs://img/back.png',
              nextSize: 22,
              nextImg: 'widget://img/next.png',
              timeSize: 14,
              timeColor: '#fff',
              sliderImg: 'fs://img/slder.png',
              progressColor: '#696969',
              progressSelected: '#76EE00',
              rotationSize:22,                   //（可选项）数字类型；底部横屏/竖屏按钮大小；默认：foot的高度
              verticalImg:'widget://image/vertical.png',  //（可选项）字符串类型；底部横竖屏切换按钮的背景图片，竖屏状态下的切换按钮，要求本地路径（widget://、fs://）；默认：竖屏按钮图标
              horizontalImg:'widget://image/horizontal.png', //（可选项）字符串类型；底部横竖屏切换按钮的背景图片，横屏状态下的切换按钮，要求本地路径（widget://、fs://）；默认：横屏按钮图标
              customButtons:[{
                  w:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  h:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  marginRight:10, //（可选项）数字类型；按钮右边距；默认：10
                  img:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(未选中状态)，要求本地路径（widget://、fs://）；
                  imgSelected:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(选中状态)，要求本地路径（widget://、fs://）；
                  isSelected:false,               //（可选项）布尔类型；顶部右边设置自定义按钮是否被选中，默认：false；
              },{
                  w:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  h:22,  //（可选项）数字类型；顶部右边设置按钮大小；默认：30
                  marginRight:10, //（可选项）数字类型；按钮右边距；默认：10
                  img:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(未选中状态)，要求本地路径（widget://、fs://）；
                  imgSelected:'widget://image/set.png',//（可选项）字符串类型；顶部右边设置自定义按钮(选中状态)，要求本地路径（widget://、fs://）；
                  isSelected:false,               //（可选项）布尔类型；顶部右边设置自定义按钮是否被选中，默认：false；
              }]
          }
      },
      // isShowBack: false,
      path: data.url, //（可选项）字符串类型；文档的路径，支持网络和本地（fs://）路径；默认：未传值时不播放
      //在 android 平台上不支持 widget://
      autoPlay: true, //（可选项）布尔类型；打开时是否自动播放；默认：true（自动播放）
      autorotation: false
  };

  var callback = function(ret, err) {
      if (ret) {
        //设置按钮点击
        if(ret.btnIndex == 0) {

        } else if (ret.btnIndex == 1) { // 剧集按钮被点击
          videoPlayer.isFullscreen(function(ret0){
              console.log(ret0.isFullscreen)
              // closeFrame({
              //     name: 'frame_play_film_list'
              // });
              if(ret0.isFullscreen) {//全屏显示
                  if(filmListClickStatus) {
                    api.closeFrame({
                        name: 'frame_play_film_list'
                    });
                    filmListClickStatus = 0;
                  } else {
                      filmListDialogFrame(data, api.frameWidth, api.frameHeight)
                      filmListClickStatus = 1
                  }
              } else {//非全屏显示
                  if(filmListClickStatus) {
                    api.closeFrame({
                        name: 'frame_play_film_list'
                    });
                    filmListClickStatus = 0;
                  } else {
                      filmListDialogFrame(data, api.frameWidth)
                      filmListClickStatus = 1
                  }
              }
          });
        } else if (ret.eventType == 'landscape') {
            // 全屏显示
            filmListClickStatus = 0;
            api.closeFrame({
                name: 'frame_play_film_list'
            });
        } else if(ret.eventType == 'portrait') {
            filmListClickStatus = 0;
            api.closeFrame({
                name: 'frame_play_film_list'
            });
        }
          // alert(JSON.stringify(ret));
      } else {
          // alert(JSON.stringify(err));
      }
  }
videoPlayer.play(params, callback);
  // if(isFullScreen) {
  //     videoPlayer.play(params, callback);
  // } else {
  //     videoPlayer.openPlay(params, callback);
  // }

  videoPlayer.onBack();

  // videoPlayer.fullScreen({
  //   orientation:'right'
  // });
  openDisplayFoot(data, true, true)

}


function openDisplayFoot(param, isFullScreen, first) {
  console.log("_________");
  console.log(JSON.stringify(videoPlayer))
  console.log("_________" + isFullScreen);
  api.openFrame({
      name: 'frame_video_display_foot',
      url: './frame_video_display_foot.html',
      rect: {
          x: 0,
          y: !isFullScreen ? api.frameWidth - 50 : 210,
          w: !isFullScreen ? api.frameHeight : api.frameWidth,
          h: 50
      },
      pageParam: {
        first: first,
        w: api.frameWidth,
        h: api.frameHeight,
        param: param
      },
      bounces: false,
      bgColor: 'rgba(0,0,0,0)'
      // vScrollBarEnabled: true,
      // hScrollBarEnabled: true
  });
}

function closeDisplayFoot() {
    api.closeFrame({
        name: 'frame_video_display_foot'
    });
}


function filmListDialogFrame (data, w, h) {
  api.openFrame({
      name: 'frame_play_film_list',
      url: './frame_play_film_list.html',
      bgColor: 'rgba(0,0,0,0.0)',
      rect: {
          x: 0,
          y: 30,
          w: w ? w : 300,
          h: h ? (h - 80) : 190
      },
      pageParam: data
  });
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

//重写官方openFrame
function openFrame(obj) {
    api.openFrame({
        name: obj.name,
        url: name.url,
        rect: {
            x: obj.rect ? obj.rect.x : 0,
            y: obj.rect ? obj.rect.y : 0,
            w: obj.rect ? obj.rect.w : 'auto',
            h: obj.rect ? obj.rect.h : 'auto',
        },
        pageParam: obj.pageParam,
        data: obj.data,
        headers: obj.headers,
        useWKWebView: obj.useWKWebView || false,
        historyGestureEnabled: obj.historyGestureEnabled || false,
        bounces: obj.bounces || false,
        bgColor: obj.bgColor || 'rgba(0,0,0,0)',
        scrollToTop: obj.scrollToTop || true,
        scrollEnabled: obj.scrollEnabled || true,
        vScrollBarEnabled: obj.scrollEnabled || true,
        hScrollBarEnabled: obj.hScrollBarEnabled || true,
        scaleEnabled: obj.hScrollBarEnabled || false,
        fixedOn: obj.fixedOn || 'ui_window'
    });
    var frameStatus = true;
    //如监听网络连接事件
    api.sendEvent({
        name: 'frameStatus',
        extra: {
            frameName: obj.name,
            frameStatus: true
        }
    });
}

function closeFrame(obj) {
    api.closeFrame({
        name: obj.name
    });
    var frameStatus = true;
    //如监听网络连接事件
    api.sendEvent({
        name: 'frameStatus',
        extra: {
            frameName: obj.name,
            frameStatus: false
        }
    });
}










//获取解析视频地址的url列表
var analysisUrlList = [];
function getAnalysisUrlList() {
  getModel("config").query({
      filter:{
          "where":{"attrKey": 'analysisUrl'},
          "order": "attrParam2 ASC" // ASC DESC
      }
  }, function(ret,err){
    // console.log("config对象：" + $api.jsonToStr(ret))
    // console.log("config对象：" + $api.jsonToStr(err))
    if(ret && ret[0]&& ret[0].id){// 存在此充值码
        analysisUrlList = ret;
    } else {
      api.toast({
          msg: '获取线路失败',
          duration: 2000,
          location: 'top'
      });
    }
  })
}

//基于原生的http请求封装
function getNovelHttp(obj) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', obj.url, true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.overrideMimeType("text/html; charset=" + obj.charset);//设定以gb2312编码识别数据
    httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
    //获取数据后的处理程序
    console.log(obj.url);
    httpRequest.onreadystatechange = function () {
          // console.log(httpRequest.responseText);
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText; //获取到json字符串，还需解析
            console.log(json);
            obj && obj.success && obj.success(json)
        }
    };

}

function getNovelAjax(obj) {
  console.log("searchAction*************************getNovelAjax")
  // var obj = obj ? obj : {};
  api.ajax({
      url: obj.url,
      method: obj.method || 'get',
      timeout: obj.timeout || 30,
      dataType: obj.dataType || 'jsonp',
      returnAll: obj.returnAll || true,
      charset: obj.charset || 'utf-8',
      data: obj.data || {}
  },function(ret, err){
    console.log("searchAction*************************getNovelAjax   callback")

      if (ret) {
          obj.success && obj.success(ret)
          console.log("解析——————————————搜索小说成功！" + ret)
      }else {
          obj.fail && obj.fail(err)
          console.log("解析——————————————搜索小说失败！" + err)
      };
  },function() {
      console.log("_________________________________")
  });
}
