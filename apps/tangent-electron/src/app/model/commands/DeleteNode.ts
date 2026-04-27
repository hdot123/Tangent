import type { TreeNode } from 'common/trees'
import type { Workspace } from "..";
import type { CommandContext } from "./Command";
import WorkspaceCommand from "./WorkspaceCommand";
import { isMac } from 'common/platform';

interface DeleteNodeCommandContext extends CommandContext {
	target?: TreeNode | string
}

export default class DeleteNodeCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace)
	}

	execute(context: DeleteNodeCommandContext) {
		let target = context?.target ?? this.workspace.viewState.tangent.currentNode.value
		if (typeof target !== 'string') {
			target = target.path
		}

		this.workspace.api.file.delete(target)
	}

	getName() {
		return '删除文件'
	}

	getLabel(context: DeleteNodeCommandContext) {
		const target = context?.target ?? this.workspace.viewState.tangent.currentNode.value
		if (target && typeof target !== 'string') {
			return `删除 "${target.name}"`
		}
		return this.getName()
	}

	getTooltip(context?: CommandContext) {
		if (isMac) {
			return '从工作区删除该文件。文件将被移至废纸篓。'
		}
		return '从工作区删除该文件。文件将被移至回收站。'
	}
}
