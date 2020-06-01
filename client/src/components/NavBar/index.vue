<template>
	<vue-navigation-bar :options="navbarOptions" class="navbar">
		<!-- <template v-slot:custom-section>
			<div class="search-box"><input aria-label="Search" autocomplete="off" spellcheck="false" value="" class=""></div>
		</template> -->
	</vue-navigation-bar>
</template>

<script>
	import VueNavigationBar from 'vue-navigation-bar'
	import 'vue-navigation-bar/dist/vue-navigation-bar.css'
	import brandImage from '@/assets/img/tier-icon.svg'

	export default {
		components: { VueNavigationBar },
		data() {
			return {
				navbarOptions: {
					elementId: 'main-navbar',
					isUsingVueRouter: true,
					mobileBreakpoint: 992,
					brandImagePath: './',
					brandImage,
					brandImageAltText: 'brand-image',
					showBrandImageInMobilePopup: true,
					ariaLabelMainNav: 'Main Navigation',
					tooltipAnimationType: 'shift-away',
					menuOptionsLeft: [
						{ type: 'link', text: 'TiersMango', path: './', class: 'title' }
					],
					menuOptionsRight: [
						{
							type: 'link',
							text: 'Template editor',
							path: './template-editor'
						},
						{
							type: 'link',
							text: 'Login',
							path: './login'
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/theme/variables.scss';

	.navbar {
		background-color: $navbar-color;
		border-bottom: 1px solid #eaecef;
	}
	.vnb {
		.title {
			font-size: 1.3rem;
			font-weight: 600;
			color: #2c3e50;
			position: relative;
		}
		/* a {
    display: flex;
    align-items: center;
  }



  .title-mobile {
    display: none;
  }

  @media (max-width: 500px) {
    padding: 0.7rem 0.7rem;

    .can-hide {
      display: none;
    }

    .title-desktop {
      display: none;
    }

    .title-mobile {
      display: block;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    position: relative;
  }

  .logo {
    height: 24px;
    padding-right: 8px;
  } */

		/* .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
    display: flex;

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-item {
        position: relative;
        display: inline-block;
        margin-left: 1.5rem;
        line-height: 2.2rem;

        &:first-child {
          margin-left: 0;
        }

        a {
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          color: $navbar-link-color;
          border-color: #2c3e50;
          line-height: 1.4rem;
          display: inline-block;
          cursor: pointer;
        }

        @mixin activatedLink() {
          margin-bottom: -2px;
          border-bottom: 2px solid $vue-color;
        }

        .router-link-active {
          @include activatedLink;
        }

        @media (hover) {
          :hover {
            @include activatedLink;
          }
        }
      }
    }
  } */

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
</style>
