import React, { useEffect, useState } from "react";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { appContext } from "../AppProvider";
import Spinner from "../common/Spinner";
import ShowToast from "../common/ShowToast";
import ShowModal from "../common/ShowModal"

function CartForm({ collectProductIds, collectVendorIds, collectProductPrices, collectProductQuantities, getTotal, clearCart, setTransxMessage,setTransxStatus }) {

    const { state } = React.useContext(appContext);

    let userId = state.authData?.user_id;

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [address, setAddress] = useState('');
    let [localGovt, setLocalGovt] = useState('');
    let [statex, setStatex] = useState('');
    let [method, setMethod] = useState(1);
    let [data, setData] = useState([])

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
            setStatex(value)
        } else {
            setMethod(value)
        }
    };

    const getUserDetail = async (userId) => {
        let data = { user_id: userId }
        let fetchOption = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        if (userId) {
            try {
                let response = await fetch("/users/user", fetchOption);
                let result = await response.json();
                if (result) setData(result);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let cartObj = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            address: address,
            loc_govt: localGovt,
            state: statex,
            method: method,
            user_id:userId
        }
        console.log(cartObj);

        checkout(
            collectProductIds, 
            collectVendorIds, 
            collectProductPrices, 
            collectProductQuantities, 
            getTotal, 
            cartObj, 
            clearCart
            );
    }

    const postOrder = async (pid, vid, price, qty, total, checkoutObj, status) => {
        try {
            let response = await axios.post('/transaction/add',
                {
                    first_name: checkoutObj.first_name,
                    last_name: checkoutObj.last_name,
                    phone: checkoutObj.phone,
                    email: checkoutObj.email,
                    address: checkoutObj.address,
                    loc_govt: checkoutObj.loc_govt,
                    state: checkoutObj.state,
                    user_id: userId,
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
                console.log("order success");
            } else {
                console.log("order Error")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const updateUserProfile = async (cartObj) => {
        try {
            let response = await axios.post("/users/user/update", cartObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                console.log("update user success");
            } else {
                console.log("update user Error")
            }
        } catch (error) {
            console.log(error);
        }


    }

    const checkout = (pids, vids, prices, quantities, total, cartObj, clearCart) => {

        switch (Number(method)) {

            case 1:
                const POD = "Order successfully submitted and pay N" + getTotal + " on delivery";
                for (let i = 0; i < pids.length; i++) {
                    postOrder(pids[i], vids[i], prices[i], quantities[i], total, cartObj, 'pending');

                }
                // postOrder(pids, vids, prices, quantities, total, cartObj, 'pending');
                // alert(POD)
                updateUserProfile(cartObj);
                setTransxMessage(POD)
                setTransxStatus(true);
                break;
            case 2:
                const BT = "Pay to the account detail below: \n\r Account name: Siniotech Information and Communication Technology Co. Ltd \n\r Account number: 0020345409 \n\r Bank: Guarranty Trust Bank (GTB)";
                for (let i = 0; i < pids.length; i++) {
                    postOrder(pids[i], vids[i], prices[i], quantities[i], total, cartObj, 'pending');

                }
                // postOrder(pids, vids, prices, quantities, total, cartObj, "pending");
                // alert(BT)
                updateUserProfile(cartObj);
                setTransxMessage(BT)
                setTransxStatus(true);
                break;
            case 3:
                payWithPaystack(pids, vids, prices, quantities, total, cartObj, clearCart)
                break;
            case 4:
                payWithFlutterwave(pids, vids, prices, quantities, total, cartObj, clearCart)
                break;
            default:
                const PO = "Order successfully submitted and pay N" + getTotal + " on delivery";
                for (let i = 0; i < pids.length; i++) {
                    postOrder(pids[i], vids[i], prices[i], quantities[i], total, cartObj, 'pending');
                }
                // postOrder(pids, vids, prices, quantities, total, cartObj, PO);
                setTransxMessage(PO)
                setTransxStatus(true);
                break;
        }
    }

    //  pay with paystack api
    const payWithPaystack = (pid, vid, price, qty, total, checkoutObj, clearCart) => {
        // eslint-disable-next-line no-undef
        var handler = PaystackPop.setup({
            key: 'pk_test_2ae6f4d367d1966aef717a01edf9623d51143db2', //"pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7",  //'pk_test_2ae6f4d367d1966aef717a01edf9623d51143db2',
            email: checkoutObj.email, //'customer@email.com',
            amount: Number(total) * 1000, //10000,
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
                window.sessionStorage.setItem('cartItemCount', 0);
                // postOrder(pid, vid, price, qty, total, checkoutObj, 'paid');
                for (let i = 0; i < pid.length; i++) {
                    postOrder(pid[i], vid[i], price[i], qty[i], total, checkoutObj, 'paid');
                }
                updateUserProfile(checkoutObj);
                // sendEmail(pid, checkoutObj);
                clearCart();

            },

            onClose: function () {
                console.log('window closed');
            }
        });
        handler.openIframe();
    }

    // pay with flutterwave api
    const payWithFlutterwave = (pid, vid, price, qty, total, checkoutObj, clearCart) => {
        // eslint-disable-next-line no-undef
        FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",//"FLWPUBK-d73d8f818c1c767ff0ce79df476a2869-X", // "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
            tx_ref: '' + Math.floor((Math.random() * 1000000000) + 1), //"hooli-tx-1920bbtyt",
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
                email: checkoutObj.email, //"user@gmail.com",
                phone_number: checkoutObj.phone, //"08102909304",
                name: checkoutObj.first_name + ' ' + checkoutObj.last_name //"yemi desola",
            },

            callback: function (data) {
                console.log(data);
                // postOrder(pid, vid, price, qty, total, checkoutObj, 'paid');
                for (let i = 0; i < pid.length; i++) {
                    postOrder(pid[i], vid[i], price[i], qty[i], total, checkoutObj, 'paid');
                }
                updateUserProfile(checkoutObj);
                // sendEmail(pid, checkoutObj);
                clearCart();
            },

            onclose: function () {
                // close modal
            },

            customizations: {
                title: "SINIOCART",
                description: "Payment for items in your cart",
                logo: "https://siniotech.com/images/logo.png",
            },
        });
    }

    useEffect(() => {
        getUserDetail(userId);
    }, [userId]);

    return (
        <form onSubmit={handleSubmit} name="cartForm" className="text-center mx-auto" id="cartForm">
            <div className="form-group">

            </div>
            <div className="form-group">
                <label>First name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="enter first name"
                    className="form-control"
                    defaultValue={data[0]?.first_name ?? ''}
                    required
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="enter last name"
                    className="form-control"
                    defaultValue={data[0]?.last_name ?? ''}
                    required
                    onChange={handleChange} />

            </div>
            <div className="form-group">
                <label>Phone number</label>
                <input
                    type="text"
                    name="phone"
                    id="phoneNumber"
                    placeholder="enter phone number"
                    className="form-control"
                    defaultValue={data[0]?.phone ?? ''}
                    required
                    onChange={handleChange} />

            </div>
            <div className="form-group">
                <label>Street address</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="enter street address"
                    className="form-control"
                    defaultValue={data[0]?.address ?? ''}
                    required
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input
                    type="text"
                    name="email"
                    id="emailAddress"
                    placeholder="enter email"
                    className="form-control"
                    defaultValue={data[0]?.email ?? ''}
                    required
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Local govt</label>
                <input
                    type="text"
                    name="localGovt"
                    id="localGovernment"
                    placeholder="enter LGA"
                    className="form-control"
                    defaultValue={data[0]?.loc_govt ?? ''}
                    required
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="enter state"
                    className="form-control"
                    defaultValue={data[0]?.state ?? ''}
                    required
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Payment gateway</label>
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

            <div className="form-group">
                <input type="submit" value="Continue to checkout" className="btn btn-success m-2" />
            </div>
        </form>
    );
}



function CartTable({ subTotal, shippingFee, total }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <tbody>
                    <tr><td>Sub total</td><td>{subTotal}</td></tr>
                    <tr><td>Shipping fee</td><td>{shippingFee ? shippingFee : 1500}</td></tr>
                    <tr><td>Total</td><td>{total}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

function Cart() {
    let [quantity, setQuantity] = useState(1);
    let [data, setData] = useState([]);
    let [isLoading, setIsLoading] = useState([]);
    let [isLoggedin, setIsLoggedin] = useState(false);
    let [toastState, setToastState] = useState(false)
    let [favouriteState, setFavouriteState] = useState(false)
    let [tranxStatus, setTransxStatus] = useState(false)
    let [tranxMesaage, setTransxMessage] = useState(null)



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

    const { setCartData, state } = React.useContext(appContext);
    const userId = state.authData?.user_id;


    const styles = {
        inputQsize: { width: '25px', height: '20px' },
        productNameSize: { maxWidth: '150px' },
        mainHeight: { minHeight: "550px" },
        imageSize: { height: '100px', width: '100px' }
    }

    const increaseQuantity = (event) => {
        event.target.previousSibling.value = Number(event.target.previousSibling.value) + 1;
        setQuantity(Number(event.target.previousSibling.value));
        console.log(Number(event.target.previousSibling.value));
    }

    const decreaseQuantity = (event) => {

        if (Number(event.target.nextSibling.value) === 1) {
            event.target.nextSibling.value = 1;
            setQuantity(1);
        } else {
            event.target.nextSibling.value = Number(event.target.nextSibling.value) - 1;
            setQuantity(Number(event.target.nextSibling.value));
        }
    }


    const saveProduct = async(event, pid, vid) => {
        event.target.style.color = "green";
        if (userId) {
            console.log(userId);
            let resu = await getProductIds({ url: '/wish/read', method: 'post', data: { user_id: userId } });
            if (resu.includes(pid)) {
                alert("Item already in cart")
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
            // Please log in
            setIsLoggedin(true)

        }
    }

    const removeProduct = (evt, pid) => {
        evt.target.style.color = "green";
        if (userId) {
            axios.post('/cart/delete', { user_id: userId, product_id: pid })
                .then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result.result)
                    showToast()
                    setTimeout(() => {
                        resetToast();
                    }, 3000);
                    getCartData(userId);
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            // Please log in;
            setIsLoggedin(true)

        }
    }

    const clearCart = () => {
        if (userId) {
            axios.post('/cart/delete/all', { user_id: userId })
                .then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result.result)
                    if (result.result) setCartData([]); setData([]);
                    console.log("success");
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            // alert("Please log in");
            setIsLoggedin(true)

        }
    }

    const collectProductIds = (params) => {
        // let product_ids = "";
        let product_ids = [];
        params.forEach(element => {
            // product_ids += element.product_id + ";";
            product_ids.push(element.product_id);
        });
        console.log(product_ids);
        return product_ids;
    }


    const collectProductPrices = (params) => {
        // let product_prices = '';
        let product_prices = [];
        params.forEach(element => {
            // product_prices += element.product_price + ";";
            product_prices.push(Number(element.product_price));
        });
        console.log(product_prices);

        return product_prices;

    }

    const collectVendorIds = (params) => {
        // let vendor_ids = "";
        let vendor_ids = [];

        params.forEach(element => {
            // vendor_ids += element.vendor_id + ";";
            vendor_ids.push(element.vendor_id);
        });
        console.log(vendor_ids);
        return vendor_ids;
    }


    const sumProductPrice = (total, num) => {
        return total + num;
    }

    const sumProductShipping = (total, num) => {
        return total + num;
    }

    const getProductPrices = () => {
        let productPrices = [];
        data.forEach(element => {
            productPrices.push(Number(element.product_price) * quantity);
        });
        return productPrices;
    }

    const getShippingFees = () => {
        // collect the shipping price
        let productShipping = [];
        data.forEach(element => {
            productShipping.push(Number(element.product_shipping ? element.product_shipping : 0));
        });
        return productShipping;
    }

    // calculate the subtotal, total shipping, and total
    const getTotal = () => {
        let total = getSubTotal() + (getShippingCost() !== 0 ? getShippingCost() : 1500);
        return total;
    }
    const getSubTotal = () => {

        return getProductPrices().reduce(sumProductPrice, 0);
    }
    const getShippingCost = () => {
        return getShippingFees().reduce(sumProductShipping, 0);
    }

    const getCartData = async (uid) => {

        if (uid) {
            try {
                let { data } = await axios.post('/cart/read', { user_id: uid });
                setCartData(data);
                setData(data)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
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


    const fetchCartData = async (uid) => {
        if (uid) {
            try {
                let { data } = await axios.post('/cart/read', { user_id: uid });
                setData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoggedin(true)
        }
    }

    const collectProductQuantities = () => {
        let quantities = []
        let qty = document.querySelectorAll(".quantity");

        for (let index = 0; index < qty.length; index++) {
            quantities.push(Number(qty[index].value));
        }
        console.log(quantities);
        return quantities;
    }

    useEffect(() => {
        fetchCartData(userId);
    }, [userId]);

    if (isLoggedin) {
        return <Redirect to="/auth/user" />
    }

    if (isLoading) return <Spinner />

    return (
        <div>
            <CartHeader />
            <main className="container" style={styles.mainHeight} >
                <div className="row">
                    <div className="col-md-6">
                {data.map((item, i) => {
                    return (
                        <ul className="list-group card mb-2 mt-2" key={i}>
                            <li className="list-group-ite d-flex justify-content-around">
                                <Link to={{ pathname: '/detail/' + item.product_id }}>
                                    <img src={`/uploads/${item.product_picture ? item.product_picture : 'logo512.png'}`} alt={item.product_name ? item.product_name : ''} style={styles.imageSize} className="img-fluid img-thumbnail" />
                                </Link>
                                <span className="align-self-center text-break" style={styles.productNameSize}>{item.product_name}</span>
                                <span>
                                    <span>{item.product_currency}{" "}</span>
                                    <span>{item.product_price}</span>
                                    <span className="text-muted"><br />{`${quantity} x ${item.product_price}`}</span>
                                    <span className="font-weight-bolder"><br />{quantity * item.product_price}</span>
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-around align-items-center">
                                <span className="fa fa-trash text-danger" onClick={(e) => removeProduct(e, item.product_id)}></span>
                                <span className="fa fa-heart" onClick={(e) => saveProduct(e)}></span>
                                <span className="fa fa-minus" onClick={(e) => decreaseQuantity(e)}></span>
                                <input type="text" name="quantity" defaultValue="1" className="quantity" style={styles.inputQsize} />
                                <span className="fa fa-plus" onClick={increaseQuantity}></span>
                            </li>
                        </ul>
                    )
                })
                }

                {data.length > 0 && <CartTable
                    subTotal={getSubTotal()}
                    shippingFee={getShippingCost()}
                    total={getTotal()} />}
               </div>
               <div className="col-md-6">
                {data.length > 0 && <CartForm
                    collectProductIds={collectProductIds(data)}
                    collectVendorIds={collectVendorIds(data)}
                    collectProductPrices={collectProductPrices(data)}
                    collectProductQuantities={collectProductQuantities().length ? collectProductQuantities() : [1, 1, 1]}
                    getTotal={getTotal()}
                    clearCart={clearCart}
                    setTransxMessage={setTransxMessage}
                    setTransxStatus={setTransxStatus}
                    />}
                </div>
                
                {!data.length && <div className="mt-5 text-center" style={{ marginTop: '300px' }}>No item in the cart</div>}
                {toastState && <ShowToast title={'Cart'} body={'Item deleted'} />}
                {favouriteState && <ShowToast title={'Favourite'} body={'Item added'} />}
                {tranxStatus && <ShowModal title={'Transaction'} body={tranxMesaage} setAbout={setTransxStatus}/>}
                </div>
            </main>
            <CartFooter />
        </div>
    );
}
export default Cart;