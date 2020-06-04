<template>
	<router-link
		class="template-card carousel-cell"
		:to="`/tierlist/${template.id}/${template.name}`"
	>
		<div
			v-if="template.cover"
			class="template-card-image"
			:style="
				`background-image: url(${API_URL}${template.cover.formats.small.url})`
			"
		/>
		<div v-else class="template-card-image no-image" />
		<div class="template-card-info">
			<h3>
				{{ template.name }}
			</h3>
			<p>{{ template.category && template.category.name }}</p>
		</div>
	</router-link>
</template>
<script>
	import { API_URL } from '../../utils/api'

	export default {
		name: 'TemplateCard',
		props: {
			template: Object
		},
		data() {
			return {
				API_URL
			}
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
			width: 100%;
			background-position: center;
			background-size: cover;
			background-color: #cccccc;
		}
		.template-card-info {
			height: 150px;
		}
	}
</style>
