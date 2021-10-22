
export const addmsg = msg => {
    return {
        type: 'ADD_MSG',
        data: { msg }
    }
}
export const removemsg = () => {
    return {
        type: 'REMOVE_MSG',
    }
}

const initialState = {
    text: '',
    show: false
}

const notificatinoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MSG':
            return { text: action.data.msg, show: true }
        case 'REMOVE_MSG':
            return { text: '', show: false }
        default: return state
    }
}

export default notificatinoReducer