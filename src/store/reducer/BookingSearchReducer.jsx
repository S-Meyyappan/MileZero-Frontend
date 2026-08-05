import { calcDuration } from "../../utils/calcDuration";

const initialState = {
    form: {
        pickupBranch: null,
        dropBranch: null,
        pickupDate: Date.now(),
        returnDate: Date.now() + 24 * 60 * 60 * 1000,

        bookingMode: "DAY",
        duration: 1,
    }
}

export const BookingSearchReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_PICKUP_BRANCH':
            return {
                ...state,
                form: {
                    ...state.form,
                    pickupBranch: action.payload
                }
            }

        case 'SET_DROP_BRANCH':
            return {
                ...state,
                form: {
                    ...state.form,
                    dropBranch: action.payload
                }
            }

        case "SET_PICKUP_DATE": {

            let pickupDate = action.payload;
            let returnDate = state.form.returnDate;

            if (returnDate < pickupDate) {
                returnDate = pickupDate + 24 * 60 * 60 * 1000;
            }

            const result = calcDuration(
                pickupDate,
                returnDate,
                state.form.bookingMode
            );

            return {
                ...state,
                form: {
                    ...state.form,
                    pickupDate,
                    returnDate,
                    ...result
                }
            };
        }

        case "SET_RETURN_DATE": {

            const returnDate = action.payload;

            const result = calcDuration(
                state.form.pickupDate,
                returnDate,
                state.form.bookingMode
            );

            return {
                ...state,
                form: {
                    ...state.form,
                    returnDate,
                    ...result
                }
            };
        }

        case "RESET_BOOKING_FORM": {

            const pickupDate = Date.now();
            const returnDate = pickupDate + 24 * 60 * 60 * 1000;
            const bookingMode = "DAY";

            return {
                form: {
                    pickupBranch: null,
                    dropBranch: null,
                    pickupDate,
                    returnDate,
                    bookingMode,
                    ...calcDuration(pickupDate, returnDate, bookingMode)
                }
            };
        }

        case "SET_BOOKING_MODE": {

            const bookingMode = action.payload;

            const result = calcDuration(
                state.form.pickupDate,
                state.form.returnDate,
                bookingMode
            );

            return {
                ...state,
                form: {
                    ...state.form,
                    bookingMode,
                    ...result
                }
            };
        }

        default:
            return state

    }
}