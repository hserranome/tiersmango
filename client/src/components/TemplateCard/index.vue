<template>
	<router-link
		class="template-card-wrapper"
		:to="`/tierlist/${template.id}/${template.name}`"
	>
		<a-card hoverable class="template-card">
			<div slot="cover" class="template-card-image-wrapper">
				<img
					:alt="template.name"
					class="template-card-image"
					:src="`${API_URL}${template.cover.formats.small.url}`"
				/>
			</div>
			<a-card-meta :title="template.name">
				<template slot="description">
					{{ template.category ? template.category.name : 'Random' }}
				</template>
			</a-card-meta>
		</a-card>
	</router-link>
</template>
<script>
	import Vue from 'vue'
	import { Card } from 'ant-design-vue'
	import { API_URL } from '../../utils/api'

	Vue.use(Card)

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
	.template-card-wrapper {
		width: 264px;
		margin: 0 2px;
		.template-card {
			width: 100%;
			border-radius: 10px;
			overflow: hidden;
			.template-card-image-wrapper {
				height: 264px;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.template-card-info {
				height: 150px;
			}
		}
	}
</style>
