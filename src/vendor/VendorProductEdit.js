import React, { useState, useRef } from "react";
import axios from "axios";
import ErrorBoundary from "../common/ErrorBoundary";
import { getPicture } from "../service";

export function EditFormOne({ data, updateAfterPost }) {

    let [error, setError] = useState('');
    let [result, setResult] = useState('');

    let product_id = useRef();
    let vendor_id = useRef();
    let product_name = useRef();
    let product_picture = useRef();
    let product_category = useRef();
    let product_sub_category = useRef();
    let product_description = useRef();
    let product_quantity = useRef();
    let product_price = useRef();
    let product_weight = useRef();
    let product_size = useRef();
    let product_code = useRef();
    let product_file = useRef();
    let submit = useRef();


    const handleSubmit = (evt) => {
        evt.preventDefault();
        submit.current.value = 'submiting...'
        let obj = {
            product_id: product_id.current.value,
            vendor_id: vendor_id.current.value,
            product_name: product_name.current.value,
            product_picture: product_file.current.value ? product_file.current.value.split(/[\\/]/).pop() : product_picture.current.src.split(/[\\/]/).pop(),
            product_category: product_category.current.value,
            product_sub_category: product_sub_category.current.value,
            product_description: product_description.current.value,
            product_quantity: product_quantity.current.value,
            product_price: product_price.current.value,
            product_weight: product_weight.current.value,
            product_size: product_size.current.value,
            product_code: product_code.current.value,
            product_file: product_file.current.files[0]
        }

        console.log(obj);
        updateVendorProduct(obj)
        setTimeout(postStatus('Submit'), 2000)
    }

    let postStatus = (val) => {
        submit.current.value = val;
    }

    let updateVendorProduct = async (prdtObj) => {
        setResult({ result: 'Sending data...' });
        try {
            let response = await axios.post("/products/product/update", prdtObj);
            let result = JSON.parse(JSON.stringify(await response.data[0]));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                setResult({ result: 'Success' });
                setTimeout(updateAfterPost(), 2000)
            } else {
                setResult({ result: 'Oop! Please try again' });
            }
        } catch (error) { console.error(error); setError({ err: 'Error' }) }
    }

    return (
        <div className="container">
            <ErrorBoundary>
                <form name="vendorEditForm" id="vendorEditForm" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="product_id"
                            id="product_id"
                            defaultValue={data[0]?.product_id}
                            ref={product_id}
                            hidden
                            required
                        />
                        <input
                            type="text"
                            name="vendor_id"
                            id="vendor_id"
                            defaultValue={data[0]?.vendor_id}
                            ref={vendor_id}
                            hidden
                            required
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input

                                    type="text"
                                    name="product_name"
                                    id="product_name"
                                    placeholder="product name"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_name}
                                    ref={product_name}

                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_code"
                                    id="product_code"
                                    className="form-control rounded"
                                    required
                                    readOnly
                                    value={data[0]?.product_code}
                                    ref={product_code}
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <img
                                    src={`/uploads/${getPicture(data[0]?.product_picture)[0]}`}
                                    id="productPicture"
                                    alt=""
                                    ref={product_picture}
                                    className="rounded img-fluid d-block mx-auto" />

                                <label htmlFor="picture">Choose or take picture</label>
                                <input
                                    type="file"
                                    name="product_picture"
                                    id="product_picture"
                                    accept="images/*"
                                    className="form-control rounded"
                                    ref={product_file}
                                />
                                <span id="productPictureResult"></span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_category"
                                    id="product_category"
                                    placeholder="product category"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_category ?? 'Hello'}
                                    ref={product_category}

                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_sub_category"
                                    id="product_sub_category"
                                    placeholder="product sub-category"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_sub_category}
                                    ref={product_sub_category}

                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea
                                    name="product_description"
                                    id="product_description"
                                    cols="30"
                                    rows="5"
                                    maxLength="100"
                                    placeholder="detail or description of product"
                                    className="form-control rounded"
                                    defaultValue={data[0]?.product_description}
                                    ref={product_description}

                                    required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="product_quantity"
                                    id="product_quantity"
                                    placeholder="product quantity"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_quantity}
                                    ref={product_quantity}

                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="product_price"
                                    id="product_price"
                                    placeholder="product price"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_price}
                                    ref={product_price}

                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="product_weight"
                                    id="product_weight"
                                    placeholder="product weight of a unit"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_weight}
                                    ref={product_weight}

                                />
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_size"
                                    id="product_size"
                                    placeholder="product's size"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_size}
                                    ref={product_size}
                                />
                            </div>
                        </div>

                       

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{error}</span>
                                <input type="submit" ref={submit} defaultValue="Update" className="btn btn-outline-success btn-block" />
                                <input type="button" onClick={() => updateAfterPost()} defaultValue="Cancel" className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        </div>
    )
}

export function EditFormTwo({ data, updateAfterPost }) {
    let [error, setError] = useState('');
    let [result, setResult] = useState('');
    let product_id = useRef();
    let vendor_id = useRef();
    let product_package = useRef();
    let product_colour = useRef()
    let product_model = useRef()
    let product_seller = useRef()
    let product_email = useRef()
    let product_phone = useRef()
    let product_review = useRef()
    let product_shipping = useRef()
    let product_warranty = useRef()
    let product_return = useRef()
    let product_file = useRef();
    let submit = useRef();


    const handleSubmit = (evt) => {
        evt.preventDefault();
        submit.current.value = 'submiting...'
        let obj = {
            product_id: product_id.current.value,
            vendor_id: vendor_id.current.value,
            product_package: product_package.current.value,
            product_colour: product_colour.current.value,
            product_model: product_model.current.value,
            product_seller: product_seller.current.value,
            product_email: product_email.current.value,
            product_phone: product_phone.current.value,
            product_review: product_file.current.value ? product_file.current.value.split(/[\\/]/).pop() : product_review.current.src.split(/[\\/]/).pop(),
            product_shipping: product_shipping.current.value,
            product_return: product_return.current.value,
            product_warranty: product_warranty.current.value
        }

        console.log(obj);
        updateVendorProduct(obj)
        setTimeout(postStatus('Submit'), 2000)
    }

    let postStatus = (val) => {
        submit.current.value = val;
    }

    let updateVendorProduct = async (prdtObj) => {
        setResult({ result: 'Sending data...' });
        try {
            let response = await axios.post("/products/product/update/more", prdtObj);
            let result = JSON.parse(JSON.stringify(await response.data[0]));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                setResult({ result: 'Success' });
                setTimeout(updateAfterPost(), 2000)
            } else {
                setResult({ result: 'Oop! Please try again' });
            }
        } catch (error) { console.error(error); setError({ error: 'Error!' }) }
    }

    return (
        <div className="container">
            <ErrorBoundary>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        defaultValue={data[0]?.product_id}
                        ref={product_id}
                        hidden
                        required
                    />
                    <input
                        type="text"
                        name="vendor_id"
                        id="vendor_id"
                        defaultValue={data[0]?.vendor_id}
                        ref={vendor_id}
                        hidden
                        required
                    />
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <label htmlFor="package">Product's package?</label>
                                <input
                                    type="text"
                                    name="product_package"
                                    placeholder="What is in the box or package?"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_package}
                                    ref={product_package} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="color">Product's Colour</label>
                                <input
                                    type="text"
                                    name="product_colour"
                                    placeholder="product colour"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_color}
                                    ref={product_colour} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="model">Model or Version</label>
                                <input
                                    type="text"
                                    name="product_model"
                                    placeholder="product model or version"
                                    className="form-control rounded"
                                    required
                                    defaultValue={product_model}
                                    ref={product_review} />
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Shipping fee</label>
                                <input
                                    type="number"
                                    name="product_shipping"
                                    placeholder="shipping fee you are charging"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_shipping}
                                    ref={product_shipping} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Warranty</label>
                                <input
                                    type="text"
                                    name="product_warranty"
                                    placeholder="product's warranty here"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_warranty}
                                    ref={product_warranty} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Email</label>
                                <input
                                    type="text"
                                    name="product_email"
                                    placeholder="email address"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_email}
                                    ref={product_email} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="size">Delivery and Return policy</label>
                                <textarea
                                    name="product_return"
                                    placeholder="product's delivery and return policy"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_return}
                                    ref={product_return} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Seller full Name</label>
                                <input
                                    type="text"
                                    name="product_seller"
                                    placeholder="product's seller"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_seller}
                                    ref={product_seller} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Whatsapp Number</label>
                                <input
                                    type="text"
                                    name="product_phone"
                                    placeholder="phone number"
                                    className="form-control rounded"
                                    required
                                    defaultValue={data[0]?.product_phone}
                                    ref={product_phone} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <img
                                    src={`/uploads/${getPicture(data[0]?.product_review) ? getPicture(data[0]?.product_review)[0] : 'logo512.png'}`}
                                    id="productReview"
                                    alt={data[0]?.product_name}
                                    ref={product_review}
                                    className="rounded img-fluid w-50 d-block mx-auto"
                                />
                                <label htmlFor="picture">Select all your products'reviews screenshots
                                    <span
                                        className="fa fa-question-circle pull-right"
                                        title="Screenshot your customers reviews after using your service or product and upload here">
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    name="product_review"
                                    id="product_review"
                                    accept="images/*"
                                    className="form-control rounded"
                                    required
                                    // defaultValue={data[0]?.product_review}
                                    multiple
                                    ref={product_file} />
                                <span id="productReviewResult"></span>
                            </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{error}</span>
                                <input
                                    type="submit"
                                    value="Add"
                                    ref={submit}
                                    className="btn btn-outline-success btn-block" />
                                <input type="button" onClick={() => updateAfterPost()} defaultValue="Cancel" className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>

        </div>
    )
}

export function EditFormThree({ data, updateAfterPost }) {

    let [error, setError] = useState('');
    let [result, setResult] = useState('');

    let product_id = useRef();
    let vendor_id = useRef();
    let product_name = useRef();
    let product_picture = useRef();
    let product_category = useRef();
    let product_sub_category = useRef();
    let product_description = useRef();
    let product_quantity = useRef();
    let product_price = useRef();
    let product_weight = useRef();
    let product_size = useRef();
    let product_code = useRef();
    let product_file = useRef();
    let submit = useRef();


    const handleSubmit = (evt) => {
        evt.preventDefault();
        submit.current.value = 'submiting...'
        let obj = {
            product_id: product_id.current.value,
            vendor_id: vendor_id.current.value,
            product_name: product_name.current.value,
            product_picture: product_file.current.value ? product_file.current.value.split(/[\\/]/).pop() : product_picture.current.src.split(/[\\/]/).pop(),
            product_category: product_category.current.value,
            product_sub_category: product_sub_category.current.value,
            product_description: product_description.current.value,
            product_quantity: product_quantity.current.value,
            product_price: product_price.current.value,
            product_weight: product_weight.current.value,
            product_size: product_size.current.value,
            product_code: product_code.current.value,
            product_file: product_file.current.files[0]
        }

        console.log(obj);
        updateVendorProduct(obj)
        setTimeout(postStatus('Submit'), 2000)
    }

    let postStatus = (val) => {
        submit.current.value = val;
    }

    let updateVendorProduct = async (prdtObj) => {
        setResult({ result: 'Sending data...' });
        try {
            let response = await axios.post("/products/product/update", prdtObj);
            let result = JSON.parse(JSON.stringify(await response.data[0]));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                setResult({ result: 'Success' });
                setTimeout(updateAfterPost(), 2000)
            } else {
                setResult({ result: 'Oop! Please try again' });
            }
        } catch (error) { console.error(error); setError({ err: 'Error' }) }
    }

    return (
        <div className="container">
            <form name="vendorEditForm" id="vendorEditForm" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        defaultValue={data[0]?.product_id}
                        ref={product_id}
                        hidden
                        required
                    />
                    <input
                        type="text"
                        name="vendor_id"
                        id="vendor_id"
                        defaultValue={data[0]?.vendor_id}
                        ref={vendor_id}
                        hidden
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input

                                type="text"
                                name="product_name"
                                id="product_name"
                                placeholder="product name"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_name}
                                ref={product_name}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <img
                                src={`/uploads/${data[0]?.product_picture}`}
                                id="productPicture"
                                alt=""
                                ref={product_picture}
                                className="rounded img-fluid d-block mx-auto" />

                            <label htmlFor="picture">Choose or take picture</label>
                            <input
                                type="file"
                                name="product_picture"
                                id="product_picture"
                                accept="images/*"
                                className="form-control rounded"
                                ref={product_file}
                            />
                            <span id="productPictureResult"></span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_category"
                                id="product_category"
                                placeholder="product category"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_category ?? 'Hello'}
                                ref={product_category}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_sub_category"
                                id="product_sub_category"
                                placeholder="product sub-category"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_sub_category}
                                ref={product_sub_category}

                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <textarea
                                name="product_description"
                                id="product_description"
                                cols="30"
                                rows="5"
                                maxLength="100"
                                placeholder="detail or description of product"
                                className="form-control rounded"
                                defaultValue={data[0]?.product_description}
                                ref={product_description}

                                required />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="number"
                                name="product_quantity"
                                id="product_quantity"
                                placeholder="product quantity"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_quantity}
                                ref={product_quantity}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="number"
                                name="product_price"
                                id="product_price"
                                placeholder="product price"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_price}
                                ref={product_price}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="tel"
                                name="product_weight"
                                id="product_weight"
                                placeholder="product weight of a unit"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_weight}
                                ref={product_weight}

                            />
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_size"
                                id="product_size"
                                placeholder="product's size"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_size}
                                ref={product_size}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_code"
                                id="product_code"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_code}
                                ref={product_code}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-12 text-center">
                        <div className="form-group">
                            <span id="addProductResultS" className="bg-success text-white">{result}</span>
                            <span id="addProductResultF" className="bg-danger text-white">{error}</span>
                            <input type="submit" ref={submit} defaultValue="Update" className="btn btn-outline-success btn-block" />
                            <input type="button" onClick={() => updateAfterPost()} defaultValue="Cancel" className="btn btn-outline-success btn-block" />

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export function EditFormFour({ data, updateAfterPost }) {

    let [error, setError] = useState('');
    let [result, setResult] = useState('');

    let product_id = useRef();
    let vendor_id = useRef();
    let product_name = useRef();
    let product_picture = useRef();
    let product_category = useRef();
    let product_sub_category = useRef();
    let product_description = useRef();
    let product_quantity = useRef();
    let product_price = useRef();
    let product_weight = useRef();
    let product_size = useRef();
    let product_code = useRef();
    let product_file = useRef();
    let submit = useRef();


    const handleSubmit = (evt) => {
        evt.preventDefault();
        submit.current.value = 'submiting...'
        let obj = {
            product_id: product_id.current.value,
            vendor_id: vendor_id.current.value,
            product_name: product_name.current.value,
            product_picture: product_file.current.value ? product_file.current.value.split(/[\\/]/).pop() : product_picture.current.src.split(/[\\/]/).pop(),
            product_category: product_category.current.value,
            product_sub_category: product_sub_category.current.value,
            product_description: product_description.current.value,
            product_quantity: product_quantity.current.value,
            product_price: product_price.current.value,
            product_weight: product_weight.current.value,
            product_size: product_size.current.value,
            product_code: product_code.current.value,
            product_file: product_file.current.files[0]
        }

        console.log(obj);
        updateVendorProduct(obj)
        setTimeout(postStatus('Submit'), 2000)
    }

    let postStatus = (val) => {
        submit.current.value = val;
    }

    let updateVendorProduct = async (prdtObj) => {
        setResult({ result: 'Sending data...' });
        try {
            let response = await axios.post("/products/product/update", prdtObj);
            let result = JSON.parse(JSON.stringify(await response.data[0]));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                setResult({ result: 'Success' });
                setTimeout(updateAfterPost(), 2000)
            } else {
                setResult({ result: 'Oop! Please try again' });
            }
        } catch (error) { console.error(error); setError({ err: 'Error' }) }
    }

    return (
        <div className="container">
            <form name="vendorEditForm" id="vendorEditForm" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        defaultValue={data[0]?.product_id}
                        ref={product_id}
                        hidden
                        required
                    />
                    <input
                        type="text"
                        name="vendor_id"
                        id="vendor_id"
                        defaultValue={data[0]?.vendor_id}
                        ref={vendor_id}
                        hidden
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input

                                type="text"
                                name="product_name"
                                id="product_name"
                                placeholder="product name"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_name}
                                ref={product_name}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <img
                                src={`/uploads/${data[0]?.product_picture}`}
                                id="productPicture"
                                alt=""
                                ref={product_picture}
                                className="rounded img-fluid d-block mx-auto" />

                            <label htmlFor="picture">Choose or take picture</label>
                            <input
                                type="file"
                                name="product_picture"
                                id="product_picture"
                                accept="images/*"
                                className="form-control rounded"
                                ref={product_file}
                            />
                            <span id="productPictureResult"></span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_category"
                                id="product_category"
                                placeholder="product category"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_category ?? 'Hello'}
                                ref={product_category}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_sub_category"
                                id="product_sub_category"
                                placeholder="product sub-category"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_sub_category}
                                ref={product_sub_category}

                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <textarea
                                name="product_description"
                                id="product_description"
                                cols="30"
                                rows="5"
                                maxLength="100"
                                placeholder="detail or description of product"
                                className="form-control rounded"
                                defaultValue={data[0]?.product_description}
                                ref={product_description}

                                required />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="number"
                                name="product_quantity"
                                id="product_quantity"
                                placeholder="product quantity"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_quantity}
                                ref={product_quantity}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="number"
                                name="product_price"
                                id="product_price"
                                placeholder="product price"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_price}
                                ref={product_price}

                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="tel"
                                name="product_weight"
                                id="product_weight"
                                placeholder="product weight of a unit"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_weight}
                                ref={product_weight}

                            />
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_size"
                                id="product_size"
                                placeholder="product's size"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_size}
                                ref={product_size}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="product_code"
                                id="product_code"
                                className="form-control rounded"
                                required
                                defaultValue={data[0]?.product_code}
                                ref={product_code}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-12 text-center">
                        <div className="form-group">
                            <span id="addProductResultS" className="bg-success text-white">{result}</span>
                            <span id="addProductResultF" className="bg-danger text-white">{error}</span>
                            <input type="submit" ref={submit} defaultValue="Update" className="btn btn-outline-success btn-block" />
                            <input type="button" onClick={() => updateAfterPost()} defaultValue="Cancel" className="btn btn-outline-success btn-block" />

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default function VendorProductEdit({ productId, data, updateAfterPost }) {

    let [whichForm, setWhichForm] = useState(0)

    const editForm = (fm) => {
        setWhichForm(fm);
    }
    const formData = data.filter((product) => product.product_id === productId);
    // console.log(formData);
    if (whichForm === 1) {
        return <EditFormOne data={formData} updateAfterPost={updateAfterPost} />;
    } else if (whichForm === 2) {
        return <EditFormTwo data={formData} updateAfterPost={updateAfterPost} />;
    } else if (whichForm === 3) {
        return <EditFormThree data={formData} updateAfterPost={updateAfterPost} />;
    } else if (whichForm === 4) {
        return <EditFormFour data={formData} updateAfterPost={updateAfterPost} />;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '550px' }}>
            <div className="t">
                <p><button className="btn btn-outline-info" onClick={() => editForm(1)}>Edit 1</button></p>
                <p>Product name, price, summary, pictures? etc</p>
                <p><button className="btn btn-outline-info" onClick={() => editForm(2)}>Edit 2</button></p>
                <p>Product category, sub-category, video, description etc</p>
                <p><button className="btn btn-outline-info" onClick={() => editForm(3)}>Edit 3</button></p>
                <p>Product package, model colour, weight, quantity, size, <br />warranty, shipping, delivery &amp; return policy etc</p>
                <p><button className="btn btn-outline-info" onClick={() => editForm(4)}>Edit 4</button></p>
                <p>Product name, price etc</p>
                <p className="text-center"><button className="btn btn-outline-info" onClick={() => updateAfterPost()}>Cancel</button></p>
            </div>
        </div>
    );
}