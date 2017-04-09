import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let all = Object.assign([], newState.all)

	switch (action.type) {
		case constants.PROJECTS_RECEIVED:
			// console.log('PROJECTS_RECEIVED: '+JSON.stringify(action.data))
			newState['all'] = action.data
			return newState

		case constants.PROJECT_CREATED:
			all.unshift(action.data)
			newState['all'] = all
			return newState

		case constants.PROJECT_UPDATED:
			// console.log('PROJECT_UPDATED: '+JSON.stringify(action.data))
			let array = []
			all.forEach((project, i) => {
				if (project.id == action.data.id)
					array.push(action.data)
				else 
					array.push(project)
			})

			newState['all'] = array
			return newState

		default:
			return state
	}

}