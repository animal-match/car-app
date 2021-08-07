import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import './static/css/global.css'; // 公共样式
import store from './store/index.js'

Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
	  store,
    ...App
})
app.$mount()
