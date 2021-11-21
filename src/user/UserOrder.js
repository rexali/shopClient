import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { appContext } from "../AppProvider";
import { getPicture } from "../service";


export function ReviewModal({ productId, vendorId }) {
    const { state } = React.useContext(appContext)
    const userId = state.authData?.user_id; 

    let [show, setShow] = useState(false);

    let [result, setResult] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    let [name, setName] = useState('');
    let [message, setMessage] = useState('');
    let [email, setEmail] = useState('');
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
            rating: rating,
            product_id: productId,
            vendor_id: vendorId,
            user_id: userId
        }
        console.log(revObj)
        postReview(revObj);
    }

    const postReview = async (revObj) => {
        try {
            let response = await axios.post("/review/add", revObj);
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
                <span className="fa fa-envelope-o text-primary"></span>
            </Button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Post review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            <span className="bg-success text-white">{result}</span>
                            <input
                                type="submit"
                                className="btn btn-outline-primary  btn-sm pull-right"
                                value="Post" />
                        </div>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

function UserOrder() {

    let [data, setData] = useState([]);
    const { state } = React.useContext(appContext)
    const userId = state.authData?.user_id;
    const styles = { mainHeight: { minHeight: "550px" }, aboveR: { zIndex: "1", right: 0 }, aboveL: { zIndex: "1", left: 0 }, };


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

    const fetchMeData = (uid) => {
        import("axios").then((axios) => {
            axios.post('/transaction/read', { user_id: uid }).then(function (response) {
                let loadData = JSON.stringify(response.data);
                let result = JSON.parse(loadData);
                console.log(result)
                setData([...result]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }


    useEffect(() => {
        fetchMeData(userId);

    }, [userId]);

    return (
        <div>
            <main style={styles.mainHeight} className="container">
                <div className="row">
                    {data.map((product, i) => {
                        return (<div className="col-md-4 card my-3 shadow-none" key={i} >
                            <div>
                                <a href="#share" className="mt-3 ml-2 position-absolute d-md-none" style={styles.aboveL} onClick={() => shareProduct(product.product_id)}><span className="fa fa-share-alt"></span></a>
                                <span className="m-2 position-absolute" style={styles.aboveR} ><ReviewModal productId={product.product_id} vendorId={product.vendor_id} /></span>
                                <img style={{ minWidth: "auto", height: "235px" }} className="img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0] ? getPicture(product.product_picture)[0]: getPicture(product.product_picture)[1]}`} alt={product.product_name ? product.product_name : ''} />
                            </div>
                            <div className="card-body">
                                <p>
                                    <strong>{product.product_name ? product.product_name : ' '}</strong>
                                </p>
                                <p>
                                    {product.product_currency ? product.product_currency : 'N '}{product.product_price ? product.product_price : ''}
                                </p>
                            </div>
                        </div>);
                    })}
                    {!data.length && <div className="card shadow-none text-center mt-5">No transaction found</div>}
                </div>
            </main>
        </div>
    );

}

export default UserOrder;