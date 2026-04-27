import { ObjectStore, PatchableMap, type RawValueMode } from 'common/stores'
import Setting, { type SettingDefinition } from './Setting'

import { isLinux, isMac } from '../platform'

/**
 * Windows does not properly render `cursor: e-resize | w-resize;` css, instead showing a bi-directional cursor.
 * This completely defeats the point of the "directional" cursor setting.
 * This malarky is done so that Mac, which _does_ properly support those cursors, gets the benefit and Windows doesn't look broken.
 */
const linkCursorDefinition: SettingDefinition<string> = {
	name: '链接光标',
	description: 'The appearance of the mouse cursor when interacting with links in notes.',
	validValues: [
		{
			value: 'arrow',
			displayName: 'Arrow',
			description: 'The mouse cursor is an arrow when engaging with a link.'
		},
		{
			value: 'pointer',
			displayName: 'Pointer',
			description: 'The mouse cursor is the classic pointer.'
		}
	],
	defaultValue: 'pointer'
}
if (isMac) {
	linkCursorDefinition.validValues.push({
		value: 'directional',
		displayName: 'Directional Arrows',
		description: 'The mouse cursor points in the direction the link will open in.'
	})
	linkCursorDefinition.defaultValue = 'directional'
}

class KeymapSettings extends PatchableMap<string, string[], string[]> {
	protected convertKeyToPatch(key: string): string {
		return key
	}
	protected convertPatchKeyToKey(patchKey: string): string {
		return patchKey
	}
	protected convertPatchValueToValue(patchValue: string[]): string[] {
		return patchValue
	}
	protected convertValueToPatch(value: string[], mode?: RawValueMode): string[] {
		return value
	}
}

export default class Settings extends ObjectStore {
	updateChannel = new Setting<string>({
		name: '更新频道',
		description: 'Controls what versions Tangent will automatically update to.',
		validValues: [
			{
				value: 'latest',
				displayName: 'Stable',
				description: 'Tangent will auto-update to the latest version hardened by a beta phase. ' +
					'Choose this to prefer stability over new features.'
			},
			{
				value: 'beta',
				displayName: 'Beta',
				description: 'Tangent will auto-update to the latest stable or beta version. ' +
					'Choose this to participate in the beta period for a release. There may be bugs, but features should appear fully-formed.'
			},
			{
				value: 'alpha',
				displayName: 'Bleeding Edge',
				description: 'Tangent will auto-update to the absolute latest version. ' +
					'Choose this to get access to features as soon as they are developed. There will be bugs.'
				
			}
		]
	})

	automaticallyCheckForUpdates = new Setting<boolean>({
		name: '自动检查更新',
		description: 'When enabled, Tangent will automatically check for updates.',
		defaultValue: true
	})

	showChangelogOnUpdate = new Setting<boolean>({
		name: 'Tangent 更新时显示更新日志',
		defaultValue: true
	})

	appearance = new Setting<string>({
		name: '外观',
		description: 'Controls whether Tangent displays in light or dark mode.',
		validValues: [
			{
				value: 'system',
				displayName: 'System',
				description: 'Tangent will use light or dark mode based on your OS settings.'
			},
			{
				value: 'light',
				displayName: 'Light',
				description: 'Tangent will always display in light mode.'
			},
			{
				value: 'dark',
				displayName: 'Dark',
				description: 'Tangent will always display in dark mode.'
			}
		]
	})

	titlebar = new Setting<string>({
		name: '标题栏',
		description: 'Controsl the appearance of the titlebars of Tangent\'s windows. (Requires restart.)',
		validValues: [
			{
				value: 'system',
				displayName: 'System',
				description: 'Tangent will use the native titlebar of your OS. (Requires restart.)'
			},
			{
				value: 'condensed',
				displayName: 'Condensed',
				description: 'Tangent will place window controls within its own navigation bar. (Requires restart.)'
			}
		],
		defaultValue: isLinux ? 'system' : 'condensed'
	})

	accentHue = new Setting<number>({
		name: '主题色相',
		description: 'The hue of Tangent\'s button and link color.',
		defaultValue: 141,
		range: {
			min: 0,
			max: 360,
			step: 1
		}
	})

	accentSaturation = new Setting<number>({
		name: '主题饱和度',
		description: 'The saturation of Tangent\s button and link color.',
		defaultValue: 67,
		range: {
			min: 0,
			max: 100,
			step: 1
		}
	})

	uiFontSize = new Setting<number>({
		name: '界面字体大小',
		description: 'Controls the size of text in the UI.',
		defaultValue: 16,
		range: {
			min: 12,
			max: 20,
			step: 1
		}
	})

	panelWidthMin = new Setting<number>({
		name: '最小面板宽度',
		description: 'Determines the minimum width of a panel.',
		defaultValue: 625,
		range: {
			min: 450,
			max: 950,
			step: 1
		}
	})

	scrollBarWidth = new Setting<string>({
		name: '滚动条宽度',
		description: 'Determines the thickness of scroll bar handles.',
		validValues: [
			{
				value: 'Small'
			},
			{
				value: 'Medium'
			},
			{
				value: 'Large'
			}
		]
	})

	sidebarHoverHotspot = new Setting<number>({
		name: '侧边栏热区',
		description: 'How close to the edge your mouse must be (in pixels) to reveal a collapsed sidebar.',
		defaultValue: 12,
		range: {
			min: 2,
			max: 100,
			step: 1
		}
	})

	panelSettingsHoverHotspot = new Setting<number>({
		name: '面板设置热区',
		description: 'How close to the top of a panel your must be (in pixels) to reveal the panel\'s settings pane.',
		defaultValue: 20,
		range: {
			min: 5,
			max: 150,
			step: 1
		}
	})

	showPromptInstructions = new Setting<boolean>({
		name: '显示提示说明',
		description: 'When enabled, command palettes and autocomplete menus display relevant shortcuts.',
		defaultValue: true
	})

	// Navigation
	linkClickPaneBehavior = new Setting<string>({
		name: '链接与面板',
		description: 'How opening a link affects currently open panes in the thread.',
		validValues: [
			{
				value: 'new',
				displayName: 'Links Open New Pane',
				description: 'Clicking a link opens a new pane.\n\nShift-Click to replace the current pane with the link instead.'
			},
			{
				value: 'replace',
				displayName: 'Links Replace Pane',
				description: 'Clicking a link replaces the content of its pane.\n\nShift-Click to open in a new pane.'
			}
		],
		defaultValue: 'new'
	})

	noteLinkFollowBehavior = new Setting<string>({
		name: '链接跳转',
		description: 'What keys need to be pressed when left clicking on a link to follow it.',
		validValues: [
			{
				value: 'none',
				displayName: 'Click',
				description: 'Left clicking on a link follows the link. ' + (isMac
					? 'Command clicking on a link places the cursor.'
					: 'Ctrl clicking on a link places the cursor.')
			},
			{
				value: 'mod',
				displayName: isMac ? '⌘ Click' : 'Ctrl+Click',
				description: isMac
					? 'Command clicking on a link follows the link.'
					: 'Ctrl clicking on a link follows the link.'
			}
		],
		defaultValue: 'mod'
	})

	// Map
	mapZoomScrollMode = new Setting<string>({
		name: '缩放与平移',
		description: 'Determines how the map zooms and pans. Panning is always possible by clicking & dragging.',
		validValues: [
			{
				value: 'pinch-to-zoom',
				displayName: 'Pinch-to-Zoom',
				description: 'Scrolling pans the map, pinching or ctrl+scrolling zooms.'
			},
			{
				value: 'scroll-to-zoom',
				displayName: 'Scroll-to-Zoom',
				description: 'Scrolling zooms the map.'
			}
		],
		// This basically assumes that windows machines will be shit at handling touch gestures
		defaultValue: isMac ? 'pinch-to-zoom' : 'scroll-to-zoom'
	})

	mapZoomSensitivity = new Setting<number>({
		name: '缩放灵敏度',
		description: 'Affects how quickly the map zooms in response to input',
		defaultValue: .25,
		range: {
			min: .01,
			max: 1,
			step: .01
		}
	})

	openMapWhenThreadEmptied = new Setting<boolean>({
		name: '关闭最后一个文件时打开地图',
		description: 'When the last file in a thread is closed, open the map.',
		defaultValue: true
	})

	showPreviousThreadsOnMap = new Setting<boolean>({
		name: '显示之前的线索',
		description: 'When active, previous threads will be visible on the map, allowing for quick switching.',
		defaultValue: true
	})

	showIconsOnMapNodes = new Setting<boolean>({
		name: '显示节点图标',
		description: 'When active, map nodes will show icons depicting their file type.',
		defaultValue: true
	})

	// Sets
	cardViewCardsHoldAltToScroll = new Setting<boolean>({
		name: '卡片使用 Alt 滚动',
		description: 'When enabled, the content of cards in a card lens will not scroll unless you hold alt. When disabled, cards will always be scrollable',
		defaultValue: true
	})

	// Notes
	noteMargins = new Setting<string>({
		name: '边距',
		description: 'Determines how much space is given around notes and note elements.',
		defaultValue: 'normal',
		validValues: [
			{
				value: 'tight',
				displayName: 'Tight',
				description: 'Space around notes and note titles is limited.'
			},
			{
				value: 'normal',
				displayName: 'Normal',
				description: 'Space around notes and titles matches the developer\'s sensibilities.'
			},
			{
				value: 'relaxed',
				displayName: 'Relaxed',
				description: 'Notes, note titles, and headers are given more room to breath.'
			}
		]
	})

	noteFont = new Setting<string>({
		name: '笔记字体',
		description: 'The font used in notes.',
		form: 'select',
		defaultValue: ''
	})

	noteCodeFont = new Setting<string>({
		name: '代码字体',
		description: 'The font used in notes for code.',
		form: 'select',
		defaultValue: ''
	})

	noteCodeInlineLightTheme = new Setting<string>({
		name: '浅色行内代码',
		description: 'The code theme used for code integrated with other text while in light mode.',
		form: 'select',
		defaultValue: 'vscode-light'
	})
	noteCodeInlineDarkTheme = new Setting<string>({
		name: '深色行内代码',
		description: 'The code theme used for code integrated with other text while in dark mode.',
		form: 'select',
		defaultValue: 'vscode-dark'
	})
	noteCodeBlockLightTheme = new Setting<string>({
		name: '浅色代码块',
		description: 'The code theme used for code in its own block while in light mode.',
		form: 'select',
		defaultValue: 'vscode-light'
	})
	noteCodeBlockDarkTheme = new Setting<string>({
		name: '深色代码块',
		description: 'The code theme used for code in its own block while in dark mode.',
		form: 'select',
		defaultValue: 'vscode-dark'
	})

	noteWidthMax = new Setting<number>({
		name: '最大笔记宽度',
		description: 'Determines the maximum width of a note.',
		defaultValue: 700,
		range: {
			min: 450,
			softMax: 1200,
			max: 4000,
			step: 1,
		}
	})

	noteFontSize = new Setting<number>({
		name: '笔记字体大小',
		description: 'Controls the size of text in notes.',
		defaultValue: 16,
		range: {
			min: 9,
			max: 28,
			step: 1
		}
	})

	lineHeight = new Setting<number>({
		name: '行高',
		description: 'The spacing between lines of text in notes.',
		defaultValue: 1.5,
		range: {
			min: 1,
			max: 2
		}
	})

	fixedTitle = new Setting<boolean>({
		name: '浮动标题',
		description: 'If enabled, the title of notes will stay at the top of the note while the note scrolls.',
		defaultValue: false
	})

	hangingHeaders = new Setting<boolean>({
		name: '悬挂式标题',
		description: 'If enabled, headers will start a bit to the left of other lines.',
		defaultValue: true
	})

	crossOutFinishedTodos = new Setting<boolean>({
		name: '划掉已完成的待办',
		description: 'If enabled, completed todos will be crossed or scribbled out.',
		defaultValue: true
	})

	linkCursor: Setting<string> = new Setting<string>(linkCursorDefinition)

	// Attachments
	defaultPasteLocation = new Setting<string>({
		name: '粘贴图片文件夹',
		description: 'The folder images pasted from the clipboard will be saved.',
		defaultValue: '',
		form: 'folder'
	})

	// Files
	dirtyIndicatorVisibility = new Setting<string>({
		name: '显示未保存文件指示',
		description: 'Whether to show an indicator that a file is not yet saved.',
		validValues: [
			{
				value: 'never',
				displayName: 'Never',
				description: 'No dirty indicators will be shown'
			},
			{
				value: 'thread',
				displayName: 'Thread',
				description: 'Dirty indicators will be shown in the thread view'
			},
			{
				value: 'single-file',
				displayName: 'Single File',
				description: 'Dirty indicators will be shown in thread view and when looking at a single file.'
			},
			{
				value: 'focus',
				displayName: 'Always',
				description: 'Dirty indicators will always be shown, even when focused on a single file.'
			}
		]
	})
	
	// Links
	linkAutocompleteForm = new Setting<'short' | 'full'>({
		name: '链接自动补全',
		description: 'How wikilinks will autocomplete',
		defaultValue: 'short',
		validValues: [
			{
				value: 'short',
				displayName: 'Unique Path',
				description: 'Links will only include as much path information as is necessary to have a unique identifier in the workspace.'
			},
			{
				value: 'full',
				displayName: 'Full Path',
				description: 'Links will always autocomplete with their full path relative to the workspace.'
			}
		]
	})

	areLinksCaseSensitive = new Setting<boolean>({
		name: '区分大小写链接',
		description: 'Whether the casing of wiki links must match the casing of note names for a link to resolve.',
		defaultValue: false
	})

	rawLinksAutoEmbed = new Setting<boolean>({
		name: '自动嵌入原始链接',
		description: 'When on, raw links on their own line are automatically treated as embed links. (Requires restart.)',
		defaultValue: true
	})

	// Writing
	italicsCharacters = new Setting<string>({
		name: '默认斜体字符',
		description: 'The characters used to italicize text via shortcut.',
		validValues: [
			{
				value: '_',
				description: 'Underscore'
			},
			{
				value: '*',
				description: 'Asterisk'
			}
		]
	})

	boldCharacters = new Setting<string>({
		name: '默认加粗字符',
		description: 'The characters used to embolden text via shortcut.',
		validValues: [
			{
				value: '__',
				description: 'Double underscores'
			},
			{
				value: '**',
				description: 'Double asterisks'
			}
		],
		defaultValue: '**'
	})

	allowInterTextUnderscoreFormatting = new Setting<boolean>({
		name: '文本内下划线强调',
		description: 'Whether or not you can use "_" characters to apply emphasis within a word, e.g. em_pha_sis.',
		defaultValue: false
	})

	smartParagraphBreaks = new Setting<boolean>({
		name: '智能段落换行',
		description: 'When enabled, pressing Enter in a paragraph will insert an extra blank line, ensuring correct markdown behavior.',
		defaultValue: false
	})

	autoSetChildListGlyphs = new Setting<boolean>({
		name: '缩进时更改列表符号',
		description: 'Automatically set the glyphs of list items when indenting.',
		defaultValue: true
	})

	enableSpellCheck = new Setting<boolean>({
		name: '使用拼写检查',
		description: 'Whether Tangent should use spell check or not.',
		defaultValue: true
	})

	filenameSpellCheck = new Setting<'never'|'editing'|'always'>({
		name: '检查文件名拼写',
		description: 'When and how Tangent should use spell check in filenames.',
		validValues: [
			{
				value: 'never',
				displayName: 'Never',
				description: 'Do not use spell check for note filenames.'
			},
			{
				value: 'editing',
				displayName: 'When Editing',
				description: 'Show filename spell check when the filename has focus.'
			},
			{
				value: 'always',
				displayName: 'Always',
				description: 'Always show filename spell check.'
			}
		],
		defaultValue: 'editing'
	})

	contentSpellCheck = new Setting<'never'|'editing'|'always'>({
		name: '检查内容拼写',
		description: 'When and how Tangent should use spell check in note content.',
		validValues: [
			{
				value: 'never',
				displayName: 'Never',
				description: 'Do not use spell check for note content.'
			},
			{
				value: 'editing',
				displayName: 'When Editing',
				description: 'Show spell check while a note has focus.'
			},
			{
				value: 'always',
				displayName: 'Always',
				description: 'Always show content spell check.'
			}
		],
		defaultValue: 'editing'
	})
	
	spellCheckLanguages = new Setting<string, string[]>({
		name: '额外拼写检查\n语言',
		description: 'Languages that will be added to the spellchecker',
		defaultValue: []
	})

	// Keymap
	keymap = new KeymapSettings()

	useKeyCodeShortcuts = new Setting<boolean>({
		name: '使用键码快捷键',
		description: 'When enabled, keyboard shortcuts will be based off of US Keyboard KeyCode values. They will remain in the same physical location & binding no matter what language is currently active.',
		defaultValue: false
	})

	// Code in notes
	letCodeExpand = new Setting<boolean>({
		name: '超宽代码块',
		description: 'Allow code blocks with long lines to expand into the margins of a note.',
		defaultValue: true
	})

	allowUnknownHTMLTags = new Setting<boolean>({
		name: '允许未知 HTML 标签',
		description: 'When true, allow HTML sections to be started by non-standard HTML tag names. (Requires restart.)',
		defaultValue: false
	})

	collapseFrontMatter = new Setting<boolean>({
		name: '折叠 Front Matter',
		description: 'When enabled, front matter will start collapsed.',
		defaultValue: false
	})

	// Debug
	debug_sendCrashReports = new Setting<boolean>({
		name: '发送崩溃报告',
		description: 'When enabled, if Tangent crashes, it will upload a crash report to a third party server to assist with debugging.',
		defaultValue: false
	})

	debug_createVirtualFiles = new Setting<boolean>({
		name: '链接可创建虚拟文件',
		description: 'Whether links that don\'t resolve to a real file should create virtual files. '
			+ '\n\nThis setting is intended for debugging purposes only.',
		defaultValue: true
	})

	debug_sendItemsToTrash = new Setting<boolean>({
		name: '删除项移至废纸篓',
		description: 'Whether or not deleted items should be sent to the OS trash/recycling bin.'
			+ '\n\nIf deleting items causes issues, try disabling this setting.',
		defaultValue: true
	})

	debug_ioQueue_enable = new Setting<boolean>({
		name: '使用 IO 队列',
		description: 'Whether or not to use an IO queue for reading certain files. Experimental.',
		defaultValue: false
	})

	debug_ioQueue_maxActive = new Setting<number>({
		name: '最大活跃 IO 队列项',
		description: 'Sets the maximum number of files that can be processed at once.',
		defaultValue: 100,
		range: {
			min: 1,
			max: 10000,
			step: 1
		}
	})

	debug_maxDisplayedAnnotations = new Setting<number>({
		name: '最大显示标注数',
		description: 'Sets the maximum number of note annotations (e.g. search results) that will be displayed at once.',
		defaultValue: 100,
		range: {
			min: 1,
			max: 10000,
			step: 1
		}
	})

	constructor() {
		super()
		this.setupObservables()
	}
}
