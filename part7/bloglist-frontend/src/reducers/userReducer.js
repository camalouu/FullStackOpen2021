
import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

export const login = ({ username, password }) =>
  async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('newuser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: { user }
      })
      dispatch(addNotification(`Welcome ${user.username}`))
    } catch ({ response }) {
      dispatch(addNotification(response.data.error))
    }
  }


export const logout = () => {
  window.localStorage.removeItem('newuser')
  return {
    type: 'LOGOUT'
  }
}

export const getFromLocal = () => {
  let user = {}
  const userLoggedIn = window.localStorage.getItem('newuser')
  if (userLoggedIn) {
    user = JSON.parse(userLoggedIn)
    blogService.setToken(user.token)
  }
  return {
    type: 'USER_FROM_LOCAL_STORAGE',
    data: { user }
  }
}


const userReduser = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data.user
    case 'USER_FROM_LOCAL_STORAGE':
      return action.data.user
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export default userReduser