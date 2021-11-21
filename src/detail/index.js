import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";
import { appContext } from "../AppProvider";
import DetailFooter from "./DetailFooter";
import DetailHeader from "./DetailHeader";
import Spinner from "../common/Spinner";
import ShowToast from "../common/ShowToast";
import { getPicture } from "../service";


function Detail() {

    const { id } = useParams(); // get product id

    const location = useLocation();

    const product = location.state;

    let [data, setData] = useState([]);

    let [show, setShow] = useState(true);

    let [isLoading, setIsLoading] = useState(true);

    let [showCart, setShowCart] = useState(false);

    let [showToast, setShowToast] = useState(false);

    let [presentCart, setPresentCart] = useState(null);
    let [presentFavourite, setPresentFavourite] = useState(null);

    const { setCartData, state } = React.useContext(appContext);

    let userId = state.authData?.user_id;

    const styles = {
        beAbove: { zIndex: "2" },
        beAboveS: { zIndex: "2", right: 0 },
        imageProps: { minWidth: "auto", height: "235px" },
        hideAddToCart: { display: 'none' },
        mainHeight: { minHeight: "550px", backgroundColor: 'white' }
    }

    const getCartData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/cart/read', { user_id: uid }).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                console.log(result)
                setCartData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const getProductIds = async (config) => {
        try {
            let { data } = await axios(config);
            let pids = data.map(product => product.product_id);
            return { pids };
        } catch (err) {
            console.log(err);
        }
    }

    const addToCart = async (pid, vid) => {
        if (userId) {
            let { pids } = await getProductIds({ url: '/cart/read', method: 'post', data: { user_id: userId } });
            if (pids.includes(pid)) {
                setPresentCart(true);
            } else {
                axios.post(
                    "/cart/add",
                    {
                        product_id: pid,
                        user_id: userId,
                        vendor_id: vid
                    }
                ).then((res) => {
                    console.log(res.data);
                    getCartData(state.authData.user_id);
                    setShowCart(true)
                }).catch((error) => { console.log(error); });
            }
        } else {
            setShow(false);
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
    /**
     * Save user favourite product
     * @param {Event} evt is an event parameter
     * @param {Number} pid is a product id
     * @param {Number} vid is a vendor id
     */
    const saveProduct = async (evt, pid, vid) => {
        if (userId) {
            let { pids } = await getProductIds({ url: '/wish/read', method: 'post', data: { user_id: userId } });
            if (pids.includes(pid)) {
                // alert("Item already saved");
                setPresentFavourite(true)
            } else {
                axios.post(
                    "/wish/add",
                    {
                        product_id: pid,
                        user_id: userId,
                        vendor_id: vid
                    }
                ).then((res) => {
                    console.log(res.data)
                    evt.target.style.color = "green";
                    setShowToast(true)
                }).catch((error) => { console.log(error); });
            }
        } else {
            setShow(false);
        }
    }

    /**
     * Read or fetch detail of the product
     * @param {Number} pid is a product id
     */
    const fetchProductDetail = async (pid, product) => {
        if (product) {
            setData([product]);
            setIsLoading(false);
        } else {
            try {
                let { data } = await axios.get('/products/product/read/' + pid);
                setData([...data]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchProductDetail(Number(id), product);
    }, [id,product]);

    if (showCart) {
        return <Redirect to="/cart" />
    }

    if (!show) {
        return <Redirect to="/auth/user/login" />
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <DetailHeader />
            <main style={styles.mainHeight} className="container">
                {data.map((product, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="col-md-6">
                                <h6>Product photos</h6>
                                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

                                    <div className="carousel-indicators">

                                        {getPicture(product.product_picture).map((_, index) => {
                                            return index === 0 ?
                                                <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className="text-danger active" aria-current="true" aria-label="Slide 0"></button>
                                                :
                                                <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className="btn" aria-label={`Slide ${index}`}></button>
                                        })
                                        }
                                    </div>

                                    <div className="carousel-inner">
                                        {getPicture(product.product_picture)?.map((picturefile, index) => {
                                            return index === 0 ? (
                                                <div key={index} className="carousel-item active">
                                                    <a href="#save"><i onClick={(evt) => saveProduct(evt, product.product_id, product.vendor_id)} className="bg-white position-absolute fa fa-heart m-2" style={styles.beAbove} >{product.product_bestseller ? 'Best Seller' : ''}</i></a>
                                                    <a href="#share" className="m-2 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                                                    <img className="img-fluid d-block mx-auto" style={{ height: "auto", width: "200px" }} src={`/uploads/${picturefile}`} alt={picturefile ? picturefile : ''} />
                                                </div>
                                            ) : (
                                                <div key={index} className="carousel-item">
                                                    <a href="#save"><i onClick={(evt) => saveProduct(evt, product.product_id, product.vendor_id)} className="bg-white position-absolute fa fa-heart m-2" style={styles.beAbove} >{product.product_bestseller ? 'Best Seller' : ''}</i></a>
                                                    <a href="#share" className="m-2 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                                                    <img className="img-fluid d-block mx-auto" style={{ height: "100px", width: "100px" }} src={`/uploads/${picturefile}`} alt={picturefile ? picturefile : ''} />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <button className="carousel-control-prev text-danger" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon text-danger" aria-hidden="true"></span>
                                        <span className="visually-hidden text-danger">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>

                                </div>
                            </div>

                            <div className="col-md-6">
                                <h6>Product summary</h6>
                                <div className="">
                                    <p><strong>{product.product_name ? product.product_name : ' '}</strong></p>
                                    <p className="text-muted"> The item code: {product.product_code} </p>
                                    <p className="text-muted">Category: {product.product_category ? product.product_category : ' '}</p>
                                    <p><strong>{product.product_name ? product.product_name : ' '}</strong></p>
                                    <p><strong>Price: {product.product_currency ? product.product_currency : 'N '}{product.product_price ? product.product_price : ''}</strong></p>
                                    <p>{product?.product_feature ?? product.product_description}</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h6>Product description</h6>
                                <div>
                                    <p>{product.product_description}</p>
                                    <p> There are {product.product_quantity ? product.product_quantity : 'no available item --'} {product.product_quantity ? 'available item' : 'out of stock'} </p>
                                    <p> The item weighs {product.product_weight} kg </p>
                                    <p> The item dimensions is {product.product_size} </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h6>Get it now</h6>
                                <p className="d-flex justify-content-center align-item-center" style={{ height: '160px' }}>
                                    <a href="#addToCart" className="btn btn-secondary btn-block align-self-center" onClick={() => addToCart(product.product_id, product.vendor_id)}><i className="fa fa-cart-plus"> Buy</i></a>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </main>
            {showToast && <ShowToast title={'Favourite'} body={'Item added'} />}
            {presentFavourite && <ShowToast title={'Favourite'} body={'Item already added'} />}
            {presentCart && <ShowToast title={'Cart'} body={'Item already added'} />}


            <DetailFooter />
        </div>
    );

}

export default Detail;