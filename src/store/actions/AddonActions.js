import axios from "axios"

export const getAllAddons = () => async (dispatch) => {
        const response = await axios.get("http://localhost:8080/api/addon/get-all")
        dispatch({
            type : "ADDON/GET_ALL",
            payload : response.data
        })
}