export const addNotification = message =>
  async dispatch => {
    dispatch({
      type: 'ADD_NTF',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NTF',
        data: { message: '' }
      })
    }, 3000)
  }

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_NTF':
      return action.data.message
    case 'REMOVE_NTF':
      return ''
    default: return state
  }
}

export default notificationReducer