function getNovelSearchList(obj) {
    console.log("searchAction*************************" + obj.url)
    var novelZhandianList = [
      "https://so.biqusoso.com/s.php?ie=gbk&siteid=biqukan.com&s=2758772450457967865&q="
    ];
    novelZhandianList.forEach(function(ele, index) {
        getNovelHttp({
            url: encodeURI(ele + obj.searchName),
            charset: 'utf-8',
            success: function(ret) {
                // 遍历html代码   获取小说列表
                if(index == 0) { // 趣书吧
                    JiexiNovelInfoFromQushuba(ret, obj)
                }
            }
        })
    });
}

// 趣书吧解析
function JiexiNovelInfoFromQushuba(rq, obj) {
    var el = document.createElement( 'html' );el.innerHTML = rq;
    console.log(el.getElementsByClassName('recommend mybook')[0].innerText);
    var recommendEL = el.getElementsByClassName('recommend mybook')
    var hot_saleEL = recommendEL[0].getElementsByClassName('hot_sale')
    var novelInfoList = [];
    for (var i = 0; i < hot_saleEL.length; i++) {
        novelInfoList.push({
            title: hot_saleEL[i].getElementsByClassName('title')[0].innerText,
            author: hot_saleEL[i].getElementsByClassName('author')[0].innerText,
            address: hot_saleEL[i].getElementsByTagName('a')[0].href.replace("www.biqukan.com", "wap.biqukan.com"),
          });
        console.log(JSON.stringify(novelInfoList));
        showSearchListItem(novelInfoList, obj)
    }
}

function showSearchListItem(novelInfoList, obj) {
    var htmlStr = "";
    novelInfoList.forEach(function(ele, index) {
        console.log(JSON.stringify(ele));
        var str =  "<div onclick=getNovelInfoDetail('"+ele.address+"', function(book){showNovelInfo(book)})><p>"+ele.title+"</p><p>"+ele.author+"</p></div>"
        htmlStr = htmlStr + str;
    });
    console.log(htmlStr);
    $api.html($api.byId(obj.domId), htmlStr);
    console.log($api.html($api.byId(obj.domId)));
}




//---------------------------------------------------------
//获取小说信息
function getNovelInfoDetail(url, callback) {
    getNovelHttp({
        url: url,
        charset: 'gb2312',
        success: function(ret) {
            // 遍历html代码   获取小说列表
            JiexiNovelInfoDetailFromQushuba(ret, callback)
        }
    });
}

// 趣书吧解析--小说信息
function JiexiNovelInfoDetailFromQushuba(rq, callback) {
    var el = document.createElement( 'html' );el.innerHTML = rq;

    var book_infoEL = el.getElementsByClassName('book_info')[0]
    book = {
        name: book_infoEL.getElementsByClassName('book_box')[0].getElementsByClassName('name')[0].innerText,
        author: book_infoEL.getElementsByClassName('book_box')[0].getElementsByClassName('dd_box')[0].getElementsByTagName('span')[0].innerText,
        novelType: book_infoEL.getElementsByClassName('book_box')[0].getElementsByClassName('dd_box')[0].getElementsByTagName('span')[1].innerText,
        novelStatus: book_infoEL.getElementsByClassName('book_box')[0].getElementsByClassName('dd_box')[1].getElementsByTagName('span')[0].innerText,
        novelWord: book_infoEL.getElementsByClassName('book_box')[0].getElementsByClassName('dd_box')[1].getElementsByTagName('span')[1].innerText,
        lastUpdateDate: book_infoEL.getElementsByClassName('book_box')[0].getElementsByTagName('dd')[2].innerText,
        lastUpdateChapterName: book_infoEL.getElementsByClassName('book_box')[0].getElementsByTagName('dd')[3].innerText,
        lastUpdateUrl: "https://wap.biqukan.com" + book_infoEL.getElementsByClassName('book_box')[0].getElementsByTagName('dd')[3].getElementsByTagName('a')[0].href.replace("file://", ""),
        img: book_infoEL.getElementsByClassName('cover')[0].getElementsByTagName('img')[0].src,
        contentSummary: el.getElementsByClassName('book_about')[0].getElementsByTagName('dd')[0].innerText
    }
    var ChaptersEL = el.getElementsByClassName('book_last')[1].getElementsByTagName('dd');
    var bookChapterFristPage = [];
    for (var i = 0; i < ChaptersEL.length; i++) {
        bookChapterFristPage.push({
            name: ChaptersEL[i].innerText,
            url: "https://wap.biqukan.com" + ChaptersEL[i].getElementsByTagName('a')[0].href.replace("file://", "")
        });
    }
    book.bookChapterFristPage = bookChapterFristPage; //第一到二十章节列表
    book.bookChapterFristPageUrlDown = "https://wap.biqukan.com" + el.getElementsByClassName('listpage')[0].getElementsByClassName('right')[0].getElementsByTagName('a')[0].href.replace("file://", "");
    callback && callback(book);
}
function showNovelInfo(book) {
    $api.attr($api.byId('bookInfoImg'),'src', book.img); //展示此书的图片
    $api.text($api.byId('bookInfoName'), book.name); // 展示书名
    $api.text($api.byId('bookInfoAuthor'), book.author); // 展示作者
    $api.text($api.byId('bookInfoLastUpdateDate'), book.lastUpdateDate); // 展示最新更新时间
    $api.text($api.byId('bookInfoLastUpdateChapterName'), book.lastUpdateChapterName); // 展示最新更新的章节名字
    $api.attr($api.byId('bookInfoLastUpdateChapterName'), 'href', book.lastUpdateUrl); // 设置最新更新章节的url
    $api.text($api.byId('contentSummary'), book.contentSummary); // 展示本书简介

    //远程获取指定章节内容
    getChapterContent(book.bookChapterFristPage[0].url)
}

//远程获取指定章节内容
function getChapterContent(url, isClear) {
  console.log("----------------------------" + isClear);
  console.log(url);
    getNovelHttp({
        url: url,
        charset: 'gb2312',
        success: function(ret) {
            // 遍历html代码   章节内容
            showChapterContent(ret, isClear);
        }
    });

}
function showChapterContent(rq, isClear) {
    var el = document.createElement( 'html' );el.innerHTML = rq;
    var chapterContent = el.getElementsByClassName('ReadAjax_content')[0].innerHTML;
    if(isClear) {//指定章节跳转来的
        api.pageUp({top: true})
        $api.css($api.dom('.section1'), 'display: none');
        $api.html($api.byId('chapterContent'), chapterContent);
    } else {
        //展示第一章节内容
        $api.append($api.byId('chapterContent'), chapterContent);
    }


    var nextChapter = el.getElementsByClassName('js_page_down')[0].href;
    $api.attr($api.byId('updateNextChapter'), 'url', dealUrlByBiqukan(nextChapter));
}

// 自动更新显示下一章
function updateNextChapterContent() {
    var url = $api.attr($api.byId('updateNextChapter'), 'url');
    getNovelHttp({
        url: url,
        charset: 'gb2312',
        success: function(ret) {
            // 遍历html代码   章节内容
            showChapterContent(ret);
        }
    });
}

function loadChapterList(data, isFirstLoad) {
    var htmlStr = "";
    var itemStr = "";
    for (var i = 0; i < data.length; i++) {
        itemStr += '<li onclick=selectChapter("'+ data[i].url +'")>'+ data[i].name +'</li>'
    }
    htmlStr = htmlStr + itemStr;
    if(isFirstLoad) {
        $api.html($api.byId('ulBookChapterList'), htmlStr);
    } else {
        $api.append($api.byId('ulBookChapterList'), htmlStr);
    }
}

function getChapterList() {
    getNovelInfoDetail(pageData.bookChapterFristPageUrlDown, function(book) {
        console.log(JSON.stringify(book));
        pageData = book;
        loadChapterList(book.bookChapterFristPage, false);
    })
}

function selectChapter(url) {
    api.closeWin({
        name: 'frame2_book_read_chapter'
    });
    console.log(JSON.stringify(api.windows()));
    console.log(api.frames());
    api.execScript({
      name: 'frame2_book_read',
      script: 'getChapterContent("'+ url +'", true);'
    });
}

function dealUrlByBiqukan(url) {
    if(url.indexOf("https://wap.biqukan.com") > -1) {
        return url;
    } else {
        return ("https://wap.biqukan.com" + url).replace("file://", "");
    }
}
