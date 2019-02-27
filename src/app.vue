<template>
    <div id="app">
        <md-header @bthClick="insertAtCursor" @export="exportMarkDown"></md-header>
        <div class="content">
            <div class="editor">
                <h1>编码区</h1>
                <textarea ref="textarea" spellcheck="false" v-model="editorValue"></textarea>
            </div>
            <div class="preview">
                <h1>预览区</h1>
                <div v-html="previewHtml"></div>
            </div>
        </div>
    </div>
</template>

<script>
import MdHeader from './component/header.vue'
import markdownit from 'markdown-it'
import MarkdownItMark from 'markdown-it-mark' //代码高亮 ==text==
import MarkdownItIns from 'markdown-it-ins' //下划线  ++text++
import MarkdownItEmoji from 'markdown-it-emoji' //emoji表情 :scream:
import MarkdownItFootnote from 'markdown-it-footnote' //斜体
import MarkdownItTaskCheckbox from 'markdown-it-task-checkbox' //checkbox
import './assets/font/iconfont.css'
import './assets/scss/theme.css'
import './assets/scss/_reset.css'
import hostkeys from 'hotkeys-js'
import hljs from 'highlight.js'

export default {
    name: 'App',
    components: {
      MdHeader
    },
    data() {
        return {
            msg: 'hello world',
            editorValue: '',
            previewHtml: '',
            markdown: markdownit({
                breaks:       true, // \n转化为<br>
                highlight: function (str, lang) { //代码高亮
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value;
                        } catch (__) {}
                    }

                    return ''; // use external default escaping
                }
            }).use(MarkdownItMark).use(MarkdownItIns).use(MarkdownItEmoji).use(MarkdownItFootnote).use(MarkdownItTaskCheckbox),
            //操作记录
            operateHistory: [],
            //撤回记录
            deleteHistory: []
        }
    },

    // beforeDestory(){
    //   //设置缓存
    //     alert(123123);
    //     window.localStorage.setItem('MarkdownStorage', this.editorValue);
    // },

    methods: {




        //导出markdown文件
        exportMarkDown(){
            // this.$emit("export")
            const blob = new Blob([this.editorValue], {type: 'text/plain'});
            const a = document.createElement("a");
            a.style.display = 'none';
            a.download = '草稿.md';
            a.href = Reflect.apply(URL.createObjectURL, undefined, [blob]);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.localStorage.removeItem("MarkdownStorage");
        },

        //在光标处插入内容
        insertAtCursor(item){
            const textarea = this.$refs.textarea;
            console.log(item, textarea);
            //可以选中文字设置前缀
            if(item.fixed || item.prefix){
                console.log(textarea.selectionStart, textarea.selectionEnd)
                //有选中文字段
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                if(start !== end){
                    //前后都有后缀
                    if(item.fixed){
                        this.editorValue = this.editorValue.substring(0, start) + item.fixed + this.editorValue.substring(start, end) + item.fixed + this.editorValue.substring(end);
                    }
                    //只有前缀
                    else if(item.prefix){
                        this.editorValue = this.editorValue.substring(0, start) + item.prefix + this.editorValue.substring(start, end) + this.editorValue.substring(end);
                    }
                }
                //未选中文字
                else{
                    this.editorValue = this.editorValue.substring(0, start) + item.template + this.editorValue.substring(start);
                }
            }
        },

    },

    mounted(){
        //读取缓存
        if (window.localStorage.getItem('MarkdownStorage')){
            this.editorValue = window.localStorage.getItem('MarkdownStorage');
        }



      //快捷键设置
        hostkeys("ctrl+z,ctrl+shift+z",(event,handler) => {
        switch (handler.key) {
            //撤回
            case "ctrl+z":
            case 'command+z':
            if(this.operateHistory.length){
                let str = this.operateHistory.pop();
                this.deleteHistory.push(str);
                this.editorValue = str;
            }
            break;

            //取消撤回
            case 'ctrl+shift+z':
            case 'command+shift+z':
            if(this.deleteHistory.length){
                let str = this.deleteHistory.pop();
                this.operateHistory.push(str);
                this.editorValue = str;
            }
            break;

        }
      })
    },

    watch:{
        'editorValue'(){
            this.previewHtml = this.markdown.render(this.editorValue);
            let lastStr = this.operateHistory.length ? this.operateHistory[this.operateHistory.length - 1] : '';
            if(lastStr !==  this.editorValue){
                this.operateHistory.push(lastStr);
            }
            window.localStorage.setItem('MarkdownStorage', this.editorValue);

        }
    }
}
</script>

<style lang="scss">
.content{
    display: flex;
    height: calc(100vh - 55px);
    >div{
        flex: 1;
        padding-left:20px;
        >h1{
            font-size: 20px;
            font-weight: 600;
            line-height: 40px;
            margin:0;
            padding:0;
        }
        textarea{
            width: 100%;
            height: calc(100% - 40px);
            padding: 0;
            border: none;
            outline: none;
            background: transparent;
            /*font-size: 18px;*/
            /*line-height: 20px;*/
            line-height: 1.8;
            //去掉textarea右下角的拖拽样式
            resize:none;
        }
    }
    .editor{
        background: #f2f2f2;
    }
}
</style>
