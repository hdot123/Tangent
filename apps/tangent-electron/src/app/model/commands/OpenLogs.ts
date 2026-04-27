import type Workspace from '../Workspace'
import type { CommandContext } from './Command'
import WorkspaceCommand from './WorkspaceCommand'

export default class OpenLogsCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace)
	}

	execute(_context) {
		this.workspace.api.file.showInFileBrowser('logs')
	}

	getLabel(context: CommandContext) {
		return '显示日志'
	}

	getTooltip(context?: CommandContext) {
		return '打开包含 Tangent 日志文件的文件夹。'
	}
}