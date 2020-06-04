<template>
	<div class="container">
		<layout class="nav-layout">
			<vue-navigation-bar :options="navbarOptions" class="navbar">
				<!-- <template v-slot:custom-section>
			<div class="search-box"><input aria-label="Search" autocomplete="off" spellcheck="false" value="" class=""></div>
		</template> -->
			</vue-navigation-bar>
		</layout>
	</div>
</template>

<script>
	import VueNavigationBar from 'vue-navigation-bar'
	import 'vue-navigation-bar/dist/vue-navigation-bar.css'
	import Layout from '@/components/Layout'
	import brandImage from '@/assets/img/tiers-logo.svg'

	export default {
		components: { VueNavigationBar, Layout },
		data() {
			return {
				navbarOptions: {
					elementId: 'main-navbar',
					isUsingVueRouter: true,
					mobileBreakpoint: 992,
					brandImagePath: '/',
					brandImage,
					brandImageAltText: 'brand-image',
					showBrandImageInMobilePopup: true,
					ariaLabelMainNav: 'Main Navigation',
					tooltipAnimationType: 'shift-away',
					menuOptionsRight: [
						{
							type: 'link',
							text: 'Template editor',
							path: '/template-editor'
						},
						{
							type: 'link',
							text: 'Login',
							path: '/login'
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/theme/variables.scss';
	.container {
		background: #1a1a1a;
		.nav-layout {
			max-width: 1350px;
		}
		.vnb {
			background: #1a1a1a;
			max-width: 1440px;
			height: 68px;
			&.offline {
				background: $navbar-offline-color;
				.links .nav-links .nav-item a,
				.site-name {
					color: white;
				}
			}

			.user-picture {
				max-height: 32px;
				margin-left: 1.5rem;
				border-radius: 50%;
			}

			.offline-label {
				padding: 0px 10px;
				border: 1px solid white;
				border-radius: 5px;
				color: white;
				margin-left: 1.5rem;
			}
		}
	}
</style>
