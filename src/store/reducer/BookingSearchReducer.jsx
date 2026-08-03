
const initialState = {
    form: {
        pickupBranch: 0,
        dropBranch: 0,
        pickupDate: Date.now(), // Simple number storing in milliseconds
        returnDate: Date.now() + 24 * 60 * 60 * 1000 
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

        case 'SET_PICKUP_DATE':
            let newPickupDate = action.payload
            let existingReturnDate = state.form.returnDate
            
            // return date should not be after new pickupdate
            if (existingReturnDate < newPickupDate) {
                existingReturnDate = newPickupDate + (24 * 60 * 60 * 1000);
            }

            return {
                ...state,
                form: {
                    ...state.form,
                    pickupDate: newPickupDate,
                    returnDate: existingReturnDate
                }
            }

        case 'SET_RETURN_DATE':
             return {
                ...state,
                form: {
                    ...state.form,
                    returnDate: action.payload
                }
            }

        case 'RESET_BOOKING_FORM':
            return initialState

        default:
            return state

    }
}