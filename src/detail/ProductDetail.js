import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import DetailFooter from "./DetailFooter";
import DetailHeader from "./DetailHeader";
import { getCsrfToken, getJwt, getPicture } from "../service";
import Spinner from "../common/Spinner";



export function DetailProductNav({ phone }) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light" style={{ backgroundColor: 'green' }}>
            <a href="#bar" className="d-md-none" data-toggle="collapse" data-target="#navbarCollapse"><i className="fa fa-bars"></i></a>
            <a href="/" className="navbar-brand text-reset text-uppercase" id="bizName">Kanimart</a>
            <a href={`tel:${phone}`} id="telPhone" className="d-md-none"><i className="fa fa-phone"></i></a>
            <div className="collapse navbar-collapse" id="navbarCollapse">

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link text-reset" href="#review">REVIEW</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-reset" href="#demo">PRODUCT DEMO</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-reset" href="#description">DESCRIPTION</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-reset" href="#feature">FEATURES</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-reset" href="#pricing">PRICING</a>
                    </li>
                </ul>

                <ul className="navbar-nav">
                    <a className="nav-link text-reset" href="#pricing"><i className="fa fa-phone"> {`Tel: ${phone ? phone : '07016807004'}`}</i></a>
                </ul>
            </div>
        </nav>
    )
}

export function OffcanvasReview({ productId, vendorId, ...props }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [name, setName] = useState('');
    let [message, setMessage] = useState('');
    let [email, setEmail] = useState('');
    let [result, setResult] = useState('');
    let [rating, setRating] = useState(1);


    const handleChange = (evt) => {

        const { name, value } = evt.target;

        switch (name) {

            case 'name':
                setName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'message':
                setMessage(value)
                break;
            case 'rating':
                setRating(value)
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
            name: name,
            email: email,
            message: message,
            product_id: productId,
            vendor_id: vendorId
        }
        console.log(revObj);
        postReview(revObj)
    }

    const getIdEmail = async (config) => {
        let { data } = await axios(config);
        let pids = data.map((item) => {
            return item.product_id
        })
        let emails = data.map((item) => {
            return item.email;
        })
        console.log(data)
        return [pids, emails];
    }

    const postReview = async (revObj) => {

        let [pids, emails] = await getIdEmail({
            url: '/transaction/read/tranx/' + revObj.product_id + '/email/' + revObj.email,
            method: 'get',
            data: { product_id: revObj.product_id, email: revObj.email }
        });

        if (pids.includes(revObj.product_id) && emails.includes(revObj.email)) {
            try {
                let response, result;
                if (await getCsrfToken()) {
                    response = await axios.post("/review/add", revObj);
                    result = JSON.parse(JSON.stringify(await response.data));
                    console.log(result);
                }
                if (result.affectedRows === 1 && result.warningCount === 0) {
                    setResult('Success');
                }
            } catch (error) {
                console.error(error);
                setResult('Error');
            }
        } else {
            setResult(null);
            alert("You can not post review. Buy this product and do the review later");
        }
    }

    return (
        <div>
            <button className='btn btn-sm text-reset' onClick={handleShow}><span className="fa fa-send">&nbsp; <a href="#review" className="btn btn-outline-primary btn-sm">Post review</a></span></button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Post reviews</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form name="reviewForm" id="reviewForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                name="name"
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                name="email"
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMessage">Message</label>
                            <textarea
                                className="form-control"
                                id="inputMessage"
                                name="message"
                                rows="4"
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Select from 1 to 5 to rate the item</label>
                            <select name="rating" defaultValue={rating} onChange={handleChange} required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <span className="bg-success text-white"> {result} </span>
                            <input type="submit" className="btn btn-outline-primary pull-right" value="Post" />
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}



function CartForm({ getProductId, getVendorId, getPrice, getQuantity, getTotal }) {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [address, setAddress] = useState('');
    let [localGovt, setLocalGovt] = useState('');
    let [state, setState] = useState('');
    let [country, setCountry] = useState('Nigeria');
    let [method, setMethod] = useState(1);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value)
        } else if (name === "phone") {
            setPhone(value);
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "address") {
            setAddress(value)
        } else if (name === "address") {
            setAddress(value)
        } else if (name === "localGovt") {
            setLocalGovt(value)
        } else if (name === "state") {
            setState(value)
        } else if (name === "country") {
            setCountry(value)
        } else {
            setMethod(value)
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let cartObj = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            method: method
        }
        console.log(cartObj);

        if (await getCsrfToken()) checkout(getProductId, getVendorId, getPrice, getQuantity, getTotal, cartObj);
    }

    const postOrder = async (pid, vid, price, qty, total, checkoutObj, status) => {
        try {
            let response = await axios.post('/transaction/add/tranx',
                {
                    first_name: checkoutObj.firstName,
                    last_name: checkoutObj.lastName,
                    phone: checkoutObj.phone,
                    email: checkoutObj.email,
                    address: checkoutObj.address,
                    loc_govt: checkoutObj.loc_govt,
                    state: checkoutObj.state,
                    country: checkoutObj.country,
                    product_id: pid,
                    vendor_id: vid,
                    order_no: (Math.floor((Math.random() * 1000000000) + 1)),
                    price: price,
                    quantity: qty,
                    total: Number(total),
                    status: status
                });
            let result = JSON.parse(JSON.stringify(((await response.data))));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                alert("success");
            } else {
                alert("Error")
            }
        } catch (error) {
            console.log(error);
        }
    }


    const checkout = (pids, vids, prices, quantities, total, cartObj, clearCart) => {

        switch (Number(method)) {

            case 1:
                const POD = "Order successfully submitted and pay N" + getTotal + " on delivery";
                postOrder(pids, vids, prices, quantities, total, cartObj, 'pending');
                alert(POD)
                break;
            case 2:
                const BT = "Pay to the account detail below: \n\r Account name: Siniotech Information and Communication Technology Co. Ltd \n\r Account number: 0020345409 \n\r Bank: Guarranty Trust Bank (GTB)";
                postOrder(pids, vids, prices, quantities, total, cartObj, "pending");
                alert(BT)
                break;
            case 3:
                payWithPaystack(pids, vids, prices, quantities, total, cartObj)
                break;
            case 4:
                payWithFlutterwave(pids, vids, prices, quantities, total, cartObj)
                break;

            default:
                const PO = "Order successfully submitted and pay N" + getTotal + " on delivery";
                postOrder(pids, vids, prices, quantities, total, cartObj, PO);
                break;
        }
    }


    //  pay with paystack api
    const payWithPaystack = (pid, vid, price, qty, total, checkoutObj) => {
        // eslint-disable-next-line no-undef
        var handler = PaystackPop.setup({
            key: "pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7", //"pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7",  //'pk_test_2ae6f4d367d1966aef717a01edf9623d51143db2',
            email: checkoutObj.email,
            amount: Number(total) * 100,
            currency: "NGN",
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: "+2348065899144"
                    }
                ]
            },
            callback: function (response) {
                console.log('success. transaction ref is ' + response.reference);
                postOrder(pid, vid, price, qty, total, checkoutObj, 'paid');
            },

            onClose: function () {
                console.log('window closed');
            }
        });
        handler.openIframe();
    }

    // pay with flutterwave api
    const payWithFlutterwave = (pid, vid, price, qty, total, checkoutObj) => {
        // eslint-disable-next-line no-undef
        FlutterwaveCheckout({
            public_key: "FLWPUBK-d73d8f818c1c767ff0ce79df476a2869-X", //"FLWPUBK_TEST-SANDBOXDEMOKEY-X",//"FLWPUBK-d73d8f818c1c767ff0ce79df476a2869-X", // "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
            tx_ref: '' + Math.floor((Math.random() * 1000000000) + 1),
            amount: Number(total), //54600,
            currency: "NGN",
            country: "NG",
            payment_options: "card, mobilemoneyghana, ussd",
            // redirect_url: window.location.origin + '/cart', // specified redirect URL "https://callbacks.piedpiper.com/flutterwave.aspx?ismobile=34",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
                email: checkoutObj.email,
                phone_number: checkoutObj.phone,
                name: checkoutObj.first_name + ' ' + checkoutObj.last_name
            },

            callback: function (data) {
                console.log(data);
                postOrder(pid, vid, price, qty, total, checkoutObj, 'paid');
            },

            onclose: function () {
                // close modal
            },

            customizations: {
                title: "SINIOCART",
                description: "Payment for items in your cart",
                logo: "https://mujaware.com/ali.jpg",
            },
        });
    }


    return (
        <form onSubmit={handleSubmit} name="cartForm" className="text-center mx-auto" id="cartForm">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>First name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="enter first name"
                            className="form-control"
                            defaultValue={firstName ?? 'Ali'}
                            required
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="enter last name"
                            className="form-control"
                            defaultValue={lastName ?? ''}
                            required
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Phone number</label>
                        <input
                            type="text"
                            name="phone"
                            id="phoneNumber"
                            placeholder="enter your phone number"
                            className="form-control"
                            defaultValue={phone ?? ''}
                            required
                            onChange={handleChange} />

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Street address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="enter street address"
                            className="form-control"
                            defaultValue={address ?? ''}
                            required
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="text"
                            name="email"
                            id="emailAddress"
                            placeholder="enter email"
                            className="form-control"
                            defaultValue={email ?? ''}
                            required
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Local govt</label>
                        <input
                            type="text"
                            name="localGovt"
                            id="localGovernment"
                            placeholder="enter LGA"
                            className="form-control"
                            defaultValue={localGovt ?? ''}
                            required
                            onChange={handleChange} />

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder="enter state"
                            className="form-control"
                            defaultValue={state ?? ''}
                            required
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="state"
                            id="state"
                            placeholder="enter state"
                            className="form-control"
                            defaultValue={country ?? ''}
                            required
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Select quantity</label>
                        <select onChange={handleChange} defaultValue={method} className="form-control">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4} >4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7} >7</option>
                            <option value={8} >8</option>
                            <option value={9} >9</option>
                            <option value={10} >10</option>
                            <option value={11} >Bulk</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Select payment gateway</label>
                        <select
                            name="method"
                            id="method"
                            className="form-control"
                            defaultValue={method}
                            required
                            onChange={handleChange}>
                            <option value={1}>Pay on Delivery (POD)</option>
                            <option value={2}>Bank Transfer</option>
                            <option value={3}>Paystack</option>
                            <option value={4}>Flutterwave</option></select>
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Checkout" className="btn btn-outline-success m-2" />
                </div>

            </div>
        </form>
    );
}

function ProductDetail() {

    const { id } = useParams();

    const location = useLocation();

    const product = location.state;

    const isMounted = useRef(true)

    let [data, setData] = useState([]);
    let [reviewData, setReviewData] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const styles = {
        beAbove: { zIndex: "1" },
        beAboveS: { zIndex: "1", right: 0 },
        imageProps: { minWidth: "auto", height: "235px" },
        hideAddToCart: { display: 'none' },
        mainHeight: { minHeight: "550px" }
    }

    const shareProduct = async (id) => {
        const dataToShare = {
            title: 'kanimall.com',
            text: 'Check out this product you may like it.',
            url: window.location.origin + '/product/' + id
        }
        if (navigator.share) {
            try {
                await navigator.share(dataToShare);
            } catch (error) {
                console.warn(error);
            }
        }
    }

    const getReviews = (reviews) => {
        let productReviews = [];
        productReviews = reviews?.split(';');
        return productReviews?.filter((item, i) => item !== "");
    }

    const fetchMeData = (pid, product) => {
        if (product) {
            setData([product]);
            setIsLoading(false)
        } else {
            const jwt = getJwt();
            import("axios").then((axios) => {
                if (jwt) {
                    axios.get('/products/product/read/' + pid).then(function (response) {
                        let result = JSON.parse(JSON.stringify(response.data));
                        setData([...result]);
                    }).catch(function (error) {
                        console.log(error);
                    }).finally(() => {
                        setIsLoading(false)
                    });
                }
            });
        }

    }

    const readProductReviewData = (pid) => {
        import("axios").then((axios) => {
            axios.get('/review/read/' + pid).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                setReviewData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    useEffect(() => {
        if (isMounted.current) {
            fetchMeData(Number(id), product);
            readProductReviewData(Number(id));
        }

        return () => {
            isMounted.current = false;
        }
    });

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <DetailHeader />
            <DetailProductNav phone={data[0]?.product_phone} />
            <main style={styles.mainHeight} className="container mt-5">
                {data.map((product, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="col-md-6">
                                <div id="demo" className="carousel slide" data-ride="carousel">
                                    {/* <!-- Indicators --> */}
                                    <ul className="carousel-indicators">
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
                                    </ul>

                                    {/* <!-- The slideshow --> */}
                                    <div className="carousel-inner">
                                        {
                                            getPicture(product.product_picture).map((picture, i) => {
                                                return i === 0 ? (
                                                    <div key={i} className="carousel-item active">
                                                        <img className="img-fluid d-block mx-auto" style={{ height: "auto", width: "200px" }} src={`/uploads/${picture}`} alt={picture ? picture : ''} />
                                                    </div>
                                                ) :
                                                    (
                                                        <div key={i} className="carousel-item">
                                                            <img className="img-fluid d-block mx-auto" style={{ height: "auto", width: "200px" }} src={`/uploads/${picture}`} alt={picture ? picture : ''} />
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>

                                    {/* <!-- Left and right controls --> */}

                                    <a className="carousel-control-prev h-25" href="#demo" data-slide="prev">
                                        <span className="carousel-control-prev-icon"></span>
                                    </a>

                                    <a className="carousel-control-next h-25 bg-success" href="#demo" data-slide="next">
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
                                    <p id={"pricing"}><strong>Price: {product.product_currency ? product.product_currency : 'N '}{product.product_price ? product.product_price : ''}</strong></p>
                                    <p>
                                        <a href={`https://wa.me/234${product.product_phone}?text=I am interested`} className="btn btn-outline-primary" >
                                            <span className="fa fa-whatsapp">  Chat</span>
                                        </a>
                                        <a href="#share" className="btn btn btn-outline-primary pull-right d-md-none">
                                            <span onClick={() => shareProduct(`${window.location.origin + '/product=' + product.product_id}`)} className="fa fa-share-alt"> Share</span>
                                        </a>
                                    </p>
                                    <p>{product?.product_feature ? product.product_feature : ''}</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <p className="font-weight-bold" id="description">Product description</p>

                                <p>{product.product_description}</p>

                                <p> There are {product.product_quauntity} available </p>

                                <p> The item weighs {product.product_weight} kg </p>

                                <p> The item dimensions is {product.product_size} </p>
                            </div>

                            {product.product_video && (
                                <div className="col-md-6">
                                    <h6 className="font-weight-bold" id="demo">Product demo</h6>
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" title="product demonstration" src={'/uploads/' + product?.product_video} allowFullScreen></iframe>
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

                            <div className="col-md-12">
                                <div>
                                    <span className="font-weight-bold" id="review">Reviews</span>
                                    <span className="d-block pull-right">
                                        <OffcanvasReview
                                            productId={product.product_id}
                                            vendorId={product.vendor_id}
                                            placement="end"
                                            scroll={true}
                                            backdrop={false} />
                                    </span>
                                </div>

                                <div className="row">
                                    {getReviews(product.product_review)?.map((filename, i) => {
                                        return (<div className="card col-md-6 mb-5" key={i}>
                                            <img src={`/uploads/${filename ? filename : ''}`} alt={product.product_name ? product.product_name : ''} className="img-fluid d-block mx-auto" />
                                        </div>)
                                    })}
                                </div>

                                <div className="row">
                                    {reviewData.length ? reviewData.map((review, index) => {
                                        return (<div className="card col-md-6" key={index}>
                                            <p className="mb-3 text-info">{review.name}</p>
                                            <p>{review.message}</p>
                                        </div>);
                                    }) : <div className="card mt-5 p-5">There is no review(s) for this product for now</div>
                                    }
                                </div>
                            </div>

                            <div className="col-md-12 mt-5">
                                {<CartForm
                                    getProductId={product.product_id}
                                    getVendorId={product.vendor_id}
                                    getPrice={product.product_price}
                                    getShipping={product.product_shipping}
                                    getQuantity={1}
                                    getTotal={product.product_price}
                                />}
                            </div>
                        </div>
                    );
                })}
            </main>
            <DetailFooter />
        </div>
    );

}

export default ProductDetail;
