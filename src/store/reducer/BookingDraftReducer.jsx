const initialState = {
    draft: {
        vehicle: null,
        form: null,
        quote: null,
        requestedKm: 0,
        selectedAddons: {},
        addons: [],
        bookingBody: null
    }
};

export const BookingDraftReducer = (state = initialState, action) => {

    switch (action.type) {

        case "BOOKING_DRAFT/SAVE":
            return {
                ...state,
                draft: action.payload
            };

        case "BOOKING_DRAFT/CLEAR":
            return initialState;

        default:
            return state;
    }

};