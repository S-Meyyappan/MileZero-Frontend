import { useState } from "react";
import { useNavigate } from "react-router";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import {
    IconMapPin,
    IconCalendarEvent,
    IconSearch
} from "@tabler/icons-react";

import "../css/BookingSearchBar.css";

function BookingSearchBar() {

    const navigate = useNavigate();

    const [pickupLocation, setPickupLocation] = useState("");

    const [dropLocation, setDropLocation] = useState("");

    const [pickupDate, setPickupDate] = useState(new Date());

    const [returnDate, setReturnDate] = useState(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    function handleSearch() {

        // TODO:
        // Redux + Backend later

        navigate("/vehicles");

    }

    return (

        <section className="booking-search py-3">

            <div className="container">

                <div className="card border-0 shadow-sm rounded-5">

                    <div className="card-body py-2">

                        <div className="row g-5 align-items-center">

                            {/* Pickup */}
                            <div className="col-lg border-end booking-item">
                                <small>Pickup</small>

                                <div className="booking-input">
                                    <IconMapPin size={18} />
                                    <select
                                        className="form-select border-0 shadow-none"
                                        value={pickupLocation}
                                        onChange={(e) =>
                                            setPickupLocation(e.target.value)
                                        }
                                    >

                                        <option value="">Select Location</option>
                                        <option>Bangalore</option>
                                        <option>Chennai</option>
                                        <option>Mumbai</option>
                                    </select>
                                </div>
                            </div>


                            {/* Drop */}
                            <div className="col-lg border-end booking-item">
                                <small>Drop</small>

                                <div className="booking-input">
                                    <IconMapPin size={18} />
                                    <select
                                        className="form-select border-0 shadow-none"
                                        value={dropLocation}
                                        onChange={(e) =>
                                            setDropLocation(e.target.value)
                                        }
                                    >

                                        <option value="">Select Location</option>
                                        <option>Bangalore</option>
                                        <option>Chennai</option>
                                        <option>Mumbai</option>
                                    </select>
                                </div>

                            </div>


                            {/* Pickup Date */}
                            <div className="col-lg border-end booking-item">

                                <small>Pickup Date</small>

                                <div className="booking-input">
                                    <IconCalendarEvent size={18} />
                                    <Flatpickr
                                        value={pickupDate}
                                        onChange={([date]) =>
                                            setPickupDate(date)
                                        }
                                        options={{
                                            enableTime: true,
                                            minDate: "today",
                                            minuteIncrement: 30,
                                            dateFormat: "d M Y h:i K"
                                        }}
                                    />
                                </div>
                            </div>


                            {/* Return Date */}
                            <div className="col-lg border-end booking-item">
                                <small>Return Date</small>

                                <div className="booking-input">

                                    <IconCalendarEvent size={18} />
                                    <Flatpickr
                                        value={returnDate}
                                        onChange={([date]) =>
                                            setReturnDate(date)
                                        }
                                        options={{
                                            enableTime: true,
                                            minDate: pickupDate,
                                            minuteIncrement: 30,
                                            dateFormat: "d M Y h:i K"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Search */}

                            <div className="col-lg-2 p-2">
                                <button className="btn btn-warning w-100 rounded-4 fw-semibold py-3"  onClick={handleSearch}>
                                    <IconSearch size={18}className="me-2"/>
                                    Search
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default BookingSearchBar;