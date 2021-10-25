import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { appContext } from '../AppProvider';
import ShowToast from '../common/ShowToast';

export default function HomeProducts({ products }) {
    let [toastState, setToastState] = useState(false)
    let [favouriteState, setFavouriteState] = useState(false)

    const { setCartData} = React.useContext(appContext);

    const showToast = () => {
        setToastState(true);
    }

    const resetToast = () => {
        setToastState(false);
    }

    const showToastFav = () => {
        setFavouriteState(true);
    }

    const resetToastFav = () => {
        setFavouriteState(false);
    }

    return <>
        {products.map((product, i) => {
            return i < 6 ? <Product key={i} product={product} setCartData={setCartData} showToast={showToast} resetToast={resetToast} showToastFav={showToastFav} resetToastFav={resetToastFav} /> : '';
        })};
        {toastState && <ShowToast title={'Cart'} body={'Item added'} />}
        {favouriteState && <ShowToast title={'Favourite'} body={'Item added'} />}

    </>
};

export function Product({ product, setCartData, showToast, resetToast, showToastFav, resetToastFav }) {
    let [isLoggedin, setIsLoggedin] = useState(false);
    const {state } = React.useContext(appContext);
    const userId = state.authData?.user_id

    const getCartData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/cart/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setCartData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const styles = {
        aboveR: { zIndex: "1", right: 0 },
        aboveL: { zIndex: "1", left: 0 },
        catFont: { fontSize: '10px' },
        nameFont: { fontSize: '11px' },
        addTocart: { fontSize: '12px' },
        imageProps: { minWidth: "100px", maxHeight: "100px" },
        hideAddToCart: { display: 'none' }
    }


    const mouseover = (evt) => {
        let chdn = evt.target.parentNode.parentNode.nextSibling;
        chdn.firstChild.style.display = "block";
    }

    const mouseout = (evt) => {
        let chdn = evt.target.parentNode.parentNode.nextSibling;
        chdn.firstChild.style.display = "block";
    }

    const addToCart = async (pid, vid) => {
        try {
            document.getElementById("dropdown-autoclose-false2").click();
        } catch (error) { console.error(error); }
        if (userId) {
            console.log(userId);
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
                        showToast()
                        setTimeout(() => {
                            resetToast();
                        }, 3000);
                    }
                }).catch((error) => { console.log(error); });
            }
        } else {
            // alert("Please log in")
            setIsLoggedin(true)
        }
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



    const saveProduct = async (event, pid, vid) => {
        event.target.style.color = "green";
        if (userId) {
            console.log(userId);
            let resu = await getProductIds({ url: '/wish/read', method: 'post', data: { user_id: userId } });
            if (resu.includes(pid)) {
                alert("Item already saved")
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
                    showToastFav()
                    setTimeout(() => {
                        resetToastFav();
                    }, 3000);
                }).catch((error) => { console.log(error); });
            }
        } else {
            // alert("Please log in")
            setIsLoggedin(true)

        }
    }

    const shareProduct = async (id) => {
        const dataToShare = {
            title: 'kanimart.com',
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

    const getPictures = (pictures) => {
        let productPictures = [];
        productPictures = pictures?.split(';');
        return productPictures.filter((item) => { return item !== "" });
    }

    if (isLoggedin) {
        return <Redirect to="/auth/user" />
    }

    return (
        <div className="col-6 col-md-4" >
            <div className="card shadow-none my-1 mx-auto">
                <div>
                    <p className="d-flex justify-content-around">
                        <a href="#save"><i onClick={(evt) => saveProduct(evt, product.product_id, product.vendor_id)} className="bg-white fa fa-heart m-3 position-absolute" style={styles.aboveR} >{product.product_bestseller ? '' : ''}</i></a>
                        <a href="#share"><i onClick={(evt) => shareProduct(product.product_id)} className="bg-white fa fa-share d-md-none m-3 position-absolute" style={styles.aboveL} >{product.product_bestseller ? '' : ''}</i></a>
                    </p>
                    <Link to={
                        {
                            pathname: `/detail/${product.product_id}`,
                            state: product
                        }
                    }><img onMouseEnter={mouseover} onMouseLeave={mouseout} variant="top" style={styles.imageProps} className="img-fluid d-block mx-auto" src={`/uploads/${getPictures(product.product_picture).length === 1 ? product.product_picture : getPictures(product.product_picture)[0]}`} alt={product.product_name ? product.product_name : ''} /></Link>
                </div>
                
                <div className="card-body">
                    <button className="btn btn-dark btn-md-block btn-sm w-100" style={styles.hideAddToCart} onClick={() => addToCart(product.product_id, product.vendor_id)} ><i className="fa fa-cart-plus fa-2x" style={styles.addTocart}> Add to cart</i></button>
                    <span className="text-muted d-block" style={styles.catFont}>{product.product_category ? product.product_category : ''}</span>
                    <span className="d-block text-truncate" style={{ width: '100px' }}>
                        <strong>{product.product_name ? product.product_name : ''}</strong>
                    </span>
                    <span className="d-block">
                        {product.product_currency ? product.product_currency : 'N'}{product.product_price ? product.product_price : 'N'}
                    </span>
                </div>
            </div>
        </div>
    );
};