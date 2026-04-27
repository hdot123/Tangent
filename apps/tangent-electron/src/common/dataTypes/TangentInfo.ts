import { ObjectStore, WritableStore } from 'common/stores'
import { DirectoryStore, TreeItemListReference, TreeItemReference, type TreeNode } from 'common/trees'
import type { DataTypeConstructionContext } from './DataType'
import type DataType from './DataType'
import { enumKeys } from 'common/utils'
import ZoomSetting from 'common/settings/ZoomSetting'
import type { SettingDefinition } from 'common/settings/Setting'

export const filename = 'tangent.json'

export enum FocusLevel {
	Map = -1,

	Thread = 0,

	File = 1,
	Typewriter = 2,
	Paragraph = 3,
	Line = 4,
	Sentence = 5,

	Lowest = Map,
	Highest = Sentence
}

export namespace FocusLevel {
	export function getShortName(level: FocusLevel) {
		const names: Record<number, string> = {
			[FocusLevel.Map]: '地图',
			[FocusLevel.Thread]: '线索',
			[FocusLevel.File]: '文件',
			[FocusLevel.Typewriter]: '打字机',
			[FocusLevel.Paragraph]: '段落',
			[FocusLevel.Line]: '行',
			[FocusLevel.Sentence]: '句子',
		}
		return names[level] ?? String(level)
	}

	export function getFullName(level: FocusLevel, capitalized=true) {
		let result = getShortName(level)
		if (level >= FocusLevel.File) {
			result += capitalized ? ' 专注模式' : ' 专注模式'
		}
		else {
			result += capitalized ? ' 视图' : ' 视图'
		}
		return result
	}

	function* iterFocusLevels(from: FocusLevel = FocusLevel.Lowest, to: FocusLevel = FocusLevel.Highest) {
		for (let i = from; i <= to; i++) {
			yield i as FocusLevel
		}
	}

	export const allFocusLevels = [...iterFocusLevels()]
	export const focusModeFocusLevels = [...iterFocusLevels(FocusLevel.File, FocusLevel.Highest)]

	export function describeFocusLevel(level: FocusLevel) {
		switch (level) {
			case FocusLevel.File:
				return `隐藏除选中文件外的所有其他文件。`
			case FocusLevel.Typewriter:
				return `隐藏所有其他文件，并在打字时将光标垂直居中。`
			case FocusLevel.Paragraph:
				return `隐藏所有其他文件，并高亮当前段落块。`
			case FocusLevel.Line:
				return '隐藏所有其他文件，并高亮当前行。'
			case FocusLevel.Sentence:
				return `隐藏所有其他文件，并高亮当前句子。`
		}
	}
}

const mapZoomDefinition: SettingDefinition<number> = {
	defaultValue: 1,
	range: {
		min: .1,
		max: 1
	}
}

export default class TangentInfo extends ObjectStore {
	_store: DirectoryStore

	openSessions: TreeItemListReference<TreeNode>
	activeSession: TreeItemReference<TreeNode>

	focusLevel = new WritableStore(FocusLevel.Thread)

	scrollX: WritableStore<number> = new WritableStore(0)
	scrollY: WritableStore<number> = new WritableStore(0)
	zoom = new ZoomSetting(mapZoomDefinition)

	constructor({ store, json }: DataTypeConstructionContext) {
		super()

		this._store = store

		this.openSessions = new TreeItemListReference(store, [])
		this.activeSession = new TreeItemReference(store, null)

		this.applyPatch(json)

		this.setupObservables()
	}

	static isType(store: DirectoryStore, node: TreeNode) {
		return node.path.endsWith(filename)
	}
}

TangentInfo satisfies DataType
