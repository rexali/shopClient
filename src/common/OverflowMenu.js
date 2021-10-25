import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OverflowMenu({...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const shareAppLink = async () => {
        const dataToShare = {
            title: 'kanimart.com',
            text: 'Check out this web app you may like it.',
            url: window.location.origin
        }
        if (navigator.share) {
            try {
                await navigator.share(dataToShare);
            } catch (error) {
                console.warn(error);
            }
        }
    }

    return (
        <div className="d-lg-none">
            <button className='btn btn-sm text-reset' onClick={handleShow}><i className="fa fa-user" aria-hidden="true"></i></button>
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-group-flush">
                        <li className="list-group-item list-group-item-action"><Link to={'/auth/user'}><i className="fa fa-sign-in" aria-hidden="true"> Log in</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'/user'}><i className="fa fa-user" aria-hidden="true"> Account</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'/cart'}><i className="fa fa-shopping-cart" aria-hidden="true"> Cart</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'/favourite'}><i className="fa fa-heart" aria-hidden="true"> Wish</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'/setting'}> <i className="fa fa-gear" aria-hidden="true"> Settings</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'/about'}> <i className="fa fa-info-circle" aria-hidden="true"> About</i></Link></li>
                        <li className="list-group-item list-group-item-action"><Link to={'#share'} onClick={()=>shareAppLink}><i className="fa fa-share-alt" aria-hidden="true"> Share</i></Link></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}