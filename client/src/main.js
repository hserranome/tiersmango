import Vue from 'vue'
import Backendless from 'backendless'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(VueCookies)

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const APP_ID = '81D75339-5F5A-28F3-FF4F-818DA55E4F00'
const API_KEY = '0AE066D0-4290-4EA7-BB61-4BFED46B7114'

// Backendless init app
Backendless.initApp(APP_ID, API_KEY)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
