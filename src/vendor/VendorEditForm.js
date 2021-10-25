import axios from "axios";
import React, { Component } from "react";


class VendorEditForm extends Component {

    state = { result: '', err:'' };

    handleSubmit = (evt) => {
        evt.preventDefault();
        let form = document.getElementById("vendorEditForm");
        let productId = form.elements['product_id'].value;
        let vendorId = form.elements['vendor_id'].value;
        let productName = form.elements['product_name'].value;

        let productPicture;
        try {
            productPicture = document.getElementById('product_picture').files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!productPicture) {
                productPicture = document.getElementById("productPicture").getAttribute("src");
            }
        }
        let productCategory = form.elements['product_category'].value;
        let productSubCategory = form.elements['product_sub_category'].value;
        let productDescription = form.elements['product_description'].value;
        let productQuantity = form.elements['product_quantity'].value;
        let productPrice = form.elements['product_price'].value;
        let productWeight = form.elements['product_weight'].value;
        let productSize = form.elements['product_size'].value;
        let productCode = Math.floor(Math.random() * 10000000000);

        const productObj = {
            product_id: productId,
            vendor_id: vendorId,
            product_name: productName,
            product_picture: productPicture.split('/').pop(),
            product_category: productCategory,
            product_sub_category: productSubCategory,
            product_description: productDescription,
            product_quantity: productQuantity,
            product_price: productPrice,
            product_weight: productWeight,
            product_size: productSize,
            product_code: productCode
        };
        console.log(productObj);
        this.updateVendorProduct(productObj);

    }

    updateVendorProduct = async (prdtObj) => {
        this.setState({ result: 'Sending data...' });
        try {
            let response = await axios.post("http://localhost:3333/products/product/update", prdtObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState({ result: 'Success' });
                setTimeout(this.props.updateAfterPost(),2000)
            } else {
                this.setState({ result: 'Oop! Please try again' });
            }
        } catch (error) { console.error(error); this.setState({ err: 'Error' }) }
    }


    render() {
        const { data } = this.props;

        return (
            <div className="container">
                <form name="vendorEditForm" id="vendorEditForm" onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="product_id"
                            id="product_id"
                            value={data[0].product_id}
                            hidden
                            required
                        />
                        <input
                            type="text"
                            name="vendor_id"
                            id="vendor_id"
                            value={data[0].vendor_id}
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
                                    defaultValue={data[0].product_name}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <img
                                    src={`http://localhost:3333/uploads/${data[0].product_picture}`}
                                    id="productPicture"
                                    alt=""
                                    className="rounded img-fluid d-block mx-auto" />

                                <label htmlFor="picture">Choose or take picture</label>
                                <input
                                    type="file"
                                    name="product_picture"
                                    id="product_picture"
                                    accept="images/*"
                                    className="form-control rounded"
                                    required
                                // defaultValue={data[0].product_picture}
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
                                    defaultValue={data[0].product_sub_category}
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
                                    defaultValue={data[0].product_description}
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
                                    defaultValue={data[0].product_quantity}
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
                                    defaultValue={data[0].product_price}
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
                                    defaultValue={data[0].product_weight}
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
                                    defaultValue={data[0].product_size}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{this.state.result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{this.state.err}</span>
                                <input type="submit" defaultValue="Update" className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );

    }

}
export default VendorEditForm;