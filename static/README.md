#DianTV2 Front-End

##path
* static/
    * index.html
    * lib/
        * require.js
    * style/
        * widget.css
        * main.css
        * fonts/
        * sass/
            * bootstrap-min/
                * bootstrap.min.less
                * code.less
                * components.less
                * less.js
                * mixins.less
                * reset.less
                * scaffording.less
                * type.less
                * variables.less
            * components/
                * \_mixins.scss
                * \_variables.scss
            * \_components.scss
            * \_reset.scss
            * fontface.scss
            * main.scss
            * widget.scss
    * script/
        * main.js
    * application/
        * diantv.js
        * config.js
        * model/
            * ArticleItem.js
            * Articles.js
            * news.js
            * newItem.js
            * storys.js
            * storyItem.js
        * controller/
            * action.js
            * ArticleItem.js
            * Articles.js
            * editable.js
            * header.js
            * message.js
            * news.js
            * newItem.js
            * route.js
            * screen.js
            * storys.js
            * storyItem.js
            * timer.js



files in *static/* (except application/) will be loaded while the page is loading

files in *application/* will be loaded by the control of the *RequireJs* in *script/main.js*

