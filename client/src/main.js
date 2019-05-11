import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import './scss/index.scss';
import jsFiles from './js/skills.js';

window.skills = jsFiles;
window.store = store; // TODO: is it correct?

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
