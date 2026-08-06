import BookingCard from "./BookingCard";
import {IconCalendarOff} from "@tabler/icons-react";

export default function BookingList({ 
        bookings,
        loading,
        refreshBookings
    }) {

    if (loading) {
        return (
            <div className="row g-4">
                {
                    new Array(6).fill(0).map((_, index) => (

                        <div key={index} className="col-lg-6">
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <div className="placeholder-glow">
                                        <span className="placeholder col-5 mb-3"></span>
                                        <span className="placeholder col-8 mb-2"></span>
                                        <span className="placeholder col-6 mb-2"></span>
                                        <span className="placeholder col-10 mb-2"></span>
                                        <span className="placeholder col-7"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>

        );

    }

    if (!bookings?.length) {
        return (
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center py-5">
                    <IconCalendarOff size={60} className="text-secondary mb-3" />
                    <h4 className="fw-bold">No Bookings Found</h4>
                    <p className="text-muted mb-0">There are no bookings matching your filters.</p>
                </div>
            </div>
        )}

    return (

        <div className="row g-4">

            {
                bookings.map((booking) => (
                    <div key={booking.bookingId} className="col-lg-6">
                        <BookingCard
                            booking={booking}
                            refreshBookings={refreshBookings}
                        />
                    </div>
                ))
            }

        </div>

    )

}