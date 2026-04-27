import type { ThreadHistoryItem } from 'common/dataTypes/Session'
import type { Workspace } from '..'
import type { CommandContext, CommandOptions } from './Command'
import WorkspaceCommand from './WorkspaceCommand'

export class CreateNewSessionCommand extends WorkspaceCommand {

	constructor(workspace: Workspace) {
		super(workspace, { group: 'Map' })
	}

	execute(context?: CommandContext) {
		const tangent = this.workspace.viewState.tangent
		const tangentInfo = tangent.tangentInfo.value

		const newSessionFile = tangent.createSession()

		tangentInfo.openSessions.add(newSessionFile)
		tangentInfo.activeSession.set(newSessionFile)
	}

	getLabel(context?: CommandContext) {
		return '创建新会话'
	}

	getTooltip(context?: CommandContext) {
		return '创建一个具有独立线索历史和地图的新会话。之前的会话在地图视图中仍可见。'
	}
}

export interface CreateNewSessionFromThreadCommandContext extends CommandContext {
	thread: ThreadHistoryItem
}

export class CreateNewSessionFromThreadCommand extends WorkspaceCommand {
	constructor(workspace: Workspace) {
		super(workspace, { group: 'Map' })
	}

	execute(context?: CreateNewSessionFromThreadCommandContext) {
		const tangent = this.workspace.viewState.tangent
		const tangentInfo = tangent.tangentInfo.value

		const thread = context?.thread ?? tangent.activeSession.value?.currentThread.value

		const newSessionFile = tangent.createSession(session => {
			if (thread) {
				session.addThreadHistory(thread)
			}
		})

		tangentInfo.openSessions.add(newSessionFile)
		tangentInfo.activeSession.set(newSessionFile)
	}

	getLabel(context?: CreateNewSessionFromThreadCommandContext) {
		if (context?.thread) {
			return '从线索创建新会话'
		}
		return '从当前线索创建新会话'
	}

	getTooltip(context?: CommandContext) {
		return '创建一个以给定线索为基础的新会话。之前的会话在地图视图中仍可见。'
	}
}
