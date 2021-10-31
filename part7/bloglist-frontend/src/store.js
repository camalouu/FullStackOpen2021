import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReduser from './reducers/userReducer'

const combined = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReduser
})

const store = createStore(combined, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store