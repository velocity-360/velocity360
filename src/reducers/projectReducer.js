import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.PROJECTS_RECEIVED:
			// console.log('PROJECTS_RECEIVED: '+JSON.stringify(action.data))
			newState['all'] = action.data
			return newState

		case constants.PROJECT_CREATED:
			// console.log('PROJECTS_RECEIVED: '+JSON.stringify(action.data))
			let all = Object.assign([], newState.all)
			all.unshift(action.data)
			newState['all'] = all
			return newState

		default:
			return state
	}

}