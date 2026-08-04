import axios from "axios"

export const getAllFuelTypes = () => async (dispatch) => {

    const response = await axios.get(`http://localhost:8080/api/vehicle/get-all-fuel-types`)
    dispatch({
        type: "FUELTYPE/GET_ALL",
        payload: response.data
    })
}