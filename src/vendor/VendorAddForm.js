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
        product_name: '',
        product_picture: '',
        product_category: '',
        product_sub_category: '',
        product_description: '',
        product_quantity: '',
        product_price: '',
        product_weight: '',
        product_size: '',
        files: [],
        filenames: '',
        result: '',
        err: '',
        product_code: Math.floor(Math.random() * 10000000),
        vendor_id: this.context.state.authData?.vendor_id
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;

        this.setState({
            [name]: value
        });
    }

    handleFiles = () => {
        let files = this.state.files.map((file, i) => {
            return file.file;
        });
        for (let i = 0; i < files.length; i++) {
            this.handleFileUpload(files[i]);
        }
    }


    handleFileUpload = (file) => {
        console.log(file.name);
        let formData = new FormData();
        formData.append(
            'picture',
            file ? file : '',
            file.name
        );
        try {
            axios.post("/file/file", formData, {
                headers: {
                    'Content-Type':'multipart/form-data',
                    // 'Authorization':'Bearer ....'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    displayImages = (file) => {
        if (file) {
            let image = document.createElement("img");
            image.setAttribute("src", file);
            image.setAttribute("id", "myImage");
            image.setAttribute("width", "50px");
            image.setAttribute("height", "50px");
            image.style.display = "inline-block";
            image.style.margin = "auto";
            image.style.margin = "1px";
            document.getElementById("displayImages").append(image);
        }
    }

    showProductPictures = async (evt) => {
        var imagefile, objUrl;;
        try {
            imagefile = await evt.target.files[0];

            if (!(imagefile.size > 0.05 * 1024 * 1024)) {
                this.setState({
                    filenames: this.state.filenames.concat(';' + imagefile.name),
                    files: [...this.state.files, { [evt.target.name]: await evt.target.files[0] }]
                });
                objUrl = URL.createObjectURL(imagefile);
                this.displayImages(objUrl);
            } else { alert("Large file, your file must be less than 50 KB") }
        } catch (error) { console.log(error) }

        console.log(this.state.files)
    }

    handleImages = () => {
        document.querySelector(".fa.fa-camera").addEventListener("click", (event) => {
            let input = document.createElement("input");
            input.type = 'file';
            input.name = `file`
            input.onchange = (evt) => this.showProductPictures(evt);
            input.click();
        });
    };

    handleSubmit = () => {
        this.setState({ result: 'Sending data...' })
        const productObj = this.state;
        console.log(productObj)
        axios.post("/products/product/add", productObj).then((response) => {
            let result = JSON.parse(JSON.stringify(response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState({ result: 'Product added' })
                this.setState(this.initialState);
                this.handleFiles();
                this.setState({ result: 'Product and file added' })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.handleImages();
    }

    render() {

        const {
            product_name,
            // product_picture,
            product_category,
            product_sub_category,
            product_description,
            product_quantity,
            product_price,
            product_weight,
            product_size,
            result,
            err
        } = this.state;
        return (
            <ErrorBoundary>
                <form name="vendorAddForm" id="vendorAddForm">
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="product_name"
                                    id="product_name"
                                    placeholder="product name here"
                                    className="form-control rounded"
                                    required
                                    onChange={this.handleChange}
                                    value={product_name}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <span>Tap the camera icon to add product pictures</span>
                                <div className="input-group d-flex justify-content-between mb-2">
                                    <div id="displayImages"></div><span className="fa fa-camera btn-link text-decoration-none"></span>
                                </div>
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
                                <span className="bg-success text-white d-block m-2 rounded">{result}</span>
                                <span className="bg-danger text-white d-block m-2 rounded">{err}</span>
                                <input type="button" onClick={this.handleSubmit} value="Submit" className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        );
    }
}
export default VendorAddForm;


