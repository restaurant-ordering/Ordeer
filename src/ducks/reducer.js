//initial state
const initialState = {
	user: {}
}

//constants
const UPDATE_USER = 'UPDATE_USER'

//action creators
export const updateUser = user => {
	return {
		type: UPDATE_USER,
		payload: user
	}
}
//reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return {...state, user: action.payload}
		default:
			return state
	}
}
export default reducer
