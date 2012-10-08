define([], function(){
    var config = {
        //view
        apiHost: 'http://127.0.0.1:8081/api',
        pingHost: 'http://127.0.0.1:8081/api/storys/?start=0&count=0',
        storysNum: 3,
        newsNum: 1,
        hideStep: 200,
        refreshInterval: 4000,

        msgScrollTime: 5000,
        initMsg: {
            'help4': '也可以点击条目进行编辑',
            'help3': '可以通过右上角的+发新的条目',
            'help2': '右边为水区，故名思义',
            'help1': '左边区域将定期更新新闻，通知'
        }
    };

    return config;
});
