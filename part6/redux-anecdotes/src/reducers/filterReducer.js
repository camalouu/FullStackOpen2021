

export const createFilter = str => {
    return {
        type: 'FILTER',
        data: { str }
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER': return action.data.str
        default: return state
    }
}

export default filterReducer