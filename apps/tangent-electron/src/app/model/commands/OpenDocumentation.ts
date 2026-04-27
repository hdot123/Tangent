import type { CommandContext } from './Command'
import WorkspaceCommand from './WorkspaceCommand'

export class OpenDocumentationCommand extends WorkspaceCommand {

	execute(context?: CommandContext): void {
		this.workspace.api.documentation.open('Getting Started')
	}

	getLabel(context?: CommandContext) {
		return '打开文档'
	}

	getTooltip(context?: CommandContext) {
		return '将 Tangent 的文档作为单独的工作区打开。'
	}
}
