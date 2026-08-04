import axios from "axios"

export const getAllBrands = () => async (dispatch) => {

    const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-brands`)
    dispatch({
        type: "BRAND/GET_ALL",
        payload: response.data
    })
}