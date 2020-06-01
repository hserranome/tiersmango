<template>
	<div :style="cssVars" class="tier-item" />
</template>
<script>
	export default {
		props: {
			tierItem: Object
		},
		computed: {
			cssVars() {
				const imagePath = this.tierItem.url.replace('/', '%2F')
				return {
					'--item-image': `url("https://firebasestorage.googleapis.com/v0/b/mangotier-8901f.appspot.com/o/${imagePath}?alt=media")`
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
