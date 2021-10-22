import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteRreducer from './reducers/anecdoteReducer'
import notificatinoReducer from './reducers/notificatinoReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteRreducer,
    notification: notificatinoReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store