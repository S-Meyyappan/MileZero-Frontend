const initialState = {
    initialized: false,
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
                initialized: true,
                form: {
                    ...state.form,
                    ...action.payload,
                    errMessage: ""
                }
            }
        case 'AUTH/LOGIN_FAIL':
            return {
                ...state,
                initialized: true,
                form: {
                    ...initialState.form,
                    errMessage: action.payload
                }
            }
        case 'AUTH/LOGOUT':
            return {
                ...state,
                initialized: true,
                form: initialState.form
            }
        case "AUTH/RESTORE":
            return {
                initialized: true,
                form: {
                    ...action.payload,
                    errMessage: ""
                }
            };

        case "AUTH/NO_SESSION":
            return {
                ...state,
                initialized: true,
                form: initialState.form
            };
        default:
            return state
    }
}