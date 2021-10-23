
export const setNotification = (ntf, limit) =>
    async dispatch => {
        dispatch({
            type: 'ADD_NTF',
            data: { ntf }
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NTF',
            })
        }, limit)
    }

const initialState = {
    text: '',
    show: false
}

const notificatinoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NTF':
            return { text: action.data.ntf, show: true }
        case 'REMOVE_NTF':
            return { text: '', show: false }
        default: return state
    }
}

export default notificatinoReducer