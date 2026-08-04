import axios from "axios"

export const getAllCategories = () => async (dispatch) => {
    
    const response = await axios.get("http://localhost:8080/api/category/get-all")
    dispatch({
        type: "CATEGORY/GET_ALL",
        payload: response.data
    })
}