<template>
	<div class="main-content">
		<slot />
	</div>
</template>
<script>
	export default {
		name: 'Layout'
	}
</script>
<style lang="scss" scoped>
	.main-content {
		max-width: 1200px;
		padding: 0 20px;
		margin: 0 auto;
	}
</style>
