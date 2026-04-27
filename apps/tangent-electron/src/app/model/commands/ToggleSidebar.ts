import { SidebarMode } from 'common/SidebarState'
import type Workspace from '../Workspace'
import WorkspaceCommand from './WorkspaceCommand'
import { wait } from '@such-n-such/core'
import { focusLeftSidebar, getLeftSidebarElement } from 'app/utils/selection'

// TODO: Extend for right/left sidebar
export default class ToggleSidebarCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace, { shortcut: 'Mod+Alt+[' })
	}

	execute(_context) {
		const mode = this.workspace.viewState.leftSidebar.mode
		mode.update(m => m === SidebarMode.pinned ? SidebarMode.closed : SidebarMode.pinned)
		if (mode.value === SidebarMode.pinned) {
			// Shift focus into the sidebar
			wait().then(() => {
				focusLeftSidebar()
			})
		}
		else if (getLeftSidebarElement()?.contains(document.activeElement)) {
			// Shift focus back to content
			this.workspace.commands.moveToRightFile.execute()
		}
	}

	getChecked(_context) {
		return this.workspace.viewState.leftSidebar.mode.value === SidebarMode.pinned
	}

	getLabel(_context) {
		return '切换左侧边栏'
	}

	getTooltip(_context) {
		return '切换左侧边栏的打开和关闭状态。'
	}
}
