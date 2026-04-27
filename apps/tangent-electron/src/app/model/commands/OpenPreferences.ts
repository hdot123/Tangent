import type Workspace from '../Workspace'
import WorkspaceCommand from './WorkspaceCommand'
import type { CommandContext } from './Command'

export interface OpenPreferencesCommandContext extends CommandContext {
	section?: string
}

export default class OpenPreferencesCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace, { shortcut: 'Mod+,' })
	}

	execute(context?: OpenPreferencesCommandContext) {
		const system = this.workspace.viewState.system

		if (system.showMenu.value) {
			system.showMenu.set(false)
		}
		else {
			system.showMenu.set(true)
			if (context?.section) {
				system.section.set(context.section)
			}
		}
	}

	getLabel(context: CommandContext) {
		return '打开偏好设置'
	}

	getTooltip(context: CommandContext) {
		return '打开偏好设置面板，可自定义各项设置。'
	}
}
