<template>
	<p>Authenticating</p>
</template>

<script>
	export default {
		name: 'Auth',
		methods: {
			handleTwitter() {
				console.log(this.$this.params)
			}
		}
	}
</script>
<style>
	.twitter-button {
		background-color: #1da1f2;
	}
</style>
