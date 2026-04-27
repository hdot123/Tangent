<script lang="ts">
import { pluralize } from 'common/plurals'
import type QueryViewState from 'app/model/nodeViewStates/QueryViewState'

interface Props {
	state: QueryViewState
}

let {
	state: queryViewState
}: Props = $props()

let children = $derived(queryViewState.nodes)
let stats = $derived.by(() => {
	return pluralize($children.length, '找到 $$ 项', '找到 1 项', '未找到结果')
})

</script>
<span>{stats}</span>