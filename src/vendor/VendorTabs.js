import React, { useState } from "react";
import { Link } from "react-router-dom";
import VendorAddForm from "./VendorAddForm";
import VendorAddPlusForm from "./VendorAddPlusForm";
import VendorFeedback from "./VendorFeedback";
import VendorOrder from "./VendorOrder";
import VendorProduct from "./VendorProduct";
import VendorProfile from "./VendorProfile";

export default function VendorTabs(props) {

    let [tabName, setTabName] = useState('profile');

    let openTab = (tabname) => {
        setTabName(tabname);
    }
    
    const styles = {
        navTabs: { fontSize: 'small' }
    }

    return (
        <div className="container-fluid" >
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link className="nav-link active" data-toggle="tab" onClick={() => openTab('profile')} to="#profile" style={styles.navTabs}>Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('add')} to="#add" style={styles.navTabs}>Add</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('addplus')} to="#addplus" style={styles.navTabs}>Add+</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('view')} to="#view" style={styles.navTabs}>View</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('order')} to="#order" style={styles.navTabs}>Order</Link>
                </li>
            
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('feedback')} to="#feedback" style={styles.navTabs}>Feedback</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane active" id="profile">
                    {tabName === 'profile' ? <Profile routeProps={props.routeProps} /> : ''}
                    {tabName === 'add' ? <Add /> : ''}
                    {tabName === 'addplus' ? <AddPlus /> : ''}
                    {tabName === 'view' ? <View /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'feedback' ? <Feedback /> : ''}
                </div>
            </div>
        </div>
    );
}


function Profile(props) {
    return <div className="container-fluid"><VendorProfile /></div>;
}

function Add() {
    return <div className="container-fluid"><VendorAddForm /></div>;
}

function View() {
    return <div className="container-fluid"><VendorProduct /></div>;
}
function Feedback() {
    return <div className="container-fluid"><VendorFeedback /></div>;
}

function Order() {
    return <div className="container-fluid"><VendorOrder /></div>;
}

function AddPlus() {
    return <div className="container-fluid"><VendorAddPlusForm /> </div>;
}