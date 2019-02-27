import Vue from 'vue';
import App from './app.vue';

//引入 ant design of vue
import { Upload, Modal, Input, Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Upload);
Vue.use(Modal);
Vue.use(Input);
Vue.use(Button);

export default new Vue({
    el: "#app",
    components: { App },
    template: '<App/>'
})
