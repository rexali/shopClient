import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorBoundary from "../common/ErrorBoundary";
import Spinner from "../common/Spinner";
import { appContext } from "../AppProvider";
// import VendorEditForm from "./VendorEditForm";
import AdminEditForm from "./AdminEditForm";

function AdminProduct(props) {
    let [data, setData] = useState([]);
    let [show, setShow] = useState(true);
    let [isLoading, setIsLoading]=useState(true);
    let [productId, setProductId] = useState(null);
    
    const { state } = React.useContext(appContext);
    const adminId = state.authData?.admin_id;
    
    const getAdminProducts = async (id) => {
        if (id) {
            try {
                let response = await axios.post('/products/product/read');
                let result = JSON.parse(JSON.stringify(await response.data));
                setData(result);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeProduct = (id) => {
        import("axios").then((axios) => {
            axios.get('/products/product/delete', {
                body: { product_id: id }
            }).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                if (result.affectedRows === 1 && result.warningCount === 0) {
                    getAdminProducts(id)
                }
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const editProduct = (id) => {
        setProductId(id);
        setShow(false);
    }

    const updateAfterPost = () => {
        setShow(true);
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
        return pictures.filter(((item,_)=>item!==""));
    }

    const fetchMeData = async (id) => {
        if (id) {
            try {
                let response = await axios.post('/products/product/read');
                let result = JSON.parse(JSON.stringify(await response.data));
                setData(result);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchMeData(adminId);
    }, [adminId]);


    if(isLoading){
        return <Spinner />
    }

    return (
        <ErrorBoundary>
            <div>
                <main className="container">
                    <div className="row">
                    {show && data.map((product, i) => {
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
                                        <button className="btn btn-outline-info" onClick={() => editProduct(product.product_id)}><span className="fa fa-edit"></span></button>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {/* {!show && <VendorEditForm data={data} updateAfterPost={updateAfterPost} />} */}
                    {!show && <AdminEditForm productId={productId} data={data} updateAfterPost={updateAfterPost} />}
                </div>
                </main>
            </div>
        </ErrorBoundary>
    );
}


export default AdminProduct;
