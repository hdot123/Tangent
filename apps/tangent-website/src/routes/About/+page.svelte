<article>
	<div class="accross">
		<img class="me" src="my_face.jpg" alt="Taylor Hadden，Tangent 的开发者。" />
		<div>
			<p>
				
				Tangent 由
				<a href="http://everything-abridged.com/me/" target="_blank">Taylor Hadden</a> 创建。
				它旨在更好地支持他的
				<a href='https://everything-abridged.com/wikilogging' target="_blank">维基博客</a>
				笔记风格。
			</p>
			<p>
				他希望你也觉得它同样有用。
			</p>
			<p>
				你可以在 Mastodon 上关注他
				<a href="https://mastodon.social/@taylorhadden" target="_blank">@Cptn_ChillPill</a>。
			</p>
		</div>
	</div>
	
	<div class="icons">
		<a href="https://github.com/suchnsuch/Tangent" target="_blank" title="Tangent 的 Github 仓库">
			<picture>
				<source srcset="GitHub_Invertocat_Light.svg" media="(prefers-color-scheme:dark)" />
				<img src="GitHub_Invertocat_Dark.svg" width="64" height="64" alt="The Github Logo" />
			</picture>
		</a>
		<a href="https://discord.gg/6VpvhUnxFe" target="_blank" title="加入 Discord 社区">
			<img src="discord-icon.svg" width="64" height="64" alt="The Discord Logo"/>
		</a>
		<a href="https://indieapps.space/@tangentnotes" target="_blank" title="在 Mastodon 上关注 Tangent">
			<img src="mastodon-icon.svg" width="64" height="64" alt="The Mastodon Logo"/>
		</a>
	</div>
	<p>
		Tangent 在 <a href="https://github.com/hdot123/Tangent" target="_blank">Github</a> 上开发。
		采用 Apache 2.0 许可证开源。
	</p>
	<p>
		如果你有问题、建议，或者只是想聊聊 Tangent，可以在
		<a href="https://discord.gg/6VpvhUnxFe" target="_blank">Discord 社区</a>交流，
		或者在
		<a href="https://indieapps.space/@tangentnotes" target="_blank">Mastodon 上关注 @TangentNotes</a>。
	</p>

	<div class="icons">
		<a href="https://svelte.dev" target="_blank">
			<img src="svelte-icon.svg" width="64" height="64" alt="The Svelte Logo"/>
		</a>
		<a href="https://www.electronjs.org" target="_blank">
			<img src="electron-icon.svg" width="64" height="64" alt="The Electron Logo"/>
		</a>
	</div>

	<p>
		Tangent 使用
		<a href="https://svelte.dev" target="_blank">Svelte</a> 框架构建。
		
		桌面端基于
		<a href="https://www.electronjs.org" target="_blank">Electron</a>。
		
		文本编辑器基于深度定制的
		<a href="https://github.com/typewriter-editor/typewriter" target="_blank">Typewriter</a>
		编辑器。
	</p>
</article>

<style lang="scss">
.accross {
	max-width: var(--pageWidth);
	margin: 6em auto;
	display: flex;

	align-items: center;
}
img.me {
	margin-right: 2em;
	margin-left: -100px;
	width: 225px;
	height: 225px;

	border-radius: 200px;

	box-shadow: 0 0 10px rgba(0, 0, 0, .3);
}

.icons {
	max-width: var(--pageWidth);
	margin: 1.5em auto;
	margin-top: 6em;
	text-align: center;

	a {
		margin: 0 1em;
	}
}

@media (max-width: 550px) {
	.accross {
		flex-direction: column;
		margin-top: 1em;
	}
	img.me {
		margin: 0;
		width: 200px;
		height: 200px;
	}
}
</style>