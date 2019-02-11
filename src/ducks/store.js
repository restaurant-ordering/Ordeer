import {createStore, applyMiddleware} from 'redux'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
const middleware = [reduxPromiseMiddleware]
export default createStore(reducer, applyMiddleware(...middleware))
