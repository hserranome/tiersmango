<template>
	<div :style="cssVars" class="tier-item" />
</template>
<script>
	import { API_URL } from '@/utils/api'

	export default {
		props: {
			tierItem: Object
		},
		computed: {
			cssVars() {
				return {
					'--item-image': `url("${API_URL}${this.tierItem.formats.small.url}"`
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tier-item {
		width: 80px;
		height: 80px;
		background-image: var(--item-image);
		background-position: center;
		background-size: cover;
		background-color: #cccccc;
	}
</style>
