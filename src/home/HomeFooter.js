import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomeFooter extends Component {

    render() {
        return (
            <div className="container-fluid">
                <hr/>
                <div className="row">

                    <div className="col-md-3">
                        <p>
                            <Link className="nav-link text-reset" to={"/about"}>About</Link>
                        </p>
                    </div>

                    <div className="col-md-3">
                        <p>
                            <Link className="nav-link text-reset" to={"/contact"}>Contact</Link>
                        </p>
                    </div>

                    <div className="col-md-3">
                        <a
                            className="nav-link text-decoration-none text-dark"
                            href="https://mujaware.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Blog</a>
                    </div>

                    <div className="col-md-3">
                        <p>
                            <Link className="nav-link text-reset" to={"/vendor"}>Become a seller</Link>
                        </p>

                    </div>

                </div>
                <div className="row">
                    <p className="text-center text-success">&copy;2021, Kanimart. All right reserved</p>
                </div>
            </div>
        )
    }
}
export default HomeFooter;
