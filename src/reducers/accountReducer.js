import constants from '../constants'

var initialState = {
	currentUser: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let currentUser = Object.assign([], newState.currentUser)

	switch (action.type) {
		case constants.CURRENT_USER_RECIEVED:
			// console.log('CURRENT_USER_RECIEVED: '+JSON.stringify(action.profile))
			newState['currentUser'] = action.profile
			return newState

		case constants.PROFILE_UPDDATED:
			if (newState.currentUser == null)
				return newState

			if (newState.currentUser.id != action.data.id)
				return newState

			console.log('ACCONT REDUCER - PROFILE_UPDDATED: '+JSON.stringify(action.data))
			newState['currentUser'] = action.data
			return newState

		default:
			return state
	}
}