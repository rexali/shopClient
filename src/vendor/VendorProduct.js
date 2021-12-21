import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import ErrorBoundary from "../common/ErrorBoundary";
import Spinner from "../common/Spinner";
import { appContext } from "../AppProvider";
// import VendorEditForm from "./VendorEditForm";
import VendorProductEdit from "./VendorProductEdit";
import ShowToast from "../common/ShowToast";
import { getPicture } from "../service";


function VendorProduct(props) {
    let [data, setData] = useState([]);
    let [show, setShow] = useState(true);
    let [isLoading, setIsLoading] = useState(true);
    let [productId, setProductId] = useState(null);
    let [displayToast, setDisplayToast] = useState(false);

    const { state } = React.useContext(appContext);
    const vendorId = state.authData?.vendor_id;

    const getVendorProducts = async (id) => {
        if (id) {
            try {
                let { data } = await axios.post('/products/product/shop', { vendor_id: id });
                setData(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeProduct = (id) => {
        import("axios").then((axios) => {
            axios.get('/products/product/delete/' + id)
                .then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    if (result) {
                        setDisplayToast(true)
                        getVendorProducts(vendorId)
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

    const fetchMeData = async (id) => {
        if (id) {
            try {
                let response = await axios.post('/products/product/shop', { vendor_id: id });
                let result = JSON.parse(JSON.stringify(await response.data));
                setData(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchMeData(vendorId);
    }, [vendorId]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ErrorBoundary>
            <div>
                <main className="container">
                    <div className="row">
                        {show && data.map((product, i) => {
                            return data.length ? (
                                <div className="col-md-4 card my-3 shadow-none" key={i} >
                                    <p className="d-flex justify-content-between m-3">
                                        <Link
                                            className="btn btn-outline-success"
                                            to={{
                                                pathname: `/detail/${product.product_id}`,
                                                state: product

                                            }} >
                                            <span className="fa fa-eye"></span>
                                        </Link>
                                        <button className="btn btn-outline-info" onClick={() => shareProduct(product.product_id)}><span className="fa fa-share-alt"></span></button>
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
                                        <PromoteProduct productId={product.product_id} vendorId={product.vendor_id} />
                                    </div>
                                </div>
                            ) : <div className="text-center mt-5">No item foum</div>;
                        })}
                        {displayToast && <ShowToast title={'Product'} body={'Item deleted'} />}
                        {/* {!show && <VendorEditForm data={data} updateAfterPost={updateAfterPost} />} */}
                        {!show && <VendorProductEdit productId={productId} data={data} updateAfterPost={updateAfterPost} />}
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    );
}


export default VendorProduct;


function PromoteProduct({ productId, vendorId }) {
    // const { state } = React.useContext(appContext)
    // const vendorId = state.authData?.vendor_id;
    let [show, setShow] = useState(false);

    let [result, setResult] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const [channel, setChannel] = useState('');
    const [message, setMessage] = useState('');
    const [duration, setDuration] = useState(0);
    const [charge, setCharge] = useState(70)

    const charges = [80, 150, 290, 570];

    const handleDurationCharge = (value) => {
        setDuration(value);
        setCharge(charges[value - 1])
    }

    const handleChange = (evt) => {

        const { name, value } = evt.target;

        switch (name) {

            case 'channel':
                setChannel(value)
                break;
            case 'message':
                setMessage(value)
                break;
            default:
                new Error("Wrong form attribute name");
                break;
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setResult('Sending...');
        const revObj = {
            channel: channel,
            message: message,
            charge: charge,
            duration: duration,
            product_id: productId,
            vendor_id: vendorId,
        }
        console.log(revObj)
        promoteProduct(revObj);
    }

    const promoteProduct = async (revObj) => {
        try {
            let response = await axios.post("/promotion/add", revObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            if (result.affectedRows === 1 && result.warningCount === 0) {
                setResult('Success');
            }
        } catch (error) {
            console.error(error);
            setResult('Error,Try again');
        }
    }

    return (
        <div className="d-lg-non">
            <Button variant="default" onClick={handleShow}>
                <span className="fa fa-bullhorn text-primary" title="Reach more people">  Promote</span>
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Promote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form name="reviewForm" id="reviewForm" onSubmit={handleSubmit}>

                        <div className="form-group d-flex justify-content-between">
                            <label htmlFor="inputEmail">Duration</label>
                            <select name="duration" defaultValue={duration} onChange={(ev) => handleDurationCharge(ev.target.value)} required>
                                <option value={0}>select a duration</option>
                                <option value={1}>1 week</option>
                                <option value={2}>2 weeks</option>
                                <option value={3}>3 weeks</option>
                                <option value={4}>4 weeks</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputName">Charge ($)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCharge"
                                name="charge"
                                required
                                readOnly
                                value={charge}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputMessage">Marketing message</label>
                            <textarea
                                className="form-control"
                                id="inputMessage"
                                name="message"
                                rows="4"
                                placeholder="Optional"
                                onChange={handleChange}
                                />
                        </div>

                        <div className="form-group d-flex justify-content-between">
                            <label htmlFor="channel">Select a channel</label>
                            <select name="channel" defaultValue={channel} onChange={handleChange} required>
                                <option value="">Select a channel</option>
                                <option value="facebook">Facebook</option>
                                <option value="google">Google</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="kanimall">Kanimall</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <span className="bg-success text-white p-2 rounded rounded-sm">{result}</span>
                            <input
                                type="submit"
                                className="btn btn-outline-primary  btn-sm pull-right"
                                value="Promote now" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
