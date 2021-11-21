import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Offcanvas } from "react-bootstrap";
import { appContext } from "../AppProvider";
import { getPicture } from "../service";
import { Link } from "react-router-dom";

export default function CartResult({ setCartData, cartData, ...props }) {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => { setShow(true); }

    let [cartCount, setCartCount] = useState([]);
    const { state } = React.useContext(appContext);
    const userId = state.authData?.user_id;
    const styles = {
        imageSize: { width: '100px', height: '70px' }
    }

    const clearCart = () => {
        axios.post('/cart/delete/all', { user_id: userId })
            .then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                console.log(result.result)
                if (result.affectedRows >= 1 && result.warningCount === 0) {
                    setCartData([])
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    const removeCartItem = (pid) => {
        axios.post('/cart/delete', { user_id: userId, product_id: pid })
            .then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                if (result.affectedRows === 1 && result.warningCount === 0) {
                    let newCartData = cartData.filter((product, _) => {
                        return product.product_id !== pid;
                    })
                    setCartData(newCartData)
                    setCartCount(newCartData.length);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (userId) {
            setCartCount(cartData?.length);
        }
    }, [userId, cartData?.length]);

    return (
        <div>
            <button className='btn btn-sm text-reset' onClick={handleShow}><i className="fa fa-shopping-cart" aria-hidden="true"></i><sup><Badge pill bg="light" id="cartCount" className="text-reset">{cartCount}</Badge></sup></button>
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span>Cart</span>
                    </Offcanvas.Title>
                    <span className="align-item-center"><i className="fa fa-shopping-cart"></i><sup><Badge pill bg="light" id="cartCount" className="text-reset">{cartCount}</Badge></sup></span>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row">
                        {cartData.map((item, i) => {
                            return (
                                <div key={i} className="d-flex justify-content-between m-2">
                                    <span className="align-self-center">{item.product_name}<span><br />{item.product_price}</span></span>
                                    <img className="img-fluid" style={styles.imageSize} src={`/uploads/${getPicture(item.product_picture)[0] ? getPicture(item.product_picture)[0] : ''}`} alt={item.product_name ? item.product_name : ''} />
                                    <button className="btn" onClick={() => removeCartItem(item.product_id)}> <i className="fa fa-trash" aria-hidden="true"></i> </button>
                                </div>
                            );
                        })}
                    </div>
                    {cartData?.length !== 0 ?
                        <div className="d-flex justify-content-between mt-3"><button className="btn btn-outline-dark btn-sm mr-2" onClick={clearCart}>CLEAR</button><Link className="btn btn-outline-success btn-sm" to="/cart">CHECKOUT</Link></div> : <div><p className="text-center text-success">Empty cart</p></div>}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}