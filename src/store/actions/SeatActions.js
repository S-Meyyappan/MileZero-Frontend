import axios from "axios"

export const getAllSeats = () => async (dispatch) => {

    const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-seats`)
    dispatch({
        type: "SEAT/GET_ALL",
        payload: response.data
    })
}