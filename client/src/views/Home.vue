<template>
	<div class="home">
		<TemplatesSlider
			:title="`Latest`"
			:button-text="`ALL`"
			:button-link="`/login`"
			:templates="templates"
			:loading="$apollo.loading"
		/>

		<TemplatesSlider
			:title="`Random`"
			:button-text="`random`"
			:templates="templates"
			:loading="$apollo.loading"
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
