<script lang="ts">
import { getContext } from 'svelte';
import { isMac } from 'common/platform'
import type Workspace from 'app/model/Workspace'
import PopUpButton from 'app/utils/PopUpButton.svelte'

import Appearance from './Appearance.svelte'
import Attachments from './Attachments.svelte'
import CreationRules from './CreationRules.svelte'
import Database from './Database.svelte'
import Updates from './Updates.svelte'
import About from './About.svelte'
import Maps from './Maps.svelte'
import Notes from './Notes.svelte'
import Styles from './Styles.svelte'
import Dictionary from './Dictionary.svelte'
import Shortcuts from './Shortcuts.svelte'
import Debug from './Debug.svelte'
import DocumentationLink from 'app/utils/DocumentationLink.svelte'

export let detailsOpen = false

let workspace = getContext('workspace') as Workspace
let section = workspace.viewState.system.section

// Update Data
let updateState = workspace.updateState
let suppressUpdates = false
$: mode = updateState.mode
$: downloadProgress = updateState.downloadProgress

$: onModeChanged($mode)
function onModeChanged(_m?) {
	if ($mode === 'ready' && !suppressUpdates && !detailsOpen && workspace.viewState.modal.stack.length == 0) {
		detailsOpen = true
		section.set('更新')
	}
}

$: downloadPercent = $downloadProgress?.percent || 0

// Sub-menus
const menus = [
	{
		name: '外观',
		component: Appearance
	},
	{
		name: '附件',
		component: Attachments
	},
	{
		name: '创建规则',
		component: CreationRules
	},
	{
		name: '数据库',
		component: Database
	},
	{
		name: '地图',
		component: Maps
	},
	{
		name: '笔记',
		component: Notes
	},
	{
		name: '快捷键',
		component: Shortcuts
	},
	{
		name: '自定义样式',
		component: Styles
	},
	{
		name: '词典',
		component: Dictionary
	},
	{
		name: '更新',
		component: Updates
	},
	{
		name: '关于',
		component: About,
		documentation: false
	}
]

if (workspace.isPreviewBuild() || workspace.settings.updateChannel.value !== 'latest') {
	menus.push({
		name: '调试',
		component: Debug
	})
}

$: currentMenu = menus.find(m => m.name === $section) ?? menus[0]
</script>

<PopUpButton buttonClass="subtle"
	bind:showMenu={detailsOpen}
	menuMode="low-profile"
	tooltip={{
		tooltip: "打开设置",
		shortcut: isMac ? '⌘ ,' : 'Ctrl+,'
	}}
>
	<svelte:fragment slot="button">
		<div class={'buttonContent ' + $mode} class:supressed={suppressUpdates}>
			<svg style={`width: 24px; height: 24px;`}>
				{#if $mode === 'ready'}
					<use href="update.svg#arrow" />
				{:else}
				<use href="system.svg#gear" />
				{/if}
			</svg>
			<div class="progressBar" class:show={downloadPercent}>
				<div class="progress" style={`width: ${downloadPercent}%;`}></div>
			</div>
		</div>
	</svelte:fragment>
	<main class="SystemMenu">
		<nav>
			{#each menus as menu}
				<button
					on:click={() => $section = menu.name}
					class:current={menu === currentMenu}>
					{menu.name}
				</button>
			{/each}
		</nav>
		<article class="systemMenu">
			<h1>{currentMenu.name}</h1>
			{#if currentMenu.documentation !== false}
				<DocumentationLink
					pageName={currentMenu.documentation ?? currentMenu.name}
					pagePath={'Configuration/' + (currentMenu.documentation ?? currentMenu.name)}
					style="position: absolute;
						top: .5em;
						right: 10px;"
				/>
			{/if}
			<svelte:component this={currentMenu.component}/>
		</article>
	</main>
</PopUpButton>

<style lang="scss">
.progressBar {
	visibility: hidden;
	height: 4px;

	&.show {
		visibility: visible;
	}

	.progress {
		height: 100%;
		background-color: var(--accentTextColor);

		transition: width .1s;
	}
}

.buttonContent {
	display: flex;
	align-items: center;
	position: relative;
	&.ready {
		--updateFill: var(--accentTextColor);
		--iconStroke: var(--accentTextColor);
	}
	&.supressed {
		--updateFill: none;
	}
	&.error {
		--updateFill: red;
		--iconStroke: red;
	}

	.progressBar {
		position: absolute;
		bottom: 1px;
		width: 100%;
		height: 3px;
	}
}

main {
	display: flex;
	padding: 4px;
	background-color: var(--backgroundColor);

	max-height: calc(100vh - var(--topBarHeight) - 8px);
}

nav {
	background: var(--noteBackgroundColor);
	padding: 4px 0px 4px 4px;

	overflow: auto;

	button {
		display: block;
		width: 100%;
		font-size: 110%;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;

		background-color: transparent;
		text-align: right;

		&.current, &:active {
			background-color: var(--backgroundColor);
		}
	}
}

article {
	padding: 4px 4px 8px 8px;

	display: flex;
	flex-direction: column;
	font-size: 90%;

	width: 500px;
	overflow: auto;
}

h1 {
	margin-top: 0;
	text-align: center;
	font-weight: 500;
}

:global {
	.systemMenu {
		h2 {
			margin: .25em;
			font-weight: 500;
		}

		.info {
			color: var(--deemphasizedTextColor);
			padding: 1em 3em;
			margin: 0;
		}

		.settingsGroup {
			margin-bottom: 1.5em;
			border-spacing: .25em .5em;

			display: grid;
			grid-template-columns: max-content auto;
			row-gap: .5em;
			column-gap: .25em;
			grid-auto-rows: auto;
			align-items: center;

			.SettingView {
				display: contents;

				h2 {
					grid-column: 1;
					text-align: right;
				}
				.value {
					grid-column: 2;
				}
			}

			> p {
				margin-bottom: 0;
			}

			.value-details {
				grid-column: 2;
			}

			.explanation {
				color: var(--deemphasizedTextColor);
				font-size: 90%;
			}
		}
	}
}

</style>
