import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { appContext } from "../AppProvider";
import ShowToast from "../common/ShowToast";
import Spinner from "../common/Spinner";
import FavouriteFooter from "./FavouriteFooter";
import FavouriteHeader from "./FavouriteHeader";

function Favourite() {
    const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };

    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState([]);
    let [isLoggedin, setIsLoggedin] = useState(false);
    let [toastState, setToastState] = useState(false)

    const { setCartData, state } = React.useContext(appContext);
    const userId = state.authData.user_id;

    const showToast = ()=>{
    setToastState(true);
    }

    const getProductIds = async (config) => {
        try {
            let { data } = await axios(config);
            let pids = data.map(product => product.product_id);
            return pids;
        } catch (error) {
            console.log(error)
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
                console.warn(error);
            }
        }
    }

    const getCartData = async (uid) => {

        if (uid) {
            try {
                let { data } = await axios.post('/cart/read', { user_id: uid });
                setCartData(data);
                // setData(data)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoggedin(true)
        }
    }


    const addToCart = async(pid, vid) => {
        try {
            document.getElementById("dropdown-autoclose-false2").click();
        } catch (error) { console.error(error); }
        if (userId) {
            let resu = await getProductIds({ url: '/cart/read', method: 'post', data: { user_id: userId } });
            if (resu.includes(pid)) {
                alert("Item already in cart")
            } else {
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
            }
        } else {
            // login please
            setIsLoggedin(true);
        }
    }


    const deleteFavouriteProduct = (pid) => {
        if (userId) {
            axios.post('/wish/delete', { user_id: userId, product_id: pid })
                .then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result.result)
                    if(result.result){
                        readFavouriteProducts(userId);
                        showToast();
                        setTimeout(() => {
                            setToastState(false);  
                        }, 3000);
                        
                    }

                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            // Please log in
            setIsLoggedin(true);

        }

    }

    const readFavouriteProducts = (uid) => {
        import("axios").then((axios) => {
            axios.post('/wish/read', { user_id: uid }).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                console.log(result)
                setData([...result]);
                setIsLoading(false)
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    useEffect(() => {
        readFavouriteProducts(userId);
        setToastState(false)
    }, [userId]);

    if (isLoggedin) {
        return <Redirect to="/auth/user" />
    }

    if (isLoading) return <Spinner />

    return (
        <div>
            <FavouriteHeader />
            <main style={styles.mainHeight} className="container">
                <div className='row'>
                {data.length ? data.map((product, i) => {
                    return (<div className="col-md-4 card my-3 shadow-none" key={i} >
                        <div>
                            <a href="#share" className="btn btn-sm btn-outline-success m-2 position-absolute" style={styles.beAboveS} onClick={() => shareProduct(product.id)}><span className="fa fa-share"></span></a>
                            <img style={{ minWidth: "auto", height: "235px" }} className="img-fluid d-block mx-auto" src={`/uploads/${product.product_picture ? product.product_picture : 'logo512.png'}`} alt={product.product_name ? product.product_name : ''} />
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
                                <button className="btn btn-dark btn-sm" ><span className="fa fa-thrash" onClick={() => deleteFavouriteProduct(product.product_id)}>Delete</span></button>
                                <button className="btn btn-dark btn-sm" ><span className="fa fa-shopping-cart-plus" onClick={() => addToCart(product.product_id, product.vendor_id)}>Add to cart</span></button>
                            </p>

                        </div>
                    </div>);})
                    :
                    (<div className="text-center m-5">No saved item(s)</div>)
                }
                </div>
            </main>
            {toastState && <ShowToast title={'Favourite'} body={'Item deleted'} />}
            <FavouriteFooter />
        </div>
    );

}

export default Favourite;