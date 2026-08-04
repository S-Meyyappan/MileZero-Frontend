import { configureStore } from "@reduxjs/toolkit";
import { BookingSearchReducer } from "./Reducer/BookingSearchReducer";
import { AddonReducer } from "./reducer/AddonReducer";

export default configureStore({
    reducer : {
        search : BookingSearchReducer,
        addon : AddonReducer
    }
})