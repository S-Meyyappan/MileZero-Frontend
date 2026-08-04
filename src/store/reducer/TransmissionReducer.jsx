const initialState = {
    list : []
}

export const TransmissionReducer = (state=initialState, action) => {
    switch(action.type){
        case 'TRANSMISSION/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}