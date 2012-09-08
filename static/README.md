#DianTV2 Front-End

##directionary
* static/
    * index.html
    * lib/
        * require.js
    * style/
        * style.css
        * less/
            * style.less
            * ...
    * script/
        * main.js
    * application/
        * application.js
        * model/
            * news.js
            * storys.js
        * controller/
            * storys.js
            * news.js
            * editable.js
            * timer.js
            * article.js

files in *static/* (except application/) will be loaded while the page is loading

files in *application/* will be loaded by the control of the *RequireJs* in *script/main.js*

