<template>
	<layout>
		<!-- Slider main container -->
		<div class="templates-slider">
			<div class="title">
				<h3>{{ title }}</h3>
				<div class="buttons">
					<a-button v-if="buttonText !== 'random'"> {{ buttonText }} </a-button>
					<a-button v-if="buttonText === 'random'">
						<a-icon type="retweet"></a-icon>
					</a-button>
					<a-button-group class="arrow-buttons">
						<a-button :class="`btn-prev-${title.replace(/^\s+|\s+$/g, '')}`">
							<a-icon type="left"></a-icon>
						</a-button>
						<a-button :class="`btn-next-${title.replace(/^\s+|\s+$/g, '')}`">
							<a-icon type="right"></a-icon>
						</a-button>
					</a-button-group>
				</div>
			</div>
			<swiper ref="mySwiper" :options="swiperOptions" style="padding: 1rem;">
				<!-- Slides -->
				<TemplateCard
					v-for="template of templates"
					:key="`template-${template.id}`"
					:template="template"
					class="swiper-slide"
				/>
			</swiper>
		</div>
	</layout>
</template>
<script>
	import Vue from 'vue'
	import { Button, Icon } from 'ant-design-vue'
	import { Swiper, directive } from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'

	import Layout from '@/components/Layout'
	import TemplateCard from '@/components/TemplateCard'

	// Ant design components
	Vue.use(Button)
	Vue.use(Icon)
	Vue.use(Button.Group)

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
			templates: Array,
			title: String,
			buttonText: String,
			buttonCallback: Function
		},
		data() {
			return {
				swiperOptions: {
					slidesPerView: 'auto',
					navigation: {
						nextEl: `.btn-next-${this.title.replace(/^\s+|\s+$/g, '')}`,
						prevEl: `.btn-prev-${this.title.replace(/^\s+|\s+$/g, '')}`
					}
					// Some Swiper option/callback...
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.templates-slider {
		margin-top: 64px;
		position: relative;

		.title {
			padding: 1rem;
			padding-bottom: 0.5rem;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;

			h3 {
				font-size: 1.6rem;
				font-weight: 600;
				margin: 0;
				padding: 0;
			}
			.arrow-buttons {
				margin-left: 16px;
			}
		}
	}
</style>
