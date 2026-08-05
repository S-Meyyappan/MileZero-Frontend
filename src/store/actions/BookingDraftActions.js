export const saveBookingDraft = (draft) => ({
    type: "BOOKING_DRAFT/SAVE",
    payload: draft
});

export const clearBookingDraft = () => ({
    type: "BOOKING_DRAFT/CLEAR"
});

