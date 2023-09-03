import { Link } from "react-router-dom";
import "./navbar.css";

import { useState, useEffect } from "react";


function Navbar() {
    
    useEffect(() => {
        async function fetchData() {
        }

        fetchData();
    }, []);


    return (
        <div className="navbar">
            <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.5rem', margin: '2rem' }}>
                Home
            </Link>
        </div>
    );
}

export default Navbar;