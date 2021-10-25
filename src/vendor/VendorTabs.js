import React, { useState } from "react";
import { Link } from "react-router-dom";
import VendorAddForm from "./VendorAddForm";
import VendorAddPlusForm from "./VendorAddPlusForm";
import VendorFeedback from "./VendorFeedback";
import VendorOrder from "./VendorOrder";
import VendorProduct from "./VendorProduct";
import VendorProfile from "./VendorProfile";
import VendorShip from "./VendorShip";

export default function VendorTabs(props) {

    let [tabName, setTabName] = useState('profile');

    let openTab = (tabname) => {
        setTabName(tabname);
    }

    return (
        <div className="container" >
            <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <Link className="nav-link active" data-toggle="tab" onClick={() => openTab('profile')} to="#profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('add')} to="#add">Add</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('addplus')} to="#addplus">Add plus</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('view')} to="#view">View</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('order')} to="#order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('ship')} to="#ship">Ship</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('feedback')} to="#feedback">Feedback</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active" id="profile">
                    {tabName === 'profile' ? <Profile routeProps={props.routeProps} /> : ''}
                    {tabName === 'add' ? <Add /> : ''}
                    {tabName === 'addplus' ? <AddPlus /> : ''}
                    {tabName === 'view' ? <View /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'feedback' ? <Feedback /> : ''}
                    {tabName === 'ship' ? <Ship /> : ''}
                </div>
            </div>
        </div>
    );
}


function Profile(props) {
    return <div className="container"><VendorProfile routeProps={props.routeProps} /></div>;
}

function Add() {
    return <div className="container"><VendorAddForm /></div> ;
}

function View() {
    return <div className="container"><VendorProduct /></div>;
}
function Feedback() {
    return <div className="container"><VendorFeedback /></div>;
}

function Order() {
    return <div className="container"><VendorOrder/></div>;
}

function Ship() {
    return <div className="container"><VendorShip/> </div>;
}

function AddPlus() {
    return <div className="container"><VendorAddPlusForm/> </div>;
}