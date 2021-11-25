import React from "react";
import { Link } from "react-router-dom";

function VendorHeader() {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/vendor" className="navbar-brand nav-link text-black" >Vendor</Link>
                    </li>
                    <li className="nav-item">
                        {/* <Link className="nav-link pull-right" to="/"></Link> */}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default VendorHeader;