import "./landing-page.css";
import Navbar from "../../layouts/navbar/Navbar";

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginServices from "../login/login.services";

function LandingPage() {

    const isLoggedIn = localStorage.getItem("token") ? true : false;
    
    useEffect(() => {
        async function fetchData() {
        }

        fetchData();
    }, []);

    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
        <div className="landing-page">
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="body-container">
                <div className="header-container">
                    <h1>Landing Page</h1>
                </div>
                <div className="content-container">
                    <Link to="/course-map-wizard">
                        Course Map Wizard
                    </Link>
                    <hr />
                    {/* Button to logout */}
                    <button
                        onClick={() => {
                            loginServices.logout();
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;