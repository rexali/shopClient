import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../AppProvider";
import ShowToast from "../common/ShowToast";
import { getPicture } from "../service";

function UserCart() {
    const styles = { mainHeight: { height: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };

    let [data, setData] = useState([]);
    let [displayToast, setDisplayToast] = useState(false)

    const { state } = React.useContext(appContext);
    const userId = state.authData?.user_id;

    const shareProduct = async (id) => {
        const dataToShare = {
            title: 'kanimall.com',
            text: 'Check out this product you may like it.',
            url: window.location.origin + '/detail/' + id
        }
        if (navigator.share) {
            try {
                await navigator.share(dataToShare);
            } catch (error) {
                console.warn(error);
            }
        }
    }

    const getCartData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/cart/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const removeCartItem = (pid) => {
        if (userId) {
            axios.post('/cart/delete', { user_id: userId, product_id: pid })
                .then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result.result)
                    setDisplayToast(true)
                    getCartData(userId)
                    setTimeout(()=>{setDisplayToast(false)}, 3000)
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Please log in")
        }
    }

    const fetchMeData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/cart/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    useEffect(() => {

        fetchMeData(userId);
    }, [userId]);

    return (
        <div>
            <main style={styles.mainHeight} className="container">
                <div className="row">
                {data.map((product, i) => {
                    return (<div className="col-md-4 card my-3 shadow-none" key={i} >
                        <div>
                            <a href="#share" className="btn btn-sm btn-outline-success m-2 position-absolute" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                            <img style={{ minWidth: "auto", height: "235px" }} className="img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0]?getPicture(product.product_picture)[0] : getPicture(product.product_picture)[1]}`} alt={product.product_name ? product.product_name : ''} />
                        </div>
                        <div className="card-body">
                            <p>{product.product_category ? product.product_category : ' '}</p>
                            <p>
                                <strong>{product.product_name ? product.product_name : ' '}</strong>
                            </p>
                            <p>
                                {product.product_currency ? product.product_currency : 'N '}{product.product_price ? product.product_price : ''}
                            </p>
                            <p className="d-flex justify-content-between">
                                <button className="btn btn-dark btn-sm" ><span className="fa fa-thrash" onClick={() => removeCartItem(product.product_id)}>Delete</span></button>
                                <Link className="btn btn-dark btn-sm" to="/cart" ><span className="fa fa-shopping-cart" > Checkout</span></Link>
                            </p>
                        </div>
                    </div>);
                })}
                {displayToast && <ShowToast title={'Cart'} body={'Item deleted'} />}
                {!data.length && <div className="card shadow-none text-center mt-5">No cart items found</div>}
                </div>
            </main>
        </div>
    );

}

export default UserCart;