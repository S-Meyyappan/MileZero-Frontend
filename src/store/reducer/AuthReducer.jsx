const initialState = {
    form: {
        token: "",
        username: "",
        role: "",
        expirationTime: "",
        errMessage: ""
    }
}

export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'AUTH/LOGIN_SUCCESS':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload,
                    errMessage: ""
                }
            }
        case 'AUTH/LOGIN_FAIL':
            return {
                ...state,
                form: {
                    ...initialState.form,
                    errMessage: action.payload
                }
            }
        case 'AUTH/LOGOUT':
            return initialState

        default:
            return state
    }
}