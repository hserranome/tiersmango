<template>
	<p>Authenticating</p>
</template>

<script>
	import { api } from '../utils/api'

	export default {
		name: 'Auth',
		created() {
			this.handleAuth()
		},
		methods: {
			handleAuth() {
				console.log(this.$route)
				const { provider } = this.$route.params
				const { error } = this.$route.query
				if (error) {
					console.error(error)
					return
				}
				const data = api.get(`/auth/${provider}/callback`)
				console.log(data)
			}
		}
	}
</script>
<style>
	.twitter-button {
		background-color: #1da1f2;
	}
</style>
