import type { TreeNode } from 'common/trees'
import type { Workspace } from "..";
import type { CommandContext } from "./Command";
import WorkspaceCommand from "./WorkspaceCommand";
import { isMac } from 'common/platform'

interface OpenInFileBrowserCommandContext extends CommandContext {
	target?: TreeNode | string
	labelName?: string
}

export default class ShowInFileBrowserCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace)
	}

	execute({ target }: OpenInFileBrowserCommandContext = {}) {

		if (!target) {
			target = this.workspace.viewState.tangent.currentNode.value
		}

		if (typeof target !== 'string') {
			target = target.path
		}

		this.workspace.api.file.showInFileBrowser(target)
	}

	getLabel(context: OpenInFileBrowserCommandContext) {
		const labelName = context?.labelName

		let label = 'Show '
		if (labelName) {
			label += labelName + ' '
		}

		label += 'in '

		label += isMac ? 'Finder' : 'Explorer'
		
		return label
	}

	getTooltip(context: OpenInFileBrowserCommandContext) {
		const target = context?.target ?? this.workspace.viewState.tangent.currentNode.value
		if (typeof target === 'string') {
			return '在文件浏览器中显示此项。'
		}
		if (target) {
			return `在文件浏览器中打开 ${target.fileType === 'folder' ? '文件夹' : '文件'} "${target.name}"`
		}
		return '在文件浏览器中打开当前文件或文件夹。'
	}
}