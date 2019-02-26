<template>
    <div class="header">
        <ul class="list">
            <li v-for="(item, idx) in btnList" :key="idx">
                <span :title="item.desc" class="iconfont" @click="handleClick(item)" :class="item.icon">
                </span>
            </li>
            <li>
                <button @click="exportMarkDown">导出</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'mdHeader',
        data(){
            return {
                btnList: [
                    {
                        desc: '加粗',
                        icon: 'icon-jiacu',
                        template: '**text**',
                        fixed: '**'
                    },{
                        desc: '斜体',
                        icon: 'icon-xieti',
                        template: '*text*',
                        fixed: '*'
                    },{
                        desc: '删除线',
                        icon: 'icon-shanchuxian',
                        template: '~~text~~',
                        fixed: '~~'
                    },{
                        desc: '下划线',
                        icon: 'icon-Underline',
                        template: '++text++',
                        fixed: '++'
                    },{
                        desc: '行内代码',
                        icon: 'icon-kuohao_brackets',
                        template: '`text`',
                        fixed: '`'
                    },{
                        desc: '插入链接',
                        icon: 'icon-link',
                        special: true
                    },{
                        desc: '插入图片',
                        icon: 'icon-tupian',
                        special: true
                    },{
                        desc: '标记',
                        icon: 'icon-map_mark',
                        template: '==text==',
                        fixed: '=='
                    },{
                        desc: '一级标题',
                        icon: 'icon-H',
                        template: `
# text`,
                        prefix: '# '
                    },{
                        desc: '二级标题',
                        icon: 'icon-H1',
                        template:  `
## text`,
                        prefix: '## '
                    },{
                        desc: '三级标题',
                        icon: 'icon-H2',
                        template:  `
### text`,
                        prefix: '### '
                    },{
                        desc: '四级标题',
                        icon: 'icon-h4',
                        template:  `
#### text`,
                        prefix: '#### '
                    },{
                        desc: '五级标题',
                        icon: 'icon-h',
                        template:  `
##### text`,
                        prefix: '##### '
                    },{
                        desc: '六级标题',
                        icon: 'icon-h6',
                        template:  `
###### text`,
                        prefix: '###### '
                    },{
                        desc: '分割线',
                        icon: 'icon-fengexian',
                        template: `
***`
                    },{
                        desc: '待办',
                        icon: 'icon-xuankuang1',
                        template: '- [ ] text'
                    },{
                        desc: '已完成',
                        icon: 'icon-xuankuang',
                        template: '- [x] text'
                    },{
                        desc: '引用',
                        icon: 'icon-yinyong',
                        template: '> text'
                    },{
                        desc: '无序列表',
                        icon: 'icon-wuxuliebiao',
                        template: `
- text 1
- text 2
                        `
                    },{
                        desc: '有序列表',
                        icon: 'icon-youxuliebiaod1ev',
                        template: `
1. text 1
2. text 2
                        `
                    },{
                        desc: '代码块',
                        icon: 'icon-daimakuai',
                        template: '```code here!```'
                    },{
                        desc: '插入表格',
                        icon: 'icon-biaoge3',
                        template: `
header 1 | header 2
-- | --
text1 | text1
text2 | text2
                        `
                    },
                ]
            }
        },
        methods: {
            handleClick(item) {
                this.$emit("bthClick", item)
            },
            //导出markdown文件
            exportMarkDown(){
                this.$emit("export")
            }
        }
    }
</script>

<style lang="scss">
    .header{
        .list{
            border-bottom: 1px solid #aaa;
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            li{
                margin:0;
                flex: 1;
                text-align: center;
                height: 50px;
                line-height: 50px;
                button{
                    outline: none;
                    padding: 5px 14px;
                    line-height: 20px;
                    border: none;
                    background: #2d8cf0;
                    color:#fff;
                    cursor: pointer;
                    border-radius: 4px;
                    &:hover{
                        background: #57a3f3;
                    }
                }
                .iconfont:hover{
                    cursor: pointer;
                    color: #127FC4;
                    font-weight: bold;
                }
                &:last-child{
                    width: 240px;
                    flex: initial;
                }
            }
        }
    }
</style>
