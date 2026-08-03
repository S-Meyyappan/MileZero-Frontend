import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import {
    IconMapPin,
    IconCalendarEvent,
    IconSearch,
    IconLocationPin,
    IconBuilding,
    IconPlane,
    IconAlertCircle
} from "@tabler/icons-react";

import "../css/BookingSearchBar.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPickupBranch, setDropBranch, setPickupDate, setReturnDate } from "../store/actions/BookingSearchActions";

function BookingSearchBar() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);

    const [pickupSearch, setPickupSearch] = useState("");
    const [showPickup, setShowPickup] = useState(false);

    const [dropSearch, setDropSearch] = useState("");
    const [showDrop, setShowDrop] = useState(false);

    const form = useSelector((state) => state.search.form)

    const changePickupBranch = (branch) =>{
        dispatch(setPickupBranch(branch))
    }

    const changeDropBranch = (branch) =>{
        dispatch(setDropBranch(branch))
    }

    const changePickupDate = (date) =>{
        dispatch(setPickupDate(new Date(date)))
    }

    const changeReturnDate = (date) =>{
        dispatch(setReturnDate(new Date(date)))
    }

    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const filteredPickup = branches.filter(branch => {
        if (!pickupSearch.trim()) return false;
        return (
            branch.name.toLowerCase().includes(pickupSearch.toLowerCase()) ||
            branch.city.toLowerCase().includes(pickupSearch.toLowerCase())
        );
    });

    const filteredDrop = branches.filter(branch => {
        if (!dropSearch.trim()) return false;
        return (
            branch.name.toLowerCase().includes(dropSearch.toLowerCase()) ||
            branch.city.toLowerCase().includes(dropSearch.toLowerCase())
        );
    });

    console.log(form)

    function handleSearch() {

        // TODO:
        // Redux + Backend later
        if (!form.pickupBranch || !form.dropBranch  || !form.pickupDate  || !form.returnDate) {
            setError(true)
            setShowAlert(true)
        }
        else {
            setShowAlert(false);
            navigate("/vehicles");
        }
    }

    useEffect(() => {

        const getBranches = async () => {
            const response = await axios.get(`http://localhost:8080/api/branch/get-all`)
            setBranches(response.data)
        }

        getBranches()

    }, [])

    return (

        <section className="booking-search py-3">

            <div className="container">

                {showAlert && (
                    <div className="alert alert-danger alert-dismissible fade show rounded-4 mb-3 d-flex align-items-center" role="alert">
                        <IconAlertCircle className="me-2 flex-shrink-0" size={20} />
                        <div>Please select valid pickup/drop locations and dates before searching.</div>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowAlert(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                <div className="card border-0 shadow-sm rounded-5">

                    <div className="card-body py-2">

                        <div className="row g-5 align-items-center">

                            {/* Pickup */}
                            <div className="col-lg border-end booking-item position-relative">

                                <small>Pickup</small>

                                <div className="booking-input">
                                    <IconMapPin size={18} />
                                    <input type="text" className="form-control border-0 shadow-none" placeholder="Search branch..."
                                        value={pickupSearch}
                                        onFocus={() => setShowPickup(true)}
                                        onChange={(e) => {
                                            setPickupSearch(e.target.value);
                                            setShowPickup(true);
                                        }}
                                    />
                                </div>

                                {
                                    showPickup && filteredPickup.length > 0 && (
                                        <div className="dropdown-menu show w-auto mt-2 shadow-sm">
                                            {
                                                filteredPickup.map(branch => (
                                                    <button key={branch.id} type="button" className="dropdown-item"
                                                        onClick={() => {
                                                            changePickupBranch(branch);
                                                            setPickupSearch(branch.name);
                                                            setShowPickup(false);
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                branch.name.includes("Airport") ? <IconPlane size={18} /> : <IconBuilding size={18} />
                                                            }
                                                            <div className="fw-semibold mx-2">{branch.name}</div>
                                                        </div>
                                                        <small className="text-muted">{branch.city}</small>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    )
                                }

                            </div>


                            {/* Drop */}
                            <div className="col-lg border-end booking-item position-relative">

                                <small>Drop</small>

                                <div className="booking-input">
                                    <IconMapPin size={18} />
                                    <input type="text" className="form-control border-0 shadow-none" placeholder="Search branch..."
                                        value={dropSearch}
                                        onFocus={() => setShowDrop(true)}
                                        onChange={(e) => {
                                            setDropSearch(e.target.value);
                                            setShowDrop(true);
                                        }}
                                    />
                                </div>

                                {
                                    showDrop && filteredDrop.length > 0 && (
                                        <div className="dropdown-menu show w-auto mt-2 shadow-sm">
                                            {
                                                filteredDrop.map(branch => (
                                                    <button key={branch.id} type="button" className="dropdown-item"
                                                        onClick={() => {
                                                            changeDropBranch(branch);
                                                            setDropSearch(branch.name);
                                                            setShowDrop(false);
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                branch.name.includes("Airport") ? <IconPlane size={18} /> : <IconBuilding size={18} />
                                                            }
                                                            <div className="fw-semibold mx-2">{branch.name}</div>
                                                        </div>
                                                        <small className="text-muted">{branch.city}</small>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    )
                                }

                            </div>


                            {/* Pickup Date */}
                            <div className="col-lg border-end booking-item">

                                <small>Pickup Date</small>

                                <div className="booking-input">
                                    <IconCalendarEvent size={18} />
                                    <Flatpickr
                                        value={new Date(form.pickupDate)}
                                        onChange={([date]) =>
                                            changePickupDate(date)
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
                                        value={new Date(form.returnDate)}
                                        onChange={([date]) =>
                                            changeReturnDate(date)
                                        }
                                        options={{
                                            enableTime: true,
                                            minDate: form.pickupDate,
                                            minuteIncrement: 30,
                                            dateFormat: "d M Y h:i K"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Search */}

                            <div className="col-lg-2 p-2">
                                <button className="btn btn-warning w-100 rounded-4 fw-semibold py-3" onClick={handleSearch}>
                                    <IconSearch size={18} className="me-2" />
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