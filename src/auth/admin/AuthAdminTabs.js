import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthAdminSignup from "./AuthAdminSignup";
import AuthAdminSignin from "./AuthAdminSignin";


export default function AuthAdminTabs() {

    let [tabName, setTabName] = useState('signin');

    const openTab = (tabname) => {
        setTabName(tabname);
    }

    return (
        <div className="container" >
            <ul className="nav nav-pills nav-justified">
                <li className="nav-item">
                    <Link className="nav-link active" data-toggle="tab" onClick={() => openTab('signin')} to="#signin">Sign in</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-toggle="tab" onClick={() => openTab('signup')} to="#signup">Sign up</Link>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane container active">
                    {tabName === 'signin' ? <AuthAdminSignin openTab={openTab} /> : ''}
                    {tabName === 'signup' ? <AuthAdminSignup  openTab={openTab} /> : ''}
                </div>
            </div>
        </div>
    );
}
