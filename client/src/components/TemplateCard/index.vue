<template>
	<router-link
		class="template-card-wrapper"
		:to="`/tierlist/${template.id}/${template.name}`"
	>
		<a-card hoverable class="template-card">
			<img
				v-if="template.cover"
				slot="cover"
				:alt="template.name"
				class="template-card-image"
				:src="`${API_URL}${template.cover.formats.small.url}`"
			/>
			<img
				v-else
				slot="cover"
				:alt="template.name"
				class="template-card-image"
				src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
			/>
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
			.template-card-image {
				height: 264px;
				object-fit: cover;
			}
			.template-card-info {
				height: 150px;
			}
		}
	}
</style>
