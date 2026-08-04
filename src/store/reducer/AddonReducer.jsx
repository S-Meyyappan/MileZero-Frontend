const initialState = {
    list : []
}

export const AddonReducer = (state=initialState, action) => {
        switch (action.type) {
        case 'GET_ALL':
            return {
                ...state,
                list: action.payload
            }
        default :
            return state
    }
}