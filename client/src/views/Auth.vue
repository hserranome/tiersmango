<template>
	<layout class="auth-layout">
		<Spin v-if="!authError" tip="Authenticating..." size="large" />
		<Result
			v-else
			status="error"
			title="Authentication failed"
			sub-title="Please try again later."
		>
			<template #extra>
				<router-link to="/">
					<Button key="console" type="primary">
						Go Home
					</Button>
				</router-link>
				<router-link to="/login">
					<Button key="buy">
						Try again
					</Button>
				</router-link>
			</template>
		</Result>
	</layout>
</template>

<script>
	import Layout from '@/components/Layout'
	import { Result, Spin, Button } from 'ant-design-vue'
	import { api } from '../utils/api'

	export default {
		name: 'Auth',
		components: { Layout, Result, Spin, Button },
		data() {
			return {
				authError: false
			}
		},
		created() {
			this.handleAuth()
		},
		methods: {
			handleAuth() {
				const { provider } = this.$route.params
				const { error } = this.$route.query
				if (!error) {
					try {
						const { search } = window.location
						api.get(`/auth/${provider}/callback${search}`)
						// Put data into store, JWT into cookies and api and redirect
					} catch (err) {
						console.error(err)
						this.authError = true
					}
				} else {
					this.authError = true
				}
			}
		}
	}
</script>
<style>
	.auth-layout {
		padding-top: 80px !important;
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.twitter-button {
		background-color: #1da1f2;
	}
</style>
