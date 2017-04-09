import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { accountReducer, sessionReducer, courseReducer, tutorialReducer, postReducer, commentReducer, profileReducer, projectReducer } from '../reducers'

var store
export default {

	configureStore: (initialState) => {
		
		var reducers = combineReducers({
			account: accountReducer,
			session: sessionReducer,
			course: courseReducer,
			tutorial: tutorialReducer,
			comment: commentReducer,
			post: postReducer,
			project: projectReducer,
			profile: profileReducer
		})

		store = createStore(
		    reducers,
		    initialState,
		    applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}

}







