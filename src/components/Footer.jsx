import { Link } from "react-router";

import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandInstagram,
    IconMail,
    IconPhone,
    IconMapPin,
    IconCoinMoneroFilled
} from "@tabler/icons-react";

import "../css/Footer.css";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="container">

                <div className="row gy-5">

                    {/* Brand */}

                    <div className="col-lg-4">

                        <div className="footer-brand">

                            <IconCoinMoneroFilled
                                size={42}
                                color="#2563eb"
                            />

                            <div>

                                <div className="footer-logo">

                                    MileZero

                                </div>

                                <div className="footer-tagline">

                                    Every Journey Starts at MileZero.
                                    Start Yours Today.

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-6 col-lg-2">

                        <div className="footer-heading">

                            Explore

                        </div>

                        <Link to="/" className="footer-link">

                            Home

                        </Link>

                        <Link to="/vehicles" className="footer-link">

                            Vehicles

                        </Link>

                        <Link to="/about" className="footer-link">

                            About

                        </Link>

                        <Link to="/contact" className="footer-link">

                            Contact

                        </Link>

                    </div>

                    {/* Support */}

                    <div className="col-6 col-lg-3">

                        <div className="footer-heading">

                            Contact

                        </div>

                        <div className="footer-contact">

                            <IconMail size={18} />

                            support@milezero.com

                        </div>

                        <div className="footer-contact">

                            <IconPhone size={18} />

                            +91 98765 43210

                        </div>

                        <div className="footer-contact">

                            <IconMapPin size={18} />

                            Bengaluru, India

                        </div>

                    </div>

                    {/* Social */}

                    <div className="col-lg-3">

                        <div className="footer-heading">

                            Connect

                        </div>

                        <div className="footer-social">

                            <a href="#">

                                <IconBrandGithub size={22} />

                            </a>

                            <a href="#">

                                <IconBrandLinkedin size={22} />

                            </a>

                            <a href="#">

                                <IconBrandInstagram size={22} />

                            </a>

                        </div>

                    </div>

                </div>

                <hr className="footer-divider"/>

                <div className="footer-bottom">

                    <span>

                        © {year} MileZero. All rights reserved.

                    </span>

                    <div className="footer-bottom-links">

                        <Link to="#">

                            Privacy

                        </Link>

                        <Link to="#">

                            Terms

                        </Link>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;