import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let all = Object.assign([], newState.all)

	switch (action.type) {
		case constants.COMMENTS_RECEIVED:
			console.log('COMMENTS_RECEIVED: '+JSON.stringify(action.data))
			newState['all'] = action.data
			return newState

		case constants.COMMENT_CREATED:
			console.log('COMMENT_CREATED: '+JSON.stringify(action.data))
			all.unshift(action.data)
			newState['all'] = all
			return newState

		default:
			return state
	}

}