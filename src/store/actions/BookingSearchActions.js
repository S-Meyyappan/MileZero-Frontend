export const setPickupBranch = (branch) => ({
  type: "SET_PICKUP_BRANCH",
  payload: branch
});

export const setDropBranch = (branch) => ({
  type: "SET_DROP_BRANCH",
  payload: branch
});

export const setPickupDate = (dateString) => ({
  type: "SET_PICKUP_DATE",
  payload: dateString.getTime()
});

export const setReturnDate = (dateString) => ({
  type: "SET_RETURN_DATE",
  payload: dateString.getTime()
});

export const resetBookingForm = () => ({
  type: "RESET_BOOKING_FORM"
});