
export const addmsg = msg => {
    return {
        type: 'ADDMSG',
        data: { msg }
    }
}
export const removemsg = () => {
    return {
        type: 'REMOVEMSG',
    }
}

const initialState = {
    text: '',
    show: false
}

const notificatinoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDMSG':
            return { text: action.data.msg, show: true }
        case 'REMOVEMSG':
            return { text: '', show: false }
        default: return state
    }
}

export default notificatinoReducer