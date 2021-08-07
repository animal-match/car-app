import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import httpRequest from 'utils/httpRequest.js'
import './static/css/global.css'; // 公共样式
import store from './store/index.js' // vuex

Vue.prototype.$store = store;
Vue.config.productionTip = false;
Vue.prototype.$request = httpRequest;
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
	  store,
    ...App
})
app.$mount()
