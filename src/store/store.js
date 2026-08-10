import { configureStore } from "@reduxjs/toolkit";
import { BookingSearchReducer } from "./Reducer/BookingSearchReducer";
import { AddonReducer } from "./reducer/AddonReducer";
import { CategoryReducer } from "./reducer/CategoryReducer";
import { BrandReducer } from "./reducer/BrandReducer";
import { SeatReducer } from "./reducer/SeatReducer";
import { FueltypeReducer } from "./reducer/FueltypeReducer";
import { TransmissionReducer } from "./reducer/TransmissionReducer";
import { AuthReducer } from "./reducer/AuthReducer";
import { BookingDraftReducer } from "./reducer/BookingDraftReducer";
import { VehicleFeaturesReducer } from "./reducer/VehicleFeaturesReducer";

export default configureStore({
    reducer : {
        search : BookingSearchReducer,
        addon : AddonReducer,
        category : CategoryReducer,
        brand : BrandReducer,
        seat : SeatReducer,
        fueltype : FueltypeReducer,
        transmission : TransmissionReducer,
        feature : VehicleFeaturesReducer,
        auth : AuthReducer,
        booking : BookingDraftReducer
    }
})