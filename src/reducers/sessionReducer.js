import constants from '../constants'

var initialState = {
	selectedMenuItem: 'home',
	page: 'home',
	home: {
		selected: 'tutorials'
	},
	tutorial: {
		selected: 'overview'
	}
}


export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.SELECT_MENU_ITEM: // {"name":"community","page":"home","selected":false}
//			console.log('SELECT_MENU_ITEM: '+JSON.stringify(action.item))
//			newState['selectedMenuItem'] = action.item
			newState[action.item.page] = {
				selected: action.item.name
			}

			return newState

		// case constants.TOGGLE_LOADING:
		// 	newState['isLoading'] = action.isLoading
		// 	return newState

		default:
			return state
	}

}