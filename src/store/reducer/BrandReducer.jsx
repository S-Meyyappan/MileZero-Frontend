const initialState = {
    list : []
}

export const BrandReducer = (state=initialState, action) =>{

    switch(action.type){
        case 'BRAND/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}