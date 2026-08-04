const initialState = {
    list : []
}

export const FueltypeReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FUELTYPE/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}