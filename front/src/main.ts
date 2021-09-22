import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'

import './assets/css/defaults.scss'
import './assets/fonts/index.scss'

!localStorage.theme ? localStorage.theme = 'dark': false;
localStorage.theme === 'dark' ? document.body.classList.add('theme-dark'): false;
localStorage.theme === 'light' ? document.body.classList.add('theme-light'): false;

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')