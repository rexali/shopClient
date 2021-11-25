import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserCart from "./UserCart";
import UserNotification from "./UserNotification";
import UserOrder from "./UserOrder";
import UserProfile from "./UserProfile";
import UserWish from "./UserWish";

export default function UserTabs() {

    let [tabName, setTabName] = useState('profile');

    const openTab = (tabname) => {
        setTabName(tabname);
    }
    const styles = {
        navTabs: { fontSize: 'small' }
    }

    return (
        <div className="container" >
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('profile')} to="#profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('wish')} to="#wish">Wish</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('cart')} to="#cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('order')} to="#order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('notification')} to="#notifiction">Notice</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active" id="profile">
                    {tabName === 'profile' ? <Profile /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'wish' ? <Wish /> : ''}
                    {tabName === 'cart' ? <Cart /> : ''}
                    {tabName === 'notification' ? <Notification /> : ''}
                </div>
            </div>
        </div>
    );
}


function Profile(props) {
    return <div className="container"><UserProfile /></div>;
}

function Order(props) {
    return <div className="container"><UserOrder /></div> ;
}

function Wish(props) {
    return <div className="container"><UserWish /></div>;
}

function Cart(props) {
    return <div className="container"><UserCart /></div>;
}
function Notification(props) {
    return <div className="container"><UserNotification /></div>;
}