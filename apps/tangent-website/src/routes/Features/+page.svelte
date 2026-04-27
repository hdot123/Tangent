<script>
import ImageSwitch from '../ImageSwitch.svelte'
import '../style.css'

</script>
<article>
	<section>
		<h1>思维线索</h1>
		<ImageSwitch path="/shots/thread" class="screenshot" alt="Tangent 线索视图示例，多个笔记堆叠展示。" />
		<p>
			当你跟随和创建链接时，你的路径会被保留，并在<span class="accentText">线索视图</span>中以水平滑动面板的形式展示。
			这些面板让你可以轻松地在思维路径上滑动。
		</p>
		<p>
			自由探索，不丢失位置。
		</p>
	</section>

	<section>
		<h1>认知地图</h1>
		<ImageSwitch path="/shots/blades-map" class="screenshot" alt="Tangent 可以追踪笔记之间的复杂连接，是桌面 RPG 的绝佳伙伴。" />
		<p>
			通过<span class="accentText">地图视图</span>鸟瞰你的思维过程。
			节点和连接在你写作和导航时自动创建。
		</p>
		<p>
			在深入自己思维的迷宫后获得全局视角。
			提醒自己昨天在做什么。
			发现新的联系并重新投入。
		</p>
		<p>
			不再迷失。
		</p>
	</section>
	


	<section>
		<h1>优雅的 Markdown<sup>风格</sup></h1>
		<ImageSwitch path="/shots/markdown-syntax" class="screenshot" alt="Tangent 中 Markdown 文本渲染示例。" />
		<p>
			Tangent 在你输入时即完整渲染 Markdown 样式。
			标记符号在你不需要时消隐，需要时立即显示。
		</p>
		<p>
			支持标题、加粗、斜体、高亮、网页链接、嵌入图片、列表、YAML Front Matter、LaTeX 数学公式、Mermaid 图表和带语法高亮的代码块。
		</p>
	</section>


	<section>
		<h1>轻松的维基链接</h1>
		<ImageSwitch path="/shots/wiki-links" class="screenshot" alt="多个维基链接的反向链接展示示例。" />
		<p>
			Tangent 使用维基风格的<span class="accentText">[[双方括号链接]]</span>通过文件名连接笔记。
			自动补全让这一切变得简单。
		</p>
		<p>
			笔记知道自己链接到了什么，<em>也</em>知道什么链接到了<em>自己</em>。
			如果你从 Obsidian 转过来，你的笔记链接已经可以直接使用！
		</p>
	</section>


	<section>
		<h1>嵌入媒体</h1>
		<ImageSwitch path="/shots/embeds" class="screenshot" alt="A showcase of embedded audio, video, and images." />
		<p>
			Tangent 在工作区内展示图片、音频、视频和 PDF。直接将本地或远程媒体嵌入你的笔记。
		</p>
	</section>


	<section>
		<h1>极简专注模式</h1>
		<ImageSwitch path="/shots/focus-mode" class="screenshot" alt="An example of Tangent's sentence-level focus mode." />
		<p>
			将注意力集中在一条笔记、一个段落、一句话上。
			Tangent 会清除其他干扰，同时保留你的位置。
		</p>
	</section>

	<section>
		<h1>标签</h1>
		<ImageSwitch path="/shots/todo-tag" class="screenshot" alt="An example of using tags and to-do items in Tangent."/>
		<p>
			轻松为笔记添加额外上下文标记。
			支持嵌套标签，满足组织狂的需求。
		</p>

		<h1>待办事项</h1>
		<p>
			为列表项添加待办复选框，跟踪仍在进行中的任务。
		</p>
	</section>
	

	<section>
		<h1>自定义查询语言</h1>
		<ImageSwitch path="/shots/queries" class="screenshot" alt="An example of Tangent's query language in action." />
		<p>
			使用自定义查询语言，根据链接、标签、待办或任意文本轻松查找工作区中的笔记。
		</p>
		<p>
			保存查询并随时引用。你甚至可以在其他查询中使用它们！
		</p>
	</section>


	<section>
		<h1>强大的键盘控制</h1>
		<ImageSwitch path="/shots/command-palette" class="screenshot" alt="An example of Tangent's command palette." />
		<p>
			几乎所有操作都有快捷键，其余操作可通过命令面板完成。全部可自定义。
		</p>
		<p>
			创建和切换笔记。添加和跟踪链接。重新组织文件。
			一切无需离开键盘。
		</p>
	</section>


	<section>
		<h1>可自定义的环境</h1>
		<ImageSwitch path="/shots/settings" class="screenshot six" alt="An example of Tangent's Settings." />
		<p>
			直接在 Tangent 中自定义字体、颜色和间距等基本设置。
		</p>
		<p>
			配置<span class="accentText">创建规则</span>来自动化新笔记的创建过程，支持模板化命名和自动文件夹位置。
		</p>
		<p>
			通过自定义 CSS 深度定制，内置支持为特定文件夹应用自定义样式。
		</p>
		<p>
			让你的工作区属于你。让它舒适。
		</p>
	</section>
	


	<h1>你掌控的纯文本</h1>
	<p>
		Tangent 直接读写你电脑上的 Markdown 文件。
		无需连接服务器。
		无论网络状况如何，你的笔记随时可用。
	</p>
	<p>
		你的笔记不会被锁定在专有格式中。
		任何能读取纯文本的程序都可以访问。
	</p>
	<p>
		用你喜欢的任何系统同步和版本控制笔记。
		Git、iCloud、Google Drive、Dropbox，都可以正常使用。
	</p>

	<p class="action">
		<a href="/Download" class="local buttonLink">下载 Tangent</a>
	</p>
</article>

<style lang="scss">
h1 sup {
	font-size: 40%;
}

:global(.screenshot) {
	display: block;
	width: min(var(--pageWidth), 100%);
	margin-left: auto;
	margin-right: auto;
	border-radius: 4px !important;
}

@media (min-width: 1024px) {
	section {
		max-width: calc(var(--pageWidth) * 2);
		margin: 12rem auto;

		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: auto;

		row-gap: 1rem;
		column-gap: 2rem;

		h1, p {
			max-width: unset;
			margin: unset;
			grid-column: 1;
		}

		p {
			padding-left: 0;//.5em;
		}

		:global(picture) {
			grid-column: 2;
			grid-row: 1 / span 6;
		}

		:global(.screenshot) {
			display: block;
			//width: min(var(--pageWidth), 100%);
			width: 100%;
			margin-left: unset;
			margin-right: unset;
			border-radius: 4px !important;
		}

		&:nth-child(even) {
			h1, p {
				grid-column: 2;
			}
			:global(picture) {
				grid-column: 1;
			}
		}
	}
}

@media (min-width: 1500px) {
	section {
		max-width: calc(var(--pageWidth) * 2.5);

		grid-template-columns: 33% 66%;
		grid-template-rows: auto;

		&:nth-child(even) {
			grid-template-columns: 66% 33%;
		}
	}
}

</style>