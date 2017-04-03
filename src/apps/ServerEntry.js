import React, { Component } from 'react'
import { Provider } from 'react-redux'

export default (props) => {

	return (
		<Provider store={props.store}>
			{props.component}
		</Provider>

	)

}