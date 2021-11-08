import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminProduct from "./AdminProduct.js";
import AdminProfile from "./AdminProfile";
import AdminOrder from "./AdminOrder";
import AdminMessage from "./AdminMessage";
import AdminNotification from "./AdminNotification";

export default function AdminTabs(props) {

    let [tabName, setTabName] = useState('profile');

    let openTab = (tabname) => {
        setTabName(tabname);
    }
    const styles = {
        navTab: { fontSize: 'small' }
    }

    return (
        <div className="container" >
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link className="nav-link active" style={styles.navTab} data-toggle="tab" onClick={() => openTab('profile')} to="#profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTab} data-toggle="tab" onClick={() => openTab('product')} to="#product">Product</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTab} data-toggle="tab" onClick={() => openTab('message')} to="#message">Message</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTab} data-toggle="tab" onClick={() => openTab('order')} to="#order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTab} data-toggle="tab" onClick={() => openTab('notification')} to="#notification">Notification</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="profile">
                    {tabName === 'profile' ? <Profile /> : ''}
                    {tabName === 'product' ? <Product /> : ''}
                    {tabName === 'message' ? <Message /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'notification' ? <Notification /> : ''}
                </div>
            </div>
        </div>
    );
}

function Profile() {
    return <AdminProfile />;
}

function Message() {
    return <AdminMessage />;
}

function Product() {
    return <AdminProduct />;
}

function Order() {
    return <AdminOrder />;
}
function Notification() {
    return <AdminNotification />;
}