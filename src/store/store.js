import { configureStore } from "@reduxjs/toolkit";
import { BookingSearchReducer } from "./Reducer/BookingSearchReducer";

export default configureStore({
    reducer : {
        search : BookingSearchReducer
    }
})