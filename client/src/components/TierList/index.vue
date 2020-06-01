<template>
	<div class="tier-list-main">
		<table class="tier-table">
			<tbody>
				<tier-row
					v-for="(tier, index) in tierList.tiers"
					:key="`tier-${index}`"
					:position="index"
					:tier="tier"
					:drag="drag"
					:drag-options="dragOptions"
				/>
			</tbody>
		</table>
		<draggable
			:list="tierList.items"
			group="tierlistItems"
			v-bind="dragOptions"
			@start="drag = true"
			@end="drag = false"
		>
			<transition-group
				class="tierlist-items-deck"
				type="transition"
				:name="!drag ? 'flip-list' : null"
			>
				<tier-item
					v-for="item in tierList.items"
					:key="`tierItem-${item.url}`"
					:tier-item="item"
				/>
			</transition-group>
		</draggable>
		<div>{{ tierList }}</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import TierRow from '../TierRow'
	import TierItem from '../TierItem'

	export default {
		components: { TierRow, TierItem, draggable },
		display: 'Transitions',
		props: {
			tierList: Object
		},
		data() {
			return {
				drag: false
			}
		},
		computed: {
			dragOptions() {
				return {
					animation: 200,
					group: 'description',
					disabled: false,
					ghostClass: 'ghost'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/theme/variables.scss';
	.tier-list-main {
		width: 100%;
	}
	.tier-table {
		background: #1a1a1a;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.tierlist-items-deck {
		margin-top: 20px;
		display: flex;
		flex-wrap: wrap;
	}

	.flip-list-move {
		transition: transform 0.5s;
	}
	.no-move {
		transition: transform 0s;
	}
	.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
	.list-group {
		min-height: 20px;
	}
	.list-group-item {
		cursor: move;
	}
	.list-group-item i {
		cursor: pointer;
	}
</style>
