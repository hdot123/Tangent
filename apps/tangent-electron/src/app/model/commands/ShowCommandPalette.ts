import type Workspace from "../Workspace"
import type { CommandContext, CommandOptions } from "./Command"
import WorkspaceCommand from "./WorkspaceCommand"

import CommandPalette from '../../modal/CommandPalette.svelte'

interface ShowCommandPaletteCommandContext extends CommandContext {
	prefix?: string
}

interface ShowCommandPaletteCommandOptions extends CommandOptions {
	name?: string
	prefix?: string,
	tooltip?: string
}

export default class ShowCommandPaletteCommand extends WorkspaceCommand {

	name: string
	prefix: string
	tooltip: string

	constructor(workspace: Workspace, options?: ShowCommandPaletteCommandOptions) {
		super(workspace, options)

		if (options) {
			this.name = options.name
			this.prefix = options.prefix
			this.tooltip = options.tooltip
		}

		workspace.viewState.modal.currentComponent.subscribe(() => this.alertDirty())
	}

	canExecute(context: ShowCommandPaletteCommandContext) {
		return this.workspace.viewState.modal.isActive === false
	}

	execute(context: ShowCommandPaletteCommandContext) {
		const prefix = context?.prefix ?? this.prefix
		const modal = this.workspace.viewState.modal
		if (modal.isActive === false) {
			modal.set(CommandPalette, { prefix })
		}
	}

	getLabel(context: ShowCommandPaletteCommandContext) {
		if (this.name) return this.name

		const prefix = context?.prefix ?? this.prefix
		if (!prefix) {
			return '打开文件'
		}
		if (prefix.match(/^> ?$/)) {
			return '打开命令面板'
		}
		if (prefix.match(/^\? ?$/)) {
			return '搜索文件'
		}
	}

	getTooltip(context: ShowCommandPaletteCommandContext) {
		if (this.tooltip) return this.tooltip

		const prefix = context?.prefix ?? this.prefix
		if (!prefix) {
			return '打开搜索框，搜索所有文件。'
		}
		if (prefix.match(/^> ?$/)) {
			return '打开搜索框，搜索所有命令。'
		}
		if (prefix.match(/^\? ?$/)) {
			return '打开搜索框，搜索所有文件的名称和内容。'
		}
	}

	getPaletteActions() {
		// No reason for this to do anything ever
		return []
	}
}
