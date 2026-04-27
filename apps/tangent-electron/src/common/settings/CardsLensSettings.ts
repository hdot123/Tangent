import { ObjectStore } from 'common/stores'
import type { SettingDefinition } from './Setting'
import Setting from './Setting'
import { NodeSortStore } from './Sorting'

const showWordCountDefinition: SettingDefinition<boolean> = {
	name: '显示字数',
	defaultValue: true
}

export default class CardsLensSettings extends ObjectStore {
	sorting = new NodeSortStore()

	showWordCount = new Setting<boolean>(showWordCountDefinition)
	
	constructor() {
		super()
		this.setupObservables()
	}
}