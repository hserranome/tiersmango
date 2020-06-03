import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueApollo from 'vue-apollo'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import apolloClient from './utils/apollo'

Vue.use(VueCookies)
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
	defaultClient: apolloClient
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	apolloProvider,
	render: h => h(App)
}).$mount('#app')

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
