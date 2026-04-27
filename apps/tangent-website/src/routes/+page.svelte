<script>
import ImageSwitch from './ImageSwitch.svelte'
import './style.css'
</script>

<article class="note">
	<ImageSwitch class="example_notes screenshot" path="/shots/thread-short" alt="Tangent 线索滑动面板示例"/>
	
	<p style="font-style: italic; text-align: center;">
		一款简洁强大的开源笔记应用，支持 Mac、Windows 和 Linux
	</p>

	<p class="action"><a class="local buttonLink" href="/Download">下载 Tangent</a></p>

	<h1>沿着思维写作</h1>
	<p>
		Tangent 旨在让你按照自己的思维方式来写作。
		你的思维是相互关联的；
		Tangent 让你可以轻松链接到现有笔记并创建新笔记。
	</p>
	<p>
		让你的思绪沿着兴趣的路径自由漫游。
		不要压制思维，拥抱它们。
	</p>

	
	<h1>自信地探索</h1>
	
	<p>
		Tangent 通过优雅的滑动面板和自动构建的分支地图来可视化你的思维路径。
		你始终知道自己在哪里，去过哪里。
	</p>
	<img class="example_map" src="/map.png" alt="已访问笔记之间的连接地图示例"/>
	<p>
		沿着思维的线索，朝任何方向前进。不再迷失方向。
	</p>

	<h1>拥有自己的思维</h1>
	<p>
		Tangent 直接处理设备上的本地文件。
		笔记以 Markdown 文件存储，可以使用任何文本编辑器读取和编辑。
	</p>
	<p>
		没有什么是被隐藏的。一切都是你的。
	</p>

	<h1>永久免费</h1>
	<p>
		Tangent 采用 Apache 2.0 许可证开源。源代码可在
		<a href="https://github.com/hdot123/Tangent" target="_blank">Github</a> 上找到。
	</p>

	<p class="action"><a class="local buttonLink" href="/Download">开始使用</a></p>
</article>

<style lang="scss">
article :global(img) {
	display: block;
	margin: 0 auto;
}

article :global(.example_notes) {
	width: min(90em, 100%);
}

.example_map {
	width: min(60em, 100%);
	border-radius: 1em;
}
</style>