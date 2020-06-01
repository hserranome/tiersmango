<template>
	<tr class="tier-row">
		<td class="tier-title">
			<div>{{ tier.title }}</div>
		</td>
		<td class="tier-items-wrapper">
			<draggable
				:list="tier.items"
				group="tierlistItems"
				v-bind="dragOptions"
				@start="drag = true"
				@end="drag = false"
			>
				<transition-group
					class="tier-items"
					type="transition"
					:name="!drag ? 'flip-list' : null"
				>
					<tier-item
						v-for="tierItem in tier.items"
						:key="`tierItem-${tierItem.url}`"
						:tier-item="tierItem"
					/>
				</transition-group>
			</draggable>
		</td>
	</tr>
</template>

<script>
	import draggable from 'vuedraggable'
	import TierItem from '../TierItem'

	export default {
		components: { TierItem, draggable },
		props: {
			position: Number,
			tier: Object,
			drag: Boolean,
			dragOptions: Object
		}
	}
</script>

<style lang="scss" scoped>
	.tier-items-wrapper {
		width: 100%;
	}
	.tier-items {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.tier-title {
		background: rgb(255, 127, 127);
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			min-width: 80px;
			min-height: 80px;
		}
	}
</style>
