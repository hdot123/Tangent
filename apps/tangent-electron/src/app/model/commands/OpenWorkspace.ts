import type { Workspace } from '..'
import WorkspaceCommand from './WorkspaceCommand'

export default class OpenWorkspaceCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace, { shortcut: 'Mod+Shift+O'})
	}

	execute(_context) {
		this.workspace.api.window.create()
	}

	getLabel(_context) {
		return '打开工作区'
	}

	getTooltip(_context) {
		return '打开一个新窗口，可以打开任何工作区或文件夹。'
	}
}