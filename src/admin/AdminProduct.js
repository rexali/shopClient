import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary";
import Spinner from "../common/Spinner";
// import { appContext } from "../AppProvider";

function AdminProduct(props) {
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    // const { state } = React.useContext(appContext);
    // const adminId = state.authData?.admin_id;

    const getAdminProducts = async () => {
        try {
            let { data } = await axios.get('/products/product/read');
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const removeProduct = async (id) => {
        try {
            let { data } = await axios.get('/products/product/delete', { product_id: id });
            if (data.result) getAdminProducts()
        } catch (error) {
            console.log(error);
        }
    }

    const approveProduct = async (id) => {
        try {
            let { data } = await axios.get('/products/product/approve', { product_id: id });
            if (data.affectedRows === 1 && data.warningCount === 0) alert("SUCCESS");
        } catch (error) {
            console.log(error);
            alert("ERROR!");

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

    const getPicture = (pic) => {
        let pictures = pic.split(";");
        return pictures.filter(((item, _) => item !== ""));
    }

    const getProductData = async () => {
        try {
            let { data } = await axios.get('/products/product/read');
            setData(data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductData();
    }, []);


    if (isLoading) {
        return <Spinner />
    }

    return (
        <ErrorBoundary>
            <div>
                <main className="container">
                    <div className="row">
                        {data.map((product, i) => {
                            return (
                                <div className="col-md-4 card my-3 shadow-none" key={i} >
                                    <p className="d-flex justify-content-between m-3">
                                        <Link
                                            className="btn btn-outline-success"
                                            to={{
                                                pathname: `/detail/${product.product_id}`,
                                                state: product

                                            }}
                                        ><span className="fa fa-eye"></span></Link>
                                        <button className="btn btn-outline-info" onClick={() => shareProduct(product.product_id)}><span className="fa fa-share"></span></button>
                                    </p>
                                    <div>
                                        <i className="bg-white position-absolute" style={{ zIndex: "2" }} >{product.bestseller ? 'Best Seller' : ''} </i>
                                        <img style={{ minWidth: "auto", height: "235px" }} className="cardImg-top img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0] ? getPicture(product.product_picture)[0] : getPicture(product.product_picture)[1]}`} alt={product.product_name ? product.product_name : 'picture'} />
                                    </div>
                                    <div className="card-body">
                                        <p>{product.product_category ? product.product_category : ''}</p>
                                        <p><strong>{product.product_name ? product.product_name : ''}</strong></p>
                                        <p>{product.product_currency ? product.product_currency : 'N'}{product.product_price ? product.product_price : ''}</p>
                                        <p className="d-flex justify-content-between m-3">
                                            <button className="btn btn-outline-success" onClick={() => removeProduct(product.product_id)}><span className="fa fa-trash"></span></button>
                                            <button className="btn btn-outline-info" onClick={() => approveProduct(product.product_id)}> Approve </button>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
}


export default AdminProduct;
