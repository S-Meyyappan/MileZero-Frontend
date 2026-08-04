const initialState = {
    list : []
}

export const CategoryReducer = (state=initialState, action) => {

    switch(action.type){
        case 'CATEGORY/GET_ALL':
            return{
                ...state,
                list : action.payload
            }
        default:
            return state
    }
}