<template>
	<layout>
		<flickity
			ref="flickity"
			:options="flickityOptions"
			class="templates-slider"
		>
			<TemplateCard
				v-for="template of templates"
				:key="`template-${template.id}`"
				:template="template"
			/>
		</flickity>
	</layout>
</template>
<script>
	import Flickity from 'vue-flickity'
	import Layout from '@/components/Layout'
	import TemplateCard from '@/components/TemplateCard'

	export default {
		components: {
			Flickity,
			Layout,
			TemplateCard
		},
		props: {
			templates: Array
		},
		beforeRouteLeave(from, to, next) {
			const slider = this.$refs.flickity.$el
			slider.style.transition = 'opacity .25s ease'
			slider.style.opacity = 0
			setTimeout(() => {
				next()
			}, 250)
		},
		data() {
			return {
				flickityOptions: {
					groupCells: '100%',
					pageDots: false
					// any options from Flickity can be used
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.templates-slider {
		padding: 0 14px;
	}
</style>
