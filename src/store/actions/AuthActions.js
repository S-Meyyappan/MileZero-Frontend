import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
    try {

        let authToken = window.btoa(email + ":" + password);

        const headerConfig = {
            headers: {
                'Authorization': 'Basic ' + authToken
            }
        };

        const response = await axios.post('http://localhost:8080/api/auth/login', {}, headerConfig);

        dispatch({
            type: "AUTH/LOGIN_SUCCESS",
            payload: response.data
        });
    } catch (error) {

        dispatch({
            type: "AUTH/LOGIN_FAIL",
            payload: "Invalid Credentials",
        });
    }
};

export const logoutUser = () => ({
    type: "AUTH/LOGOUT"
})
