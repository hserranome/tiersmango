<template>
	<div class="page-wrapper">
		<h1 class="home-page-title">{{ tierList.name }}</h1>
		<tier-list :tier-list="tierList" />
	</div>
</template>

<script>
	import Backendless from 'backendless'
	import TierList from '../components/TierList'

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
					const { shortObjId, name } = this.$route.params
					const template = await Backendless.Data.of('TABLE-NAME').find({
						shortObjId,
						name
					})
					console.log('template')
					// Convert template to tierList format
					const tierList = {
						...template,
						tiers: [...template.tiers.map(tier => ({ title: tier, items: [] }))]
					}
					console.log(tierList)
					this.tierList = tierList
					this.tierList = {}
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
