<template>
	<div class="home">
		<TemplatesSlider :templates="templates" />
	</div>
</template>

<script>
	// @ is an alias to /src
	import gql from 'graphql-tag'
	import TemplatesSlider from '@/components/TemplatesSlider'

	export default {
		name: 'Home',
		components: {
			TemplatesSlider
		},
		apollo: {
			templates: {
				query: gql`
					query {
						templates(sort: "created_at:desc") {
							name
							id
							category {
								name
								value
							}
							tiers {
								name
							}
						}
					}
				`,
				update: data => data.templates
			}
		}
	}
</script>
