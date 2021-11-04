let timeoutId

export const addNotification = message =>
  async dispatch => {
    dispatch({
      type: 'ADD_NTF',
      data: { message }
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NTF',
        data: { message: '' }
      })
    }, 3000)
  }

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_NTF':
      clearTimeout(timeoutId)
      return action.data.message
    case 'REMOVE_NTF':
      return ''
    default: return state
  }
}

export default notificationReducer