// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.prototype.searchPlace = (arr, id) => { //全局方法，用于删除数组中某项
    var counter = -1;
    for (var index in arr) { //遍历数组，找到该题目
        counter++;
        if (arr[index].id == id) {
            arr.splice(counter, 1);
        }
    }
}

Vue.prototype.collectID = (arr) => {
    let res = []
    for (var index in arr) {
        res.push(`${arr[index].id}`);
    }
    return res;
}


Vue.use(router);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
