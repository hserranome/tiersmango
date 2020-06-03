<template>
	<flickity ref="flickity" :options="flickityOptions">
		<div
			v-for="template of templates"
			:key="`template-${template.id}`"
			class="carousel-cell template-card"
		>
			<div class="template-card-image">
				<!-- <img src="" alt="" srcset="" /> -->
			</div>
			<div class="template-card-info">
				<h3>
					{{ template.name }}
				</h3>
				<p>{{ template.category }}</p>
			</div>
		</div>
	</flickity>
</template>
<script>
	import Flickity from 'vue-flickity'

	export default {
		components: {
			Flickity
		},
		props: {
			templates: Array
		},
		data() {
			return {
				flickityOptions: {
					initialIndex: 3,
					prevNextButtons: false,
					pageDots: false,
					wrapAround: true

					// any options from Flickity can be used
				}
			}
		}
	}
</script>
<style lang="scss" scoped></style>
