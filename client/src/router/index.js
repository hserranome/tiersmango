import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TierList from '../views/TierList.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
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
