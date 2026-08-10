import axios from "axios"

export const getAllFeatures = () => async (dispatch) => {

    const response = await axios.get(`http://localhost:8080/api/feature/get-all`)
    dispatch({
        type: "FEATURES/GET_ALL",
        payload: response.data
    })
}