<template>
	<Button
		type="primary"
		class="google-button"
		icon="google"
		@click="handleTwitter"
	>
		Login with Google
	</Button>
</template>

<script>
	import { Button } from 'ant-design-vue'
	import { API_URL } from '../utils/api'

	export default {
		name: 'Login',
		components: { Button },
		methods: {
			async handleTwitter() {
				const redirectUrl = `${API_URL}/connect/google?callback=http://localhost:8080/auth/google`
				window.location.href = redirectUrl

				// https://www.gethugames.in/2012/04/authentication-and-authorization-for-google-apis-in-javascript-popup-window-tutorial.html
				// const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
				// 								width=400,height=800`
				// const oauthWindow = window.open(
				// 	redirectUrl,
				// 	'Login to TiersMango',
				// 	params
				// )
				// const oauthWindowInterval = oauthWindow.setInterval(() => {
				// 	if (oauthWindow.closed) {
				// 		oauthWindow.clearInterval(oauthWindowInterval)
				// 		// Run code after close
				// 		console.log('loser')
				// 		// options.callback();
				// 	}
				// }, 1000)
			}
		}
	}
</script>
<style>
	.twitter-button {
		background-color: #1da1f2;
	}
	.google-button {
		background-color: #4285f4;
	}
</style>
