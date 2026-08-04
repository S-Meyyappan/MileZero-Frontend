import { Link } from "react-router";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandX,
    IconMapPin,
    IconPhone,
    IconMail,
    IconCoinMoneroFilled
} from "@tabler/icons-react";

function Footer() {

    return (

        <footer className="bg-white border-top mt-5">

            <div className="container py-5">

                <div className="row gy-5">

                    {/* Brand */}

                    <div className="col-lg-4">

                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div className="brand-icon">
                                <IconCoinMoneroFilled size={24} />
                            </div>
                            <div className="heading-font fw-bold fs-3">
                                MileZero
                            </div>
                        </div>

                        <p className="text-secondary">
                            Every Journey Starts at MileZero.
                            Start Yours Today.
                        </p>

                        <div className="d-flex gap-2 mt-4">
                            <button className="btn btn-light rounded-circle">
                                <IconBrandFacebook size={18} />
                            </button>
                            <button className="btn btn-light rounded-circle">
                                <IconBrandInstagram size={18} />
                            </button>
                            <button className="btn btn-light rounded-circle">
                                <IconBrandX size={18} />
                            </button>
                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-6 col-lg-2">
                        <h6 className="fw-bold mb-3">
                            Company
                        </h6>
                        <div className="d-flex flex-column gap-2">
                            <Link to="/">Home</Link>
                            <Link to="/vehicles">Vehicles</Link>
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact</Link>
                        </div>

                    </div>

                    {/* Support */}

                    <div className="col-6 col-lg-2">
                        <h6 className="fw-bold mb-3">
                            Support
                        </h6>
                        <div className="d-flex flex-column gap-2">
                            <Link to="/faq">FAQ</Link>
                            <Link to="/terms">Terms</Link>
                            <Link to="/privacy">Privacy</Link>
                        </div>
                    </div>

                    {/* Contact */}

                    <div className="col-lg-4">
                        <h6 className="fw-bold mb-3">
                            Contact
                        </h6>
                        <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                            <IconMapPin size={18} />
                            Dindigul, Tamilnadu
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-3 text-secondary">
                            <IconPhone size={18} />
                            +91 98765 43210
                        </div>
                        <div className="d-flex align-items-center gap-2 text-secondary">
                            <IconMail size={18} />
                            support@milezero.com
                        </div>
                    </div>

                </div>

            </div>

            <div className="border-top">
                <div className="container py-3">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <small className="text-secondary">
                            © 2026 MileZero. All Rights Reserved.
                        </small>

                        <small className="text-secondary mt-2 mt-md-0">
                            Built with ❤️ for better journeys.
                        </small>
                    </div>
                </div>

            </div>

        </footer>

    );

}

export default Footer;