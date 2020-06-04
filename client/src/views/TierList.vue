<template>
	<div class="page-wrapper">
		<h1 class="home-page-title">{{ tierList.name }}</h1>
		<tier-list :tier-list="tierList" />
	</div>
</template>

<script>
	import { api } from '@/utils/api'
	import TierList from '@/components/TierList'

	export default {
		components: { TierList },
		props: {
			id: String
		},
		data() {
			return {
				loading: true,
				tierList: {}
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			async fetchData() {
				try {
					const { id } = this.$route.params
					const res = await api.get(`/templates/${id}`)
					const template = res.data
					// Convert template to tierList format
					const tierList = {
						...template,
						tiers: [
							...Object.entries(template.tiers).map(([, tier]) => ({
								...tier,
								items: []
							}))
						]
					}
					this.tierList = tierList
					this.loading = false
				} catch (err) {
					// Redirect 404
					console.error(err)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/theme/variables.scss';

	.page-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 1440px;
		padding: 0 20px;
		margin: 0 auto;

		.logo {
			margin-bottom: 3rem;
		}

		.home-page-title {
			text-align: center;
		}

		.documentation-link {
			display: inline-block;
			font-size: 1.2rem;
			color: #fff;
			background-color: #5d6788;
			padding: 0.8rem 1.6rem;
			border-radius: 4px;
			transition: background-color 0.1s ease;
			box-sizing: border-box;
			text-decoration: none;
			width: fit-content;
			font-weight: 500;
		}
	}
</style>
