import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminAddForm from "./AdminAddForm";
import AdminProduct from "./AdminProduct.js";
import AdminProfile from "./AdminProfile";
import AdminOrder from "./AdminOrder";

export default function AdminTabs(props) {

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
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('view')} to="#view">View</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('order')} to="#order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('feedback')} to="#feedback">Feedback</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active" id="profile">
                    {tabName === 'profile' ? <Profile /> : ''}
                    {tabName === 'add' ? <Add /> : ''}
                    {tabName === 'view' ? <View /> : ''}
                    {tabName === 'order' ? <Order /> : ''}
                    {tabName === 'feedback' ? <Feedback /> : ''}
                </div>
            </div>
        </div>
    );
}

function Profile(props) {
    return <div className="container"><AdminProfile /></div>;
}

function Add(props) {
    return <div className="container"><AdminAddForm /></div> ;
}

function View(props) {
    return <div className="container"><AdminProduct /></div>;
}

function Order(props) {
    return <div className="container"><AdminOrder/></div>;
}
function Feedback(props) {
    return <h3>Requested Feedback</h3>;
}