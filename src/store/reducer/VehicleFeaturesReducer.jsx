const initialState = {
    list : []
}

export const VehicleFeaturesReducer = (state=initialState, action) => {

    switch(action.type){
        case 'FEATURES/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}