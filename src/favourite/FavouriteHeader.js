import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { appContext } from "../AppProvider";
import HomeDropdown from "../home/HomeDropdown";

function FavouriteHeader() {
    let history = useHistory();
    return (
        <ul className="nav nav-tabs justify-content-between">
            <li className="nav-item d-md-none">
                <a className="nav-link text-black" href="#back" onClick={() => history.goBack()}><span className="fa fa-arrow-left"></span></a>
            </li>

            <li className="nav-item">
                <Link className="nav-link text-black" to="/">Favourite</Link>
            </li>

            <li className="nav-item">
                <appContext.Consumer>
                    {({ state, setCartData }) => <HomeDropdown cartData={state.cartData} setCartData={setCartData} />}
                </appContext.Consumer>
            </li>
        </ul>
    )
}
export default withRouter(FavouriteHeader);