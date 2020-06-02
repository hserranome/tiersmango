import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TierList from '../views/TierList.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/auth/:provider',
		name: 'auth',
		component: Login // Set auth page, or handle auth here and return component? lmao
	},
	{
		path: '/template-editor',
		name: 'Template editor',
		component: () =>
			import(
				/* webpackChunkName: "template-editor" */ '@/views/TemplateEditor.vue'
			)
	},
	{
		path: '/tierlist/:id/:name',
		name: 'Template editor',
		component: TierList
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
