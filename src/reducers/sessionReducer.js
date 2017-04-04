import constants from '../constants'

var initialState = {
	page: 'home',
	home: {
		selected: 'tutorials'
	},
	tutorial: {
		selected: 'overview',
		slug: ''
	},
	post: {
		selected: 'overview',
		slug: ''
	}
}


export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.SELECT_MENU_ITEM: // {"name":"community","page":"home","selected":false}
//			console.log('SELECT_MENU_ITEM: '+JSON.stringify(action.item))
			
			let page = Object.assign({}, newState[action.item.page])
			page['selected'] = action.item.name
			newState[action.item.page] = page

			return newState

		default:
			return state
	}

}