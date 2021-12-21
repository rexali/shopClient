import React from "react";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
    return (
        <ul className="nav nav-tabs justify-content-between">

            <li className="nav-item d-md-none">
                <a className="nav-link text-black" href="#save" onClick={() => props.history.push('/')}><span className="fa fa-arrow-left"></span></a>
            </li>
            <li className="nav-item active">
                <Link to={`/${props.title?.toLowerCase()}`} className="nav-link text-black">{props.title}</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin" className="nav-link" style={{fontSize:"xx-small"}}><i className="fa fa-minus" aria-hidden="true" ></i></Link>
            </li>
        </ul>
    )
}
export default withRouter(Header);