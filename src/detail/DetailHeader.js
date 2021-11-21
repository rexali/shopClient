import React, { } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { appContext } from "../AppProvider";
import HomeDropdown from "../home/HomeDropdown";

function DetailHeader() {
    let history = useHistory();
    return (
        <ul className="nav nav-tabs justify-content-between">

            <li className="nav-item d-md-none">
                <Link className="nav-link text-black" to={"#back"} onClick={()=>history.goBack()}><span className="fa fa-arrow-left"></span></Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link text-black" to="#detail">Detail</Link>
            </li>

            <li className="nav-item">
                <appContext.Consumer>
                    {({ state, setCartData }) => <HomeDropdown cartData={state.cartData} setCartData={setCartData} />}
                </appContext.Consumer>
            </li>
        </ul>
    )
}
export default withRouter(DetailHeader);