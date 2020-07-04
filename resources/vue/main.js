// require('./bootstrap');

window.Vue = require('vue');

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './styles/element-variables.scss'

import './styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
});

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('main-app', require('./App.vue').default);

// Vue.component('main-app', require('./views/login').default);

const app = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App
    },
});
