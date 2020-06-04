<template>
	<layout class="tierlist-layout">
		<h1 class="home-page-title">{{ tierList.name }}</h1>
		<tier-list :tier-list="tierList" />
	</layout>
</template>

<script>
	import { api } from '@/utils/api'
	import Layout from '@/components/Layout'
	import TierList from '@/components/TierList'

	export default {
		components: { TierList, Layout },
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

	.tierlist-layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 5rem;
		.home-page-title {
			font-size: 28px;
			font-weight: bold;
			text-align: center;
			margin-bottom: 1em;
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
