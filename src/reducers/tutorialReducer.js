import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.TUTORIALS_RECEIVED:
			// {"type":"TUTORIALS_RECEIVED", "params":{"subscribers":"58ce633972c0ea1fce88e8ca"},"data":[]}
			// console.log('TUTORIALS_RECEIVED: '+JSON.stringify(action))
			newState['all'] = action.data

			action.data.forEach((tutorial, i) => {
				if (newState[tutorial.id] == null){
					newState[tutorial.id] = tutorial
					newState[tutorial.slug] = tutorial
					//updatedList.push(tutorial)
				}
			})

			return newState

		// case constants.TUTORIAL_UPDATED:
		// 	newState[action.tutorial.id] = action.tutorial
		// 	newState[action.tutorial.slug] = action.tutorial

		// 	let array = []
		// 	updatedList.forEach((tutorial, i) => {
		// 		if (tutorial.id == action.tutorial.id) // replace old with new
		// 			array.push(action.tutorial)
		// 		else
		// 			array.push(tutorial)
		// 	})

		// 	newState['all'] = array
		// 	return newState

		default:
			return state
	}

}