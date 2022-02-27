import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store/index'
import Popup from './components/popup.vue'
import Spacer from './components/spacer.vue'

import './../node_modules/bootstrap/scss/bootstrap-grid.scss'
import './assets/css/defaults.scss'
import './assets/fonts/index.scss'

createApp(App)
    .use(store)
    .use(router)
    .component('Popup', Popup)
    .component('Spacer', Spacer)
    .mount('#app')