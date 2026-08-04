import axios from "axios"

export const getAllTransmissions = () => async (dispatch) => {

    const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-transmissions`)
    dispatch({
        type: "TRANSMISSION/GET_ALL",
        payload: response.data
    })
}