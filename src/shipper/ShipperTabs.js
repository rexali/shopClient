import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShipperAddForm from "./ShipperAddForm";
import ShipperProduct from "./ShipperProduct.js";
import ShipperProfile from "./ShipperProfile";
import ShipperOrder from "./ShipperOrder";
import ShipperFeedback from "./ShipperFeedback";
import ShipperNotification from "./ShipperNotification";


export default function ShipperTabs(props) {

    let [tabName, setTabName] = useState('profile');

    let openTab = (tabname) => {
        setTabName(tabname);
    }

    const styles = {
        navTabs: { fontSize: 'small' }
    }

    return (
        <div className="container" >
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link className="nav-link active" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('profile')} to="#profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('add')} to="#add">Add</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('view')} to="#view">View</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('order')} to="#order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={styles.navTabs} data-toggle="tab" onClick={() => openTab('feedback')} to="#feedback">Feedback</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('notification')} to="#notification" style={styles.navTabs}>Notification</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="profile">
                    {tabName === 'profile' ? <Profile /> : ''}
                    {tabName === 'add' ? <Add /> : ''}
                    {tabName === 'view' ? <View /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'feedback' ? <Feedback /> : ''}
                    {tabName === 'notification' ? <Notification /> : ''}
                </div>
            </div>
        </div>
    );
}


function Profile(props) {
    return <div className="container"><ShipperProfile /></div>;
}

function Add(props) {
    return <div className="container"><ShipperAddForm /></div> ;
}

function View(props) {
    return <div className="container"><ShipperProduct /></div>;
}

function Order(props) {
    return <div className="container"><ShipperOrder/></div>;
}
function Feedback(props) {
    return <div className="container-fluid"><ShipperFeedback /></div>;
}

function Notification() {
    return <div className="container-fluid"><ShipperNotification /></div>;
}