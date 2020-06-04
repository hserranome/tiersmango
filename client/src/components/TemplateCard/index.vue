<template>
	<router-link
		class="template-card carousel-cell"
		:to="`/tierlist/${template.id}/${template.name}`"
	>
		<div class="template-card-image"></div>
		<div class="template-card-info">
			<h3>
				{{ template.name }}
			</h3>
			<p>{{ template.category && template.category.name }}</p>
		</div>
	</router-link>
</template>
<script>
	export default {
		name: 'TemplateCard',
		props: {
			template: Object
		}
	}
</script>
<style lang="scss" scoped>
	.template-card {
		background: #424242;
		width: 264px;
		margin: 0 2px;
		.template-card-image {
			height: 264px;
		}
		.template-card-info {
			height: 150px;
		}
	}
</style>
