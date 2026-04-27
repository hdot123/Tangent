import { getEmbedDisplayname } from 'common/embedding'
import EmbedFile from '../EmbedFile'
import type { CommandContext } from './Command'
import WorkspaceCommand from './WorkspaceCommand'
import type { Workspace } from '..'

interface CopyFileToClipboardCommandContext extends CommandContext {
	file?: EmbedFile
}

export class CopyFileToClipboardCommand extends WorkspaceCommand {

	resolveFile(context?: CopyFileToClipboardCommandContext) {
		const node = context?.file ?? this.workspace.viewState.tangent.currentNode.value
		if (node instanceof EmbedFile) {
			return node
		}
	}

	canExecute(context?: CopyFileToClipboardCommandContext): boolean {
		return this.resolveFile(context)?.canCopyToClipboard()
	}

	execute(context?: CopyFileToClipboardCommandContext): void {
		this.resolveFile(context)?.copyToClipboard()
	}

	getName() {
		return '复制文件到剪贴板'
	}

	getLabel(context?: CopyFileToClipboardCommandContext) {
		const file = this.resolveFile(context)
		if (!file) return this.getName()
		return `复制 ${getEmbedDisplayname(file.embedType)} 到剪贴板`
	}

	getTooltip(context?: CopyFileToClipboardCommandContext) {
		const file = this.resolveFile(context)
		if (!file) return this.getName()
		return `将 "${file.name}" 复制到剪贴板`
	}
}

export class UpdateFileFromClipboardCommand extends WorkspaceCommand {
	resolveFile(context?: CopyFileToClipboardCommandContext) {
		const node = context?.file ?? this.workspace.viewState.tangent.currentNode.value
		if (node instanceof EmbedFile) {
			return node
		}
	}

	canExecute(context?: CopyFileToClipboardCommandContext): boolean {
		return this.resolveFile(context)?.canCopyToClipboard()
	}

	execute(context?: CopyFileToClipboardCommandContext): void {
		this.resolveFile(context)?.updateFromClipboard()
	}

	getName() {
		return '从剪贴板更新文件'
	}

	getLabel(context?: CopyFileToClipboardCommandContext) {
		const file = this.resolveFile(context)
		if (!file) return this.getName()
		return `从剪贴板更新 ${getEmbedDisplayname(file.embedType)}`
	}

	getTooltip(context?: CopyFileToClipboardCommandContext) {
		const file = this.resolveFile(context)
		if (!file) return this.getName()
		return `使用剪贴板当前内容更新 "${file.name}"。`
	}
}
