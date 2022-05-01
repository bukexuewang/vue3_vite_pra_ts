import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/css/global.css';
import './styles/scss/index.scss';

const app = createApp(App);
// 因为要在路由里面先用pinia判断权限，所以先注册pinia
app.use(store);
// 在注册路由
app.use(router);
// 然后挂载
app.mount('#app');
