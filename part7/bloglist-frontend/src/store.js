import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const combined = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedInUser: loginReducer,
  users: usersReducer
})

const store = createStore(combined, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store