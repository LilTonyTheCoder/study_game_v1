import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import './scss/index.scss';
import skills from './js/skills.js';
// import expTable from './js/expTable.js';

window.skills = skills;
window.store = store; // TODO: is it correct?

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
