import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";
import { appContext } from "../AppProvider";
import HomeFooter from "../home/HomeFooter";
import DetailHeader from "./DetailHeader";
import Spinner from "../common/Spinner";
import ShowToast from "../common/ShowToast";
import { getCsrfToken, getJwt, getPicture } from "../service";


function Detail() {

    const isMounted = useRef(true);

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

    const { setCartData, state} = React.useContext(appContext);

    let userId = state.authData?.user_id;

    const styles = {
        beAbove: { zIndex: "2" },
        beAboveS: { zIndex: "2", right: 0 },
        imageProps: { minWidth: "auto", height: "235px" },
        hideAddToCart: { display: 'none' },
        mainHeight: { minHeight: "500px", backgroundColor: 'white' }
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
                if (getJwt() && await getCsrfToken() ) {
                    let { data } = await axios.get('/products/product/read/' + pid);
                    setData([...data]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            fetchProductDetail(Number(id), product);
        }
        return () => {
            isMounted.current = false
        };
    });
    

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
                                <h6>Product photo(s)</h6>
                                <div id="demo" className="carousel slide" data-ride="carousel">
                                    {/* <!-- Indicators --> */}
                                    {/* <ul className="carousel-indicators">
                                        {(() => getPicture(product.product_picture).map((_, i) => {
                                                return i === 0 ?
                                                    (
                                                        <li key={i} data-target="#demo" data-slide-to={i} className="active bg-success"></li>
                                                    )
                                                    : (
                                                        <li key={i} data-target="#demo" data-slide-to={i} className="bg-success"></li>
                                                    )
                                            })
                                        )()
                                        }
                                    </ul> */}

                                    {/* <!-- The slideshow --> */}
                                    <div className="carousel-inner">
                                        {
                                            getPicture(product.product_picture).map((picture, i) => {
                                                return i === 0 ? (
                                                    <div key={i} className="carousel-item active">
                                                        <a href="#save"><i onClick={(evt) => saveProduct(evt, product.product_id, product.vendor_id)} className="bg-white position-absolute fa fa-heart m-2" style={styles.beAbove} >{product.product_bestseller ? 'Best Seller' : ''}</i></a>
                                                        <a href="#share" className="m-2 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product_id)}><span className="fa fa-share-alt"></span></a>
                                                        <img className="img-fluid d-block mx-auto" style={{ height: "auto", width: "200px" }} src={`/uploads/${picture}`} alt={picture ? picture : ''} />
                                                    </div>
                                                ) :
                                                    (
                                                        <div key={i} className="carousel-item">
                                                            <a href="#save"><i onClick={(evt) => saveProduct(evt, product.product_id, product.vendor_id)} className="bg-white position-absolute fa fa-heart m-2" style={styles.beAbove} >{product.product_bestseller ? 'Best Seller' : ''}</i></a>
                                                            <a href="#share" className="m-2 position-absolute d-md-none" style={styles.beAboveS} onClick={() => shareProduct(product.product_id)}><span className="fa fa-share-alt"></span></a>
                                                            <img className="img-fluid d-block mx-auto" style={{ height: "auto", width: "200px" }} src={`/uploads/${picture}`} alt={picture ? picture : ''} />
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>

                                    {/* <!-- Left and right controls --> */}

                                    <a className="carousel-control-prev h-250" href="#demo" data-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </a>

                                    <a className="carousel-control-next bg-secondary rounded-circle mt-5" href="#demo" style={{ height: 50, }} data-slide="next">
                                        <span className="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                                <p><strong>{product.product_name ? product.product_name : ' '}</strong></p>
                            </div>

                            <div className="col-md-6">
                                <h6 className="font-weight-bold">Product summary</h6>
                                <div className="">
                                    <p className="text-muted"> The item code: {product.product_code} </p>
                                    <p className="text-muted">Category: {product.product_category ? product.product_category : ' '}</p>
                                    <p><strong>Price: {product.product_currency ? product.product_currency : 'N '}{product.product_price ? product.product_price : ''}</strong></p>
                                    <p>{product?.product_feature ?? product.product_description}</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h6 className="font-weight-bold">Product description</h6>
                                <div>
                                    <p>{product.product_description}</p>
                                    <p> There are {product.product_quantity ? product.product_quantity : 'no available item --'} {product.product_quantity ? 'available item' : 'out of stock'} </p>
                                    <p> The item weighs {product.product_weight} kg </p>
                                    <p> The item dimensions are {product.product_size} </p>
                                </div>
                            </div>

                            {product.product_video && (
                                <div className="col-md-6">
                                    <h6 className="font-weight-bold" id="demo">Product demo</h6>
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" title="product demonstration" src={product.product_video.endsWith('mp4') ? 'uploads/' + product.product_video : product.product_video} allowFullScreen></iframe>
                                    </div>
                                </div>)
                            }

                            {product.product_model && (
                                <div className="col-md-6">
                                    <p className="font-weight-bold">Product model</p>
                                    <p>{product.product_model ? product.product_model : 'Nothing yet'}</p>
                                </div>)
                            }

                            {product.product_shipping && (

                                <div className="col-md-6">
                                    <p className="font-weight-bold">Product shipping</p>
                                    <p>N {product.product_shipping ? product.product_shipping : 'Nothing yet'}</p>
                                </div>)
                            }

                            {product.product_warranty && (
                                <div className="col-md-6">
                                    <p className="font-weight-bold">Product warranty</p>
                                    <p>{product.product_warranty ? product.product_warranty : 'Nothing yet'}</p>
                                </div>)
                            }

                            {product.product_return && (
                                <div className="col-md-6">
                                    <p className="font-weight-bold">Product return policy</p>
                                    <p>{product.product_return ? product.product_return : 'Nothing yet'}</p>
                                </div>)
                            }

                            {product.product_seller && (
                                <div className="col-md-6">
                                    <p className="font-weight-bold">Product seller</p>
                                    <p>{product.product_seller ? product.product_seller : 'Nothing yet'}</p>
                                </div>)
                            }

                            <div className="col-md-6 d-none d-md-block">
                                <h6 className="font-weight-bold">Get it now</h6>
                                <p className="d-flex justify-content-center align-items-center" >
                                    <a href="#addToCart" className="btn btn-outline-primary btn-block rounded-pill m-5" onClick={() => addToCart(product.product_id, product.vendor_id)}><i className="fa fa-cart-plus"> Buy</i></a>
                                </p>
                            </div>

                            <div className="buy">
                                <a href="#addToCart" className="btn btn-primary btn-block rounded-pill fixed-bottom d-md-none" onClick={() => addToCart(product.product_id, product.vendor_id)}><span className="fa fa-cart-plus">  BUY</span></a>
                            </div>
                        </div>
                    );
                })}
            </main>
            {showToast && <ShowToast title={'Favourite'} body={'Item added'} />}
            {presentFavourite && <ShowToast title={'Favourite'} body={'Item already added'} />}
            {presentCart && <ShowToast title={'Cart'} body={'Item already added'} />}


            <HomeFooter />
        </div>
    );

}

export default Detail;