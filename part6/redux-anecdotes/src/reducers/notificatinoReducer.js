let timeoutID = null
export const setNotification = (ntf, limit) =>
    async dispatch => {
        dispatch({
            type: 'ADD_NTF',
            data: { ntf }
        })
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NTF',
            })
        }, limit)
    }

const notificatinoReducer = (state = '', action) => {
    switch (action.type) {
        case 'ADD_NTF':
            clearTimeout(timeoutID)
            return action.data.ntf
        case 'REMOVE_NTF':
            return ''
        default: return state
    }
}

export default notificatinoReducer