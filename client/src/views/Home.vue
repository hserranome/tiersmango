<template>
	<div class="home">
		<TemplatesSlider
			:title="`Latest`"
			:button-text="`ALL`"
			:templates="templates"
		/>

		<TemplatesSlider
			:title="`Random`"
			:button-text="`random`"
			:templates="templates"
		/>
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
							cover {
								formats
							}
						}
					}
				`,
				update: data => data.templates
			}
		}
	}
</script>
