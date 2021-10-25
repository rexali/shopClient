import axios from "axios";
import React, { Component } from "react";
import FormData from "form-data";
import ErrorBoundary from "../common/ErrorBoundary";
import { appContext } from "../AppProvider";

class VendorAddForm extends Component {

    static contextType = appContext;

    initialState = {
        product_name: '',
        product_picture: '',
        product_category: '',
        product_sub_category: '',
        product_description: '',
        product_quantity: '',
        product_price: '',
        product_weight: '',
        product_size: '',
        vendor_id: '',
        product_code: ''
    }

    state = {
        product_name: ' ',
        product_picture: '',
        product_category: '',
        product_sub_category: '',
        product_description: '',
        product_quantity: '',
        product_price: '',
        product_weight: '',
        product_size: '',
        product_code: Math.floor(Math.random() * 10000000),
        vendor_id: this.context.state.authData?.vendor_id //'9' //window.sessionStorage.getItem("userId")
    }


    handleChange = (evt) => {
        const { name, value } = evt.target;

        this.setState({
            [name]: value
        });

        if (name === 'product_picture') {
            let fsize;
            try {
                fsize = document.getElementById('product_picture').files[0].size;
            } catch (error) { console.log(error); }
            if (!(fsize > 0.05 * 1024 * 1024)) {
                // this.showPicture(evt);
                this.showProductPictures(evt)
                this.setState({ product_picture: this.productPictures(evt) })
            } else { alert("Large file, your file must be less than 50KB") }
        }
    }

    showPicture = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("productPictureAdd").setAttribute("src", objUrl);
        document.getElementById("productPictureAdd").setAttribute("width", "100px");
        document.getElementById("productPictureAdd").setAttribute("height", "100px");
        document.getElementById("productPictureAdd").style.display = "block";
        document.getElementById("productPictureAdd").style.margin = "auto";
    }

    productPictures = (evt) => {
        let pictureNames = '', product_picture;
        try {
            product_picture = evt.target.files
            if (product_picture.length > 0) {
                for (let i = 0; i < product_picture.length; i++) {
                    var fileName = product_picture[i].name;
                    pictureNames += ';' + fileName;
                }
            }
        } catch (error) {
            console.log(error);
        }

        return pictureNames;
    }

    showProductPictures = (evt) => {
        var lg = evt.target.files.length, images = "";
        if (lg > 0) {
            for (let i = 0; i < lg; i++) {
                images += "<img src='" + URL.createObjectURL(evt.target.files[i]) + "' width='50px' height='50px' style='display:blockd; margin:autod;' class='mr-1'>";
            }
            document.getElementById("productPictureAdd").innerHTML = images;
        }
    }

    uploadPicture = () => {
        try {
            let files = document.getElementById('product_picture').files;
            for (let i = 0; i < files.length; i++) {
                let formData = new FormData();
                formData.append('productpicture', files[i]);
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        console.log(this.responseText);
                    }
                };
                xmlhttp.responseType = '';
                xmlhttp.open("POST", "/file/file", true);
                xmlhttp.send(formData);
            }

        } catch (error) {
            console.log(error);
        }
    }


    handleSubmit = () => {
        const productObj = this.state;
        console.log(productObj)
        axios.post("/products/product/add", productObj).then((response) => {
            let data = JSON.stringify(response.data);
            let result = JSON.parse(data);
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState(this.initialState);
                this.uploadPicture();
            }
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {

        const {
            product_name,
            product_picture,
            product_category,
            product_sub_category,
            product_description,
            product_quantity,
            product_price,
            product_weight,
            product_size
        } = this.state;
        return (
            <ErrorBoundary>
                <form name="vendorAddForm" id="vendorAddForm">
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
                                    onChange={this.handleChange}
                                    value={product_name}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <span id="productPictureAdd"></span>
                                <label htmlFor="picture">Choose or take picture</label>
                                <input
                                    type="file"
                                    name="product_picture"
                                    id="product_picture"
                                    accept="images/*,videos/*"
                                    className="form-control rounded"
                                    required
                                    multiple
                                    onChange={this.handleChange}
                                    value={product_picture}
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
                                    onChange={this.handleChange}
                                    value={product_category}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_sub_category" id="product_sub_category"
                                    placeholder="product sub-category"
                                    className="form-control rounded"
                                    required
                                    onChange={this.handleChange}
                                    value={product_sub_category}
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
                                    value={product_description}
                                    required
                                    onChange={this.handleChange} />
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
                                    onChange={this.handleChange}
                                    value={product_quantity}
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
                                    onChange={this.handleChange}
                                    value={product_price}
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
                                    onChange={this.handleChange}
                                    value={product_weight}
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
                                    onChange={this.handleChange}
                                    value={product_size}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{this.state.result}</span>
                                <span id="addProductResultF" className="bg-danger text-white"></span>
                                <input type="button" onClick={this.handleSubmit} value="Add" className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        );
    }
}
export default VendorAddForm;


