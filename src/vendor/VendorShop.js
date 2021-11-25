import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { appContext } from "../AppProvider";
import ErrorBoundary from "../common/ErrorBoundary";
import HomeDropdown from "../home/HomeDropdown";
import { getPicture } from "../service";



function Header() {
    
    return (
        <ul className="nav nav-tabs justify-content-between">

            <li className="nav-item">
                <Link className="nav-link text-black" to="/">Shop</Link>
            </li>
            <li className="nav-item">
                <appContext.Consumer>
                    {({ state, setCartData }) => <HomeDropdown setCartData={setCartData} cartData={state.cartData} />}
                </appContext.Consumer>
            </li>
        </ul>
    )
}

function Footer(props) {
    return (
        <div>
            <p className="text-center text-success">&copy;2021, Kanimart. All right reserved</p>
        </div>
    )
}



function VendorProduct() {

    let [data, setData] = useState([]);

    const { vendorId } = useParams();

    const { setCartData, state} = React.useContext(appContext);
    const userId = state.authData.user_id;


    const getCartData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/cart/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setCartData(result)
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const addToCart = (pid, vid) => {
        document.getElementById("dropdown-autoclose-false2").click();
        if (userId) {
            console.log(userId);
            axios.post(
                "/cart/add",
                {
                    product_id: pid,
                    user_id: userId,
                    vendor_id: vid
                }
            ).then((response) => {
                let result = JSON.parse(JSON.stringify(response.data));
                if (result.affectedRows === 1 && result.warningCount === 0) {
                    getCartData(userId);
                }
            }).catch((error) => { console.log(error); });
        } else {
            alert("Please log in")
        }
    }

    const saveProduct = (event, pid, vid) => {
        event.target.style.color = "green";
        if (userId) {
            console.log(userId);
            axios.post(
                "/wish/add",
                {
                    product_id: pid,
                    user_id: userId,
                    vendor_id: vid
                }
            ).then((res) => { console.log(res.data) }).catch((error) => { console.log(error); });
        } else {
            alert("Please log in")
        }
    }


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
                console.log(error);
            }
        }
    }

    const fetchMeData = async (id) => {
        if (id) {
            try {
                let response = await axios.post('/products/product/read', { vendor_id: id });
                let result = JSON.parse(JSON.stringify(await response.data));
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        fetchMeData(Number(vendorId));
    }, [vendorId]);

    return (
        <ErrorBoundary>
            <div>
                <Header />
                <main className="container">
                <div className="row">
                    {data.map((product, i) => {
                        return (
                            <div className="col-md-4 card my-3 shadow-none" key={i} >
                                <p className="d-flex justify-content-end">
                                    <button className="btn btn-outline-info" onClick={() => shareProduct(product.product_id)}><span className="fa fa-share"></span></button>
                                </p>
                                <div>
                                    <i className="bg-white position-absolute" style={{ zIndex: "2" }} >{product.bestseller ? 'Best Seller' : ''} </i>
                                    <Link
                                        className="btn btn-outline-success"
                                        to={{
                                            pathname: `/detail/${product.product_id}`,
                                            state: product

                                        }}
                                    ><img style={{ minWidth: "auto", height: "235px" }} className="cardImg-top img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0] ? getPicture(product.product_picture)[0] : getPicture(product.product_picture)[1]}`} alt={product.product_name ? product.product_name : 'picture'} /></Link>
                                </div>
                                <div className="card-body">
                                    <p>{product.product_category ? product.product_category : ''}</p>
                                    <p><strong>{product.product_name ? product.product_name : ''}</strong></p>
                                    <p>{product.product_currency ? product.product_currency : 'N'}{product.product_price ? product.product_price : ''}</p>
                                    <p className="d-flex justify-content-between">
                                        <button className="btn btn-outline-success" onClick={(evt) => saveProduct(evt,product.product_id,product.vendor_id)}><span className="fa fa-heart"></span></button>
                                        <button className="btn btn-outline-success" onClick={() => addToCart(product.product_id,product.vendor_id)}><span className="fa fa-shopping-cart"></span></button>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    );
}


export default VendorProduct;
