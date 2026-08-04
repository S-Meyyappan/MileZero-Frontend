const initialState = {
    list : []
}

export const SeatReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SEAT/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}