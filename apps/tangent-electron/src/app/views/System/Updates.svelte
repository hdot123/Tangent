<script lang="ts">
import { getContext } from 'svelte'
import { slide } from 'svelte/transition'

import * as dates from 'common/dates'

import type Workspace from 'app/model/Workspace'
import SettingView from './SettingView.svelte'

let workspace = getContext('workspace') as Workspace
let state = workspace.updateState

let suppressUpdates = false

$: channel = workspace.settings.updateChannel

$: mode = state.mode
$: lastChecked = state.lastChecked
$: nextUpdate = state.nextUpdate
$: downloadProgress = state.downloadProgress
$: errorMessage = state.errorMessage

$: buttonText = getButtonText($mode, $nextUpdate)
function getButtonText(_m?, _n?) {
	const version = $nextUpdate?.version || ''
	switch ($mode) {
		case 'idle':
		case 'up-to-date':
		case 'error':
			return '检查更新'
		case 'checking':
			return '检查中…'
		case 'available':
			return `下载 ${version}`
		case 'downloading':
			return `正在下载 ${version}`
		case 'ready':
			return `退出并更新到 ${version}`
	}
}

$: downloadPercent = $downloadProgress?.percent || 0

function buttonClicked() {
	switch ($mode) {
		case 'idle':
		case 'up-to-date':
		case 'error':
			return state.checkForUpdate()
		case 'ready':
			return state.updateNow()
	}
}

function laterButtonClick() {
	suppressUpdates = true
}

</script>

<main>
	<p>
		<SettingView setting={channel} showReset={false} />
	</p>
	{#if $channel === 'beta'}
		<p class="message">
			Beta 渠道可能包含 Bug。
			如果你遇到 Bug，请
			<a target="_blank" rel="noreferrer" href="https://mastodon.social/@taylorhadden">在 Mastodon 上告诉我</a>。
		</p>
	{:else if $channel === 'alpha'}
		<p class="message warning">
			此渠道<em>一定</em>会包含 Bug。
			只有在你可以接受稳定性风险时才选择此渠道。
			如果你遇到 Bug，请
			<a target="_blank" rel="noreferrer" href="https://mastodon.social/@taylorhadden">在 Mastodon 上告诉我</a>。
		</p>
	{/if}

	<article>
		<button
			class="updateButton"
			on:click={buttonClicked}
			disabled={$mode === 'checking' || $mode === 'downloading'}
		>
			<div>{buttonText}</div>
			{#if downloadPercent}
				<div class="progressBar show" transition:slide={{ duration: 300 }}>
					<div class="progress" style={`width: ${downloadPercent}%;`}></div>
				</div>
			{/if}
		</button>

		{#if $mode === 'up-to-date'}
			<p class="info up-to-date" transition:slide={{ duration: 300 }}>
				你已是最新版本！
			</p>
		{/if}

		{#if $mode === 'ready'}
			<p class="info ready" transition:slide={{ duration: 300 }}>
				更新到 {$nextUpdate.version} 已准备就绪！
				更新将在退出时自动应用，或者你也可以现在更新。
			</p>
			{#if suppressUpdates}
				<p class="info">
					更新通知已抑制，直到下次退出。
				</p>
			{:else}
				<p class="laterButton">
					<button on:click={laterButtonClick}>稍后更新</button>
				</p>
			{/if}
		{/if}
		{#if $mode === 'error'}
			<div class="info" transition:slide={{ duration: 300 }}>
				<p>
					更新{#if $nextUpdate}到 {$nextUpdate.version}{/if}失败！
				</p>
				<p class="error">
					错误："{$errorMessage}"
				</p>
				<p>
					You can try to check for updates again, or
					<a href="http://tangentnotes.com/Download" target="_blank" rel="noreferrer">download the latest installer.</a>
				</p>
			</div>
			
		{/if}

		<p class="lastChecked" class:show={$lastChecked != null}>
			当前版本 v{workspace.version}。
			{#if $lastChecked != null}
				Last checked: {dates.shortestDayDate($lastChecked)}, {dates.clockTime($lastChecked)}
			{/if}
		</p>
		<p class="space"></p>
		<SettingView setting={workspace.settings.automaticallyCheckForUpdates}/>
	</article>
</main>

<style lang="scss">
.message {
	font-size: 80%;
	margin: 1em 2em;
	line-height: 1.25em;
}

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

.warning {
	color: var(--warningTextColor);
}

article {
	width: 350px;
	margin: 0 auto;
}

p {
	&:first-child {
		margin-top: 0
	}
	&:last-child {
		margin-bottom: 0;
	}
}

.updateButton {
	width: 100%;

	.progressBar {
		margin-top: 8px;
	}
}

.laterButton {
	font-size: 80%;
	text-align: center;
}

.lastChecked {
	font-size: 70%;
}

.up-to-date {
	text-align: center;
}

.info {
	font-size: 80%;
}

.error {
	color: red;
}

.space {
	margin-bottom: 3em;
}
</style>

