<script lang="ts">
import type { Workspace } from 'app/model'
import { getContext } from 'svelte'

const workspace: Workspace = getContext('workspace')

function openDocumentation() {
	workspace.api.documentation.open('Getting Started')
}
</script>

<main>
	<p class="logo">
		
	</p>
	<p class="version">v{workspace.version}</p>
	<p>
		<span class="tangent">Tangent</span> 由
		<a target="_blank" rel="noreferrer" href="http://tangentnotes.com/About">Taylor Hadden</a>
		开发。它旨在帮助你在写作时追随自己的兴趣。
		不再迷失方向，不再丢失思路。
	</p>
	<p>
		
	</p>
	<p>
		<!-- svelte-ignore a11y-invalid-attribute -->
		如有疑问，请查看<a href="#" on:click={openDocumentation} class="local">文档</a>。
		如果文档不能满足你的需求，可以通过以下方式联系我们
		<a target="_blank" rel="noreferrer" href="https://discord.gg/6VpvhUnxFe">Discord</a>,
		<a target="_blank" rel="noreferrer" href="https://indieapps.space/@tangentnotes">Mastodon</a>, or through
		<a target="_blank" rel="noreferrer" href={`mailto: contact@tangentnotes.com?Subject=Tangent v${workspace.version}`}>email</a>.
	</p>
	<p>
		Tangent 目前处于早期开发阶段。
		如果你遇到 Bug、有问题或想建议新功能，请
		<a target="_blank" rel="noreferrer" href="https://github.com/suchnsuch/tangent-public/issues/new">在 GitHub 上提交 Issue</a>
		或通过上述社交平台联系我们。
	</p>
	<h1>支持者</h1>
	<p style:margin-bottom="0">以下人员做出了卓越贡献：</p>
	<ul>
		<li>Trevor Slaton</li>
		<li>Paul Williams</li>
		<li>Dormouse</li>
		<li>Jose Quesada</li>
		<li>Ethan LP</li>
	</ul>
</main>

<style lang="scss">
.tangent {
	color: var(--accentTextColor);
}

main {
	padding: 0 2em;
	font-size: 90%;
}

.logo {
	background-image: url('tangent-icon.svg');
	background-repeat: no-repeat;
	background-position: center;
	height: 8em;
}

.version {
	text-align: center;
	color: var(--deemphasizedTextColor);
	font-style: italic;
}

ul {
	column-count: 2;
}
</style>
