import React from "react";
import { Link, withRouter } from "react-router-dom";

class CartHeader extends React.Component {
    render() {
        return (
            <ul className="nav nav-tabs justify-content-between">

                <li className="nav-item d-md-none">
                    <a className="nav-link text-black" href="#back" onClick={() => this.props.history.goBack()}><span className="fa fa-arrow-left"></span></a>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-black" to="#cart">Cart</Link>
                </li>
            </ul>
        )
    }
}
export default withRouter(CartHeader);