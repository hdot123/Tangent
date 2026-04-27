import type { CommandContext } from './Command'
import WorkspaceCommand from './WorkspaceCommand'

import Changelog from '../../modal/Changelog.svelte'

export default class OpenChangelogCommand extends WorkspaceCommand {
	execute(context: CommandContext): void {
		this.workspace.viewState.modal.set(Changelog, {})
	}

	getLabel(context: CommandContext) {
		return '打开更新日志'
	}

	getTooltip(context?: CommandContext) {
		return '打开 Tangent 的更新日志对话框。'
	}
}
