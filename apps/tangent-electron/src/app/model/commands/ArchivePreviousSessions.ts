import type Session from 'common/dataTypes/Session'
import type { Workspace } from '..'
import type { CommandContext } from './Command'
import WorkspaceCommand from './WorkspaceCommand'
import type DataFile from '../DataFile'

export interface ArchivePreviousSessionsCommandContext extends CommandContext {
	session: Session
}

export default class ArchivePreviousSessionsCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace, { group: 'Map' })
	}

	execute(context?: ArchivePreviousSessionsCommandContext): void {
		const tangent = this.workspace.viewState.tangent
		const tangentInfo = tangent.tangentInfo.value
		const session = context?.session ?? tangent.activeSession.value

		const sessionFile = session._file as DataFile
		const index = tangentInfo.openSessions.value.indexOf(sessionFile)
		if (index < 0) return

		tangentInfo.openSessions.splice(0, index)
	}

	getLabel(context?: CommandContext) {
		return '归档之前的会话'
	}

	getTooltip(context?: CommandContext) {
		return '在地图视图中隐藏较早的会话。已归档的会话不会被删除，可以恢复。'
	}
}
