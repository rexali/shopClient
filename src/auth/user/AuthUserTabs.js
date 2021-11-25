import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthSignup from "./AuthUserSignup";
import AuthSignin from "./AuthUserSignin";


export default function AuthUserTabs() {

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
                    {tabName === 'signin' ? <AuthSignin openTab={openTab} /> : ''}
                    {tabName === 'signup' ? <AuthSignup  openTab={openTab} /> : ''}
                </div>
            </div>
        </div>
    );
}
