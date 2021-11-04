import userServices from '../services/users'

export const getUsers = () =>
  async dispatch => {
    const users = await userServices.getAll()
    dispatch({
      type: 'GET_USERS',
      data: { users }
    })
  }

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS': return action.data.users
    default: return state
  }
}

export default usersReducer