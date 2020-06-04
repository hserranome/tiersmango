<template>
	<layout class="login-container">
		<Button
			class="social-login-button google-button"
			icon="google"
			@click="() => handleProvider('google')"
		>
			Login with Google
		</Button>
		<Button
			type="primary"
			class="social-login-button twitter-button"
			icon="twitter"
			@click="() => handleProvider('twitter')"
		>
			Login with Twitter
		</Button>
	</layout>
</template>

<script>
	import Layout from '@/components/Layout'
	import { Button } from 'ant-design-vue'
	import { API_URL } from '../utils/api'

	export default {
		name: 'Login',
		components: { Button, Layout },
		methods: {
			async handleProvider(provider) {
				const redirectUrl = `${API_URL}/connect/${provider}`
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
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 140px !important;
	}
	.social-login-button {
		margin-bottom: 20px;
	}
	.twitter-button {
		background-color: #1da1f2;
	}
	.google-button {
		background-color: #ffffff;
	}
</style>
