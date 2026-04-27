<script lang="ts">
import type { PageData } from './$types'
import DownloadList from './DownloadList.svelte'
import { channels } from '../types'
import type { BuildSet, Build, SKU } from '../types'
import { onMount } from 'svelte'

type BuildResult = {
	builds?: BuildSet
	highlightChoice?: SKU
	altChoices?: SKU[]
}

export let data: PageData

async function getBuilds(): Promise<BuildResult> {
	console.log('Fetching…')
	const res = await fetch('/versions/latest')
	if (!res.ok) {
		throw new Error('Could not fetch builds')
	}

	const builds = await res.json() as BuildSet

	const latest = builds.latest
	if (!latest) {
		throw new Error('No latest build!')
	}

	// Remove duplicate alpha/beta builds
	const version = latest.version
	const dupeList = ['alpha', 'beta'] as const
	for (const key of dupeList) {
		if (builds[key]?.version === version) {
			delete builds[key]
		}
	}

	return {
		builds,
		highlightChoice: latest.skus[data.highlightChoice],
		altChoices: data.altChoices.map(c => latest.skus[c]),
	}
}

let buildFetchProcess: Promise<BuildResult> = new Promise(() => {})

onMount(() => {
	buildFetchProcess = getBuilds()
})

function releaseDate(dateString: string) {
	let date = new Date(dateString)
	return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

function osNameShim(osName: string) {
	let match = osName.match(/\(.*\)/)
	if (match) {
		let split = osName.split(match[0])
		return split[0] + '<span class="osSub">' + match[0] + '</span>' + split[1]
	}
	return osName;
}

</script>

<article>
	<h1>加入公开测试</h1>
	<p>
		Tangent 在 <a href="https://github.com/hdot123/Tangent" target="_blank">Github</a> 上公开开发。
		应用开源且永久免费！
		来加入我们吧！
	</p>
	{#await buildFetchProcess}
		<p class="checking-latest">检查最新构建…</p>
	{:then result}
		{@const { builds, highlightChoice, altChoices } = result}
		{#if highlightChoice}
			<p class="main-link">
				<a class={highlightChoice.os} href={highlightChoice.path}>
					<span class="icon"></span>
					<span class="version">
						下载
						v{highlightChoice.version}
						适用于 {highlightChoice.displayName}
					</span>
					<span class="date">发布于 {releaseDate(highlightChoice.releaseDate)}</span>
				</a>
			</p>

			{#if altChoices.length}
				<p class="links">
					或下载其他平台版本：
					{#each altChoices as choice}
						{#if choice} <!--TODO: Remove once portables are standard-->
						<a href={choice.path}>{@html osNameShim(choice.displayName)}</a>
						{/if}
					{/each}
				</p>
			{/if}
		{/if}

		<p>
			Tangent 也可在
			<a target="_blank" rel="noopener" href="https://flathub.org/apps/io.github.suchnsuch.Tangent">Flathub</a> 上获取。
		</p>
			
		<p>
			如果你遇到 Bug，或想到希望 Tangent 拥有的功能，可以通过以下方式联系我们：
		</p>

		<ul>
			<li>在 <a href="https://github.com/hdot123/Tangent/issues" target="_blank">Github</a> 上提交 Issue。</li>
			<li>在 <a href="https://discord.gg/6VpvhUnxFe" target="_blank">Discord</a> 社区发帖。</li>
			<li>在 <a href="https://mastodon.social/@tangentnotes" target="_blank">Mastodon</a> 上关注项目。</li>
		</ul>

		<p>无论哪种方式，我们都会尽力帮助你。</p>
	
		{#if builds.beta || builds.alpha}
			<h1>开发版构建</h1>
		{/if}
		{#if builds.beta}
			<h2>Beta - 发布预览</h2>
			<DownloadList build={builds.beta}/>
			<p>
				Beta 构建是即将发布的稳定版的预览版本。
				它们旨在保持稳定，但仍可能包含 Bug。
			</p>
		{/if}
		{#if builds.alpha}
			<h2>Alpha - 前沿版本</h2>
			<DownloadList build={builds.alpha}/>
			<p>
				Alpha 构建让你尽快体验
				<a href="/路线图">即将推出的功能</a>。
				这些版本的稳定性和 Bug 最多；
				但对这些版本的反馈将产生最大的影响！
			</p>
		{/if}

		{#if builds.legacy}
			<h1>Tangent 传统版</h1>
			<p>
				For those of you remaining on MacOS Catalina (10.15.x), Tangent Legacy looks to offer as close to the same experience as the mainline Tangent builds,
				but running on a compatible Electron version
				<a target="_blank" href="https://www.electronjs.org/blog/electron-33-0#removed-macos-1015-support">(32.x)</a>:
			</p>
			<DownloadList build={builds.legacy}/>
			<p>
				此传统版 Tangent 将以合理的节奏跟进稳定版发布，不会自动升级到不兼容的版本。
			</p>
		{/if}
	{:catch}
		<p class="fetch-error">出错了。无法获取构建信息。请刷新页面重试。</p>
	{/await}
</article>

<style lang="scss">
.main-link {
	text-align: center;

	a {
		display: inline-grid;
		justify-content: center;
		align-items: center;
		background-color: var(--accentBackgroundColor);
		color: var(--textColor);
		padding: .75em 1.5em;
		border-radius: .75em;

		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		grid-template-areas: "icon version"
							"icon date";

		&:hover {
			background-color: var(--accentHoverBackgroundColor);
			text-decoration: none;
		}
		&:active {
			background-color: var(--accentActiveBackgroundColor);
		}

		.icon {
			grid-area: icon;
			display: inline-block;
			width: 24px;
			height: 24px;
			background-size: 24px 24px;
			background-repeat: no-repeat;
			margin-right: 2em;
		}

		.version {
			grid-area: version;
		}
		
		.date {
			font-size: 70%;
			grid-area: date;
			font-style: italic;
		}

		&.mac .icon {
			background-image: url("/mac_logo.svg");
		}

		&.win .icon {
			background-image: url("/windows_logo.svg");
		}
	}
}

ul {
	padding-left: 3em;
	margin-top: .25em;
}

.links {
	text-align: left;
	font-style: italic;
	color: var(--deemphasizedTextColor);

	width: 225px;
	margin: 0 auto;

	a {
		margin-left: 2em;
		display: block;
		font-style: normal;
		white-space: nowrap;

		:global(.osSub) {
			position: relative;
			font-size: 70%;
			bottom: .125em;
		}
	}
}

.checking-latest {
	margin-top: 5em;
	text-align: center;
	font-style: italic;
	color: var(--deemphasizedTextColor);
}
</style>
