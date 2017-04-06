import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.PROFILES_RECEIVED:
			// console.log('PROFILES_RECEIVED: '+JSON.stringify(action.data))
			newState['all'] = action.data
			return newState

		default:
			return state
	}
}