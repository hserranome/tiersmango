<template>
	<layout>
		<!-- Slider main container -->
		<swiper ref="mySwiper" :options="swiperOptions">
			<!-- Slides -->
			<TemplateCard
				v-for="template of templates"
				:key="`template-${template.id}`"
				:template="template"
				class="swiper-slide"
			/>
		</swiper>
	</layout>
</template>
<script>
	import { Swiper, directive } from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'

	import Layout from '@/components/Layout'
	import TemplateCard from '@/components/TemplateCard'

	export default {
		components: {
			Layout,
			TemplateCard,
			Swiper
		},
		directives: {
			swiper: directive
		},
		props: {
			templates: Array
		},
		data() {
			return {
				swiperOptions: {
					slidesPerView: 'auto'
					// Some Swiper option/callback...
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
