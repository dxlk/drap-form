import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";  //新增
import vuex from "./store/index";  //新增
import elementUiPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './common/common.css'
import 'font-awesome/css/font-awesome.css'
import jasStorage from './utils/jas-storage';
import vuedraggable from 'vuedraggable'

const app = createApp(App);
app.config.globalProperties.$jasStorage = jasStorage;
app.config.globalProperties.$http = () => { }

app.use(router);  //新增
app.use(elementUiPlus)
app.use(vuedraggable)
app.use(vuex); //新增
app.mount("#app");
