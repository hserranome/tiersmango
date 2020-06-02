<template>
	<Button
		class="twitter-button"
		type="primary"
		icon="twitter"
		@click="handleTwitter"
	>
		Login with Twitter
	</Button>
</template>

<script>
	import { Button } from 'ant-design-vue'
	import { api } from '../utils/api'

	export default {
		name: 'Login',
		components: { Button },
		methods: {
			handleTwitter() {
				// api.get(`/connect/twitter?callback=${WEB_URL}/auth/twitter`)
				api.get(`/connect/twitter`)
			}
		}
	}
</script>
<style>
	.twitter-button {
		background-color: #1da1f2;
	}
</style>
