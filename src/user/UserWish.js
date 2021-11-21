import axios from "axios";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";
import ShowToast from "../common/ShowToast";
import Spinner from "../common/Spinner";
import { getPicture } from "../service";

function UserWish() {
    const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "1", right: 0 }, };

    let [data, setData] = useState([]);
    let [favouriteState, setFavouriteState] = useState(false)
    let [displayToast, setDisplayToast] = useState(false)
    let [isLoading, setIsLoading] = useState(true)


    const { setCartData, state } = React.useContext(appContext);
    const userId = state.authData.user_id;

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

    const getProductIds = async (config) => {
        try {
            let { data } = await axios(config);
            let pids = data.map(product => product.product_id);
            return {pids};
        } catch (error) {
            console.log(error)
        }
    }

    const addCartProduct = async(pid, vid) => {
        if (userId) {
            let {pids} = await getProductIds({ url: '/cart/read', method: 'post', data: { user_id: userId } });
            if (pids.includes(pid)) {
                alert("Item already in cart")
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
                setDisplayToast(true);
                setTimeout(()=>{setDisplayToast(false)}, 3000)
            }).catch((error) => { console.log(error); });
        }
        } else {
            alert("Please log in")
        }
    }

    const getSavedProduct = (uid) => {
        import("axios").then((axios) => {
            axios.post('/wish/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setData([...result]);
                setCartData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const deleteFavouriteProduct = (pid) => {
        if (userId) {
            axios.post('/wish/delete', { user_id: userId, product_id: pid })
                .then(function (response) {
                    let loadData = JSON.stringify(response.data);
                    let result = JSON.parse(loadData);
                    console.log(result.result)
                    setFavouriteState(true)
                    getSavedProduct(userId);
                    setTimeout(()=>{setFavouriteState(false)}, 3000)
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Please log in")
        }
    }

    useEffect(() => {
        const fetchMeData = (uid) => {
            import("axios").then((axios) => {
                axios.post('/wish/read', { user_id: uid }).then(function (response) {
                    let loadData = JSON.stringify(response.data);
                    let result = JSON.parse(loadData);
                    console.log(result)
                    setData([...result]);
                    setIsLoading(false)
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }

        fetchMeData(userId);
    }, [userId]);

    if(isLoading){
       return <Spinner />
    }

    return (
        <div>
            <main style={styles.mainHeight} className="container">
                <div className="row">
                    {data.map((product, i) => {
                        return (<div className="col-md-4 card my-3 shadow-none" key={i} >
                            <div>
                                <a href="#share" className="btn btn-sm btn-outline-success m-2 position-absolute" style={styles.beAboveS} onClick={() => shareProduct(product.product.id)}><span className="fa fa-share"></span></a>
                                <img style={{ minWidth: "auto", height: "235px" }} className="img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0] ? getPicture(product.product_picture)[0] : 'logo512.png'}`} alt={product.product_name ? product.product_name : ''} />
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
                                    <button className="btn btn-dark btn-sm" ><span className="fa fa-shopping-cart-plus" onClick={() => addCartProduct(product.product_id, product.vendor_id)}>Add to cart</span></button>
                                </p>

                            </div>
                        </div>);
                    })}
                    {displayToast && <ShowToast title={'Cart'} body={'Item added'} />}
                    {favouriteState && <ShowToast title={'Favourite'} body={'Item deleted'} />}
                    {!data.length && <div className="card shadow-none text-center mt-5">No saved items found</div>}
                </div>
            </main>
        </div>
    );

}

export default UserWish;