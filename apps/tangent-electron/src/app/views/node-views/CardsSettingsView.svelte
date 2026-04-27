<script lang="ts">
import type CardsViewState from 'app/model/nodeViewStates/CardsViewState'
import SettingView from '../System/SettingView.svelte'

export let state: CardsViewState
$: settings = state.settings
</script>

<SettingView
	setting={settings.sorting.sortKey}
	name="排序方式"
	display="inline"
	form="select"
	inputClass="arrowNavigate"
	showReset={false}
/>
<SettingView
	setting={settings.sorting.sortOrder}
	name="排序方向"
	display="inline"
	form="select"
	inputClass="arrowNavigate"
	showReset={false}
/>
<SettingView
	display="inline"
	setting={settings.showWordCount}
	inputClass="arrowNavigate"
	showReset={false}
/>
