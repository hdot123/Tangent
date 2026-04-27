import { FocusLevel } from 'common/dataTypes/TangentInfo'
import type Workspace from '../Workspace'
import Command from './Command'
import CommandAction from './CommandAction'
import ChangeCurrentFileCommand from './ChangeCurrentFile'
import CloseFileCommand from './CloseFile'
import CreateNewFileCommand from './CreateNewFile'
import CreateNewFolderCommand from './CreateNewFolder'
import ShowCommandPaletteCommand from './ShowCommandPalette'
import ToggleSidebarCommand from './ToggleSidebar'
import ShowInFileBrowserCommand from './ShowInFileBrowser'
import type WorkspaceCommand from './WorkspaceCommand'
import MoveFileCommand from './MoveFileCommand'
import DeleteNodeCommand from './DeleteNode'
import SetFocusLevelCommand from './SetFocusLevel'
import ToggleFocusModeCommand from './ToggleFocusMode'
import OpenPreferencesCommand from './OpenPreferences'
import OpenLogsCommand from './OpenLogs'
import OpenWorkspaceCommand from './OpenWorkspace'
import ZoomCommand from './Zoom'
import SaveCurrentFileCommand from './SaveCurrentFile'
import { FloatWindowCommand, FullscreenWindowCommand } from './WindowCommands'
import NoteKeyboardProxyCommand from './NoteKeyboardProxy'
import OpenChangelogCommand from './OpenChangelog'
import OpenQueryPaneCommand from './OpenQueryPane'
import { RemoveEverythingButNodeFromMapCommand, RemoveEverythingButThreadFromMapCommand, RemoveNodeAndChildrenFromMapCommand, RemoveNodeFromMapCommand } from './RemoveFromMap'
import MergeWithPreviousSessionCommand from './MergeWithPreviousSession'
import { CreateNewSessionCommand, CreateNewSessionFromThreadCommand } from './CreateNewSession'
import ArchivePreviousSessionsCommand from './ArchivePreviousSessions'
import ShiftThreadHistoryCommand from './ShiftThreadHistory'
import ShowAllChildMapNodesCommand from './ShowAllChildMapNodes'
import ShowPreviousSessionCommand from './ShowPreviousSession'
import DuplicateNodeCommand from './DuplicateNode'
import { CollapseAllSectionsCommand, CollapseCurrentSectionCommand } from './CollapseSectionCommands'
import { InlineFormatCommand, NoteLinePrefixCommand, SearchNoteCommand, ShiftNoteGroupCommand, ToggleMDLinkCommand as ToggleMarkdownLinkCommand, ToggleWikiLinkCommand } from './NoteFormattingCommands'
import { isMac } from 'common/platform'
import { NativeCommand } from './NativeCommand'
import { OpenDocumentationCommand } from './OpenDocumentation'
import { DeleteSidebarItem, RenameSidebarItem } from './SidebarCommands'
import { CopyFileToClipboardCommand, UpdateFileFromClipboardCommand } from './CopyFileToClipboard'
import { OpenDetailsCommand } from './DetailCommands'
import { OpenPaneSettingsCommand } from './PaneSettingsCommands'
export { Command, CommandAction, type WorkspaceCommand }

type LiteralCommands = ReturnType<typeof createAllCommands>
type GenericCommands = {
	[key: string]: WorkspaceCommand
}

export type WorkspaceCommands = LiteralCommands & GenericCommands

function createAllCommands(workspace: Workspace) {
	return {

		openWorkspace: new OpenWorkspaceCommand(workspace),

		toggleLeftSidebar: new ToggleSidebarCommand(workspace),
		openPreferences: new OpenPreferencesCommand(workspace),
		openDocumenation: new OpenDocumentationCommand(workspace),

		createNewFile: new CreateNewFileCommand(workspace),
		createNewNoteFromRule: new ShowCommandPaletteCommand(workspace, {
			name: '从规则创建新笔记',
			prefix: '> Create ',
			tooltip: '使用定义的笔记创建规则创建新笔记',
			shortcut: 'Mod+Shift+N'
		}),
		createNewFolder: new CreateNewFolderCommand(workspace),

		undo: new NativeCommand(workspace, {
			role: 'undo', label: '撤销', tooltip: '撤销上一步操作。',
			shortcut: 'Mod+Z'
		}),
		redo: new NativeCommand(workspace, {
			role: 'redo', label: '重做', tooltip: '重做上一步撤销的操作。',
			shortcut: isMac ? 'Mod+Shift+Z' : 'Mod+Y'
		}),
		cut: new NativeCommand(workspace, {
			role: 'cut', label: '剪切', tooltip: '移除选中的内容并放入系统剪贴板。',
			shortcut: 'Mod+X'
		}),
		copy: new NativeCommand(workspace, {
			role: 'copy', label: '复制', tooltip: '将选中的内容放入系统剪贴板。',
			shortcut: 'Mod+C'
		}),
		paste: new NativeCommand(workspace, {
			role: 'paste', label: '粘贴', tooltip: '插入系统剪贴板中的内容。',
			shortcut: 'Mod+V'
		}),
		pasteAndMatchStyle: new NativeCommand(workspace, {
			role: 'pasteAndMatchStyle', label: '纯文本粘贴', tooltip: '插入系统剪贴板中的纯文本内容。',
			shortcut: 'Mod+Shift+V'
		}),
		selectAll: new NativeCommand(workspace, {
			role: 'selectAll', label: '全选', tooltip: '选择当前范围内的所有内容。',
			shortcut: 'Mod+A'
		}),

		openQueryPane: new OpenQueryPaneCommand(workspace),

		goTo: new ShowCommandPaletteCommand(workspace, { shortcut: 'Mod+O' }),
		openInFileBrowser: new ShowInFileBrowserCommand(workspace),
		
		do: new ShowCommandPaletteCommand(workspace, { shortcut: 'Mod+P', prefix: '> ' }),
		search: new ShowCommandPaletteCommand(workspace, { shortcut: 'Mod+Shift+F', prefix: '? '}),

		closeCurrentFile: new CloseFileCommand(workspace, { mode: 'current', shortcut: 'Mod+W' }),
		closeOtherFiles: new CloseFileCommand(workspace, { mode: 'others', shortcut: 'Mod+Shift+W'}),
		closeLeftFiles: new CloseFileCommand(workspace, { mode: 'left' }),
		closeRightFiles: new CloseFileCommand(workspace, { mode: 'right' }),

		saveCurrentFile: new SaveCurrentFileCommand(workspace),

		moveToLeftFile: new ChangeCurrentFileCommand(workspace, { mode: 'left', shortcut: 'Mod+Alt+Left' }),
		moveToRightFile: new ChangeCurrentFileCommand(workspace, { mode: 'right', shortcut: 'Mod+Alt+Right' }),

		moveFile: new MoveFileCommand(workspace),
		duplicateNode: new DuplicateNodeCommand(workspace),
		deleteNode: new DeleteNodeCommand(workspace),

		copyFileToClipboard: new CopyFileToClipboardCommand(workspace),
		updateFileFromClipboard: new UpdateFileFromClipboardCommand(workspace),

		setFocusLevel: new SetFocusLevelCommand(workspace, null, true),
		setMapFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Map,
			toggle: true,
			shortcut: 'Mod+G'
		}),
		setThreadFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Thread
		}),
		setFileFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.File
		}),
		setTypewriterFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Typewriter
		}),
		setParagraphFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Paragraph
		}),
		setLineFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Line
		}),
		setSentenceFocusLevel: new SetFocusLevelCommand(workspace, {
			targetFocusLevel: FocusLevel.Sentence
		}),
		toggleFocusMode: new ToggleFocusModeCommand(workspace),

		shiftHistoryBack: new ShiftThreadHistoryCommand(workspace, {
			direction: -1,
			shortcut: 'Mod+Shift+['
		}),
		shiftHistoryForward: new ShiftThreadHistoryCommand(workspace, {
			direction: 1,
			shortcut: 'Mod+Shift+]'
		}),

		zoomIn: new ZoomCommand(workspace, {
			direction: 1,
			shortcut: 'Mod+Shift+='
		}),
		zoomOut: new ZoomCommand(workspace, {
			direction: -1,
			shortcut: 'Mod+Shift+-'
		}),
		resetZoom: new ZoomCommand(workspace, {
			direction: 'reset',
			shortcut: 'Mod+Shift+0'
		}),

		floatWindow: new FloatWindowCommand(workspace),
		fullscreenWindow: new FullscreenWindowCommand(workspace, {
			shortcut: 'F11'
		}),

		openLogs: new OpenLogsCommand(workspace),
		openChangelog: new OpenChangelogCommand(workspace),


		// Sidebar
		renameSidebarItem: new RenameSidebarItem(workspace, {
			shortcut: isMac ? 'Mod+R' : 'F2'
		}),
		deleteSidebarItem: new DeleteSidebarItem(workspace, { shortcut: 'Mod+Backspace' }),


		// Maps
		showAllChildMapNodes: new ShowAllChildMapNodesCommand(workspace),

		removeNodeFromMap: new RemoveNodeFromMapCommand(workspace),
		removeNodeAndChildrenFromMap: new RemoveNodeAndChildrenFromMapCommand(workspace),
		removeEverythingButNodeFromMap: new RemoveEverythingButNodeFromMapCommand(workspace),
		removeEverythingButThreadFromMap: new RemoveEverythingButThreadFromMapCommand(workspace),
		
		mergeWithPreviousSession: new MergeWithPreviousSessionCommand(workspace),
		createNewSession: new CreateNewSessionCommand(workspace),
		createNewSessionFromThread: new CreateNewSessionFromThreadCommand(workspace),
		archivePreviousSessions: new ArchivePreviousSessionsCommand(workspace),
		showPreviousSession: new ShowPreviousSessionCommand(workspace),


		// Panes & Details
		openPaneSettings: new OpenPaneSettingsCommand(workspace, {
			group: 'Pane',
			shortcut: 'Mod+Alt+Up',
			mode: 'toggle'
		}),
		closePaneSettings: new OpenPaneSettingsCommand(workspace, {
			group: 'Pane Settings',
			shortcut: 'Mod+Alt+Down',
			mode: false
		}),

		openDetails: new OpenDetailsCommand(workspace, {
			group: 'Pane',
			shortcut: 'Mod+Alt+Down',
			mode: 'toggle' // When possible, having the same command close a panel it just opened is preferable
		}),
		closeDetails: new OpenDetailsCommand(workspace, {
			group: 'Details',
			shortcuts: ['Escape', 'Mod+Alt+Up'],
			mode: false
		}),


		// Notes
		SearchNoteCommand: new SearchNoteCommand(workspace, {
			shortcut: 'Mod+F'
		}),
		toggleBold: new InlineFormatCommand(workspace, {
			label: '加粗',
			tooltip: '切换选中文本是否加粗。',
			shortcut: 'Mod+B',
			formattingCharacters: () => workspace.settings?.boldCharacters.value ?? '**',
			attributePredicate: attr => attr?.bold
		}),
		toggleItalics: new InlineFormatCommand(workspace, {
			label: '斜体',
			tooltip: '切换选中文本是否斜体。',
			shortcut: 'Mod+I',
			formattingCharacters: () => workspace.settings?.italicsCharacters.value ?? '_',
			attributePredicate: attr => attr?.italic
		}),
		toggleHighlight: new InlineFormatCommand(workspace, {
			label: '高亮',
			tooltip: '切换选中文本是否高亮。',
			shortcut: 'Mod+=',
			formattingCharacters: () => '==',
			attributePredicate: attr => attr?.highlight
		}),
		toggleInlineCode: new InlineFormatCommand(workspace, {
			label: '行内代码',
			tooltip: '切换选中文本是否渲染为代码。',
			shortcut: 'Mod+\\',
			formattingCharacters: () => '`',
			attributePredicate: attr => attr?.inline_code
		}),
		toggleWikiLink: new ToggleWikiLinkCommand(workspace, {
			shortcut: 'Mod+Alt+K',
			mode: 'name'
		}),
		toggleWikiLinkDisplay: new ToggleWikiLinkCommand(workspace, {
			shortcut: 'Mod+Alt+Shift+K',
			mode: 'display'
		}),
		toggleMDLink: new ToggleMarkdownLinkCommand(workspace, {
			shortcut: 'Mod+K'
		}),

		setHeader1: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+1',
			label: '标题 1',
			tooltip: '将当前选中的行改为 1 级标题。',
			prefix: '# '
		}),
		setHeader2: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+2',
			label: '标题 2',
			tooltip: '将当前选中的行改为 2 级标题。',
			prefix: '## '
		}),
		setHeader3: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+3',
			label: '标题 3',
			tooltip: '将当前选中的行改为 3 级标题。',
			prefix: '### '
		}),
		setHeader4: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+4',
			label: '标题 4',
			tooltip: '将当前选中的行改为 4 级标题。',
			prefix: '#### '
		}),
		setHeader5: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+5',
			label: '标题 5',
			tooltip: '将当前选中的行改为 5 级标题。',
			prefix: '##### '
		}),
		setHeader6: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+6',
			label: '标题 6',
			tooltip: '将当前选中的行改为 6 级标题。',
			prefix: '###### '
		}),

		setParagraph: new NoteLinePrefixCommand(workspace, {
			shortcut: 'Mod+0',
			label: '段落',
			tooltip: '将当前选中的行改为段落。',
			prefix: ''
		}),

		shiftLinesUp: new ShiftNoteGroupCommand(workspace, {
			mode: 'lines',
			direction: -1,
			shortcut: 'Alt+Up'
		}),
		shiftLinesDown: new ShiftNoteGroupCommand(workspace, {
			mode: 'lines',
			direction: 1,
			shortcut: 'Alt+Down'
		}),
		shiftGroupUp: new ShiftNoteGroupCommand(workspace, {
			mode: 'section',
			direction: -1,
			shortcut: isMac ? 'Ctrl+Alt+Up' : 'Alt+Shift+Up'
		}),
		shiftGroupDown: new ShiftNoteGroupCommand(workspace, {
			mode: 'section',
			direction: 1,
			shortcut: isMac ? 'Ctrl+Alt+Down' : 'Alt+Shift+Down'
		}),

		collapseCurrentSection: new CollapseCurrentSectionCommand(workspace, {
			shortcut: 'Mod+Alt+Enter'
		}),
		collapseAllSections: new CollapseAllSectionsCommand(workspace, {
			scope: 'all',
			mode: 'collapse',
			shortcut: 'Mod+Alt+Shift+,'
		}),
		expandAllSections: new CollapseAllSectionsCommand(workspace, {
			scope: 'all',
			mode: 'expand',
			shortcut: 'Mod+Alt+Shift+.'
		}),
		collapseSmallestSections: new CollapseAllSectionsCommand(workspace, {
			scope: 'edge',
			mode: 'collapse',
			shortcut: 'Mod+Alt+,'
		}),
		expandLargestSections: new CollapseAllSectionsCommand(workspace, {
			scope: 'edge',
			mode: 'expand',
			shortcut: 'Mod+Alt+.'
		}),
	}
}

export default function workspaceCommands(workspace: Workspace): WorkspaceCommands {
	const commands = createAllCommands(workspace) as WorkspaceCommands

	// Give all of the commands their id
	for (const key of Object.keys(commands)) {
		commands[key].id = key
	}

	return commands
}
