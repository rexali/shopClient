import React, { Component } from "react";
import FormData from "form-data";
import axios from "axios";
import ErrorBoundary from "../common/ErrorBoundary";
import { Link } from "react-router-dom";
import { appContext } from "../AppProvider";



export class FormOne extends Component {
    static contextType = appContext;

    initState = {
        product_name: '',
        product_picture: '',
        product_feature: '',
        product_price: '',
    };


    state = {
        product_name: '',
        product_picture: '',
        product_feature: '',
        product_price: '',
        product_code: Math.floor(Math.random() * 10000000),
        vendor_id: this.context.state.authData?.vendor_id, // 9, //window.sessionStorage.getItem("userId"),
        files: [],
        filenames: '',
        result: '',
        err: '',
        id: 1
    }




    handleChange = (evt) => {
        const { name, value } = evt.target;

        this.setState({
            [name]: value
        });
    }

    showPostPicture = (evt) => {
        var imagefile, objUrl;;
        try {
            imagefile = evt.target.files[0];

            if (!(imagefile.size > 0.05 * 1024 * 1024)) {
                this.setState({
                    filenames: this.state.filenames.concat(';' + imagefile.name),
                    files: [...this.state.files, { [evt.target.name]: evt.target.files[0] }]
                });

                objUrl = URL.createObjectURL(imagefile);
                this.displayImages(objUrl);

            } else { alert("Large file, your file must be less than 50KB") }
        } catch (error) { console.log(error) }


    }

    handleImages = () => {
        document.querySelector(".fa.fa-camera").addEventListener("click", () => {
            let input = document.createElement("input");
            input.type = 'file';
            input.name = `file`
            input.onchange = (evt) => this.showPostPicture(evt);
            input.click();
        });

    };

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


    handleFiles = () => {

        let files = this.state.files.map((file, i) => {
            return file.file;
        });

        for (let i = 0; i < files.length; i++) {
            this.handleFileUpload(files[i]);
        }
    }

    handleFileUpload = (file) => {
        let formData = new FormData();
        try {
            formData.append('picture', file ? file : '');
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            };
            xmlhttp.responseType = '';
            xmlhttp.open("POST", "http://localhost:3333/api/v1/file/file", true);
            xmlhttp.send(formData);
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({ result: 'Sending...' });
        const { openTab } = this.props;
        try {
            const productObj = this.state;
            let response = await axios.post("http://localhost:3333/api/v1/products/product/add/1", productObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState(this.initState);
                this.setState({ result: 'Success' });
                window.localStorage.setItem("formone", result.insertId);
                console.log(result.insertId);
                this.handleFiles();
                setTimeout(openTab('formtwo'), 3000);

            }
        } catch (error) {
            this.setState({ result: '' });
            this.setState({ err: "Error!" });
            console.log(error);
        }
    }

    componentDidMount() {
        this.handleImages();
    }

    render() {
        const { product_name, product_summary, product_price } = this.state;
        return (
            <ErrorBoundary>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group">
                            <span>Tap the camera icon to add product pictures</span>
                                <div className="input-group d-flex justify-content-between mb-2">
                                    <div id="displayImages"></div><span className="fa fa-camera align-self-center btn-link text-decoration-none mt-3"> Add+</span>
                                </div>
                            </div>
                        </div>

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
                                    defaultValue={product_name}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
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

                        {/* <div className="col-md-6">
                            <div className="form-group">
                                <img
                                    src=""
                                    id="productPictureAdd"
                                    alt=""
                                    className="rounded img-fluid d-block mx-auto" />

                                <label htmlFor="picture">Choose or take picture</label>
                                <input
                                    type="file"
                                    name="product_picture"
                                    id="product_picture_add"
                                    accept="images/*"
                                    className="form-control rounded"
                                    required
                                    multiple
                                    onChange={this.handleChange}
                                    value={product_picture}
                                />
                                <span id="productPictureResult"></span>
                            </div>
                        </div> */}
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea
                                    name="product_feature"
                                    id="product_feature"
                                    cols="30"
                                    rows="5"
                                    maxLength="100"
                                    placeholder="detail or description of product"
                                    className="form-control rounded"
                                    value={product_summary}
                                    required
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{this.state.result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{this.state.err}</span>
                                <input
                                    type="submit"
                                    value="Save and continue"
                                    className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        );
    }
}

export class FormTwo extends Component {
    initState = {
        product_sub_category: '',
        product_category: '',
        product_description: '',
        product_video: ''
    }

    state = {
        product_sub_category: '',
        product_category: '',
        product_description: '',
        product_video: '',
        product_video_link: '',
        vendor_id: window.sessionStorage.getItem("userId"),
        product_id: window.localStorage.getItem("formone"),
        link: true,
        result: '',
        err: '',
        files: []
    }

    handleChange = (evt) => {
        const { id, name, value } = evt.target;


        this.setState({
            [name]: value
        });

        if (name === "product_video") {
            if (id !== 'product_video_link') {
                this.showPostPicture(evt);
            }
        }
    }

    showPostPicture = (evt) => {
        var imagefile, objUrl;;
        try {
            imagefile = evt.target.files[0];

            if (!(imagefile.size > 0.05 * 1024 * 1024)) {

                this.setState({
                    files: [...this.state.files, { [evt.target.name]: evt.target.files[0] }],
                    product_video: imagefile.name
                });

                objUrl = URL.createObjectURL(imagefile);
                this.displayImage(objUrl);

            } else { alert("Large file, your file must be less than 50KB") }
        } catch (error) { console.log(error) }


    }

    showVideoLinkInput = () => {
        this.setState({ link: true })
    }

    showVideoInput = () => {
        this.setState({ link: false })
    }

    displayVideo = (objUrl) => {
        document.getElementById("productVideo").setAttribute("src", objUrl);
        document.getElementById("productVideo").setAttribute("width", "100px");
        document.getElementById("productVideo").setAttribute("height", "100px");
        document.getElementById("productVideo").style.display = "inline-block";
        document.getElementById("productVideo").style.margin = "auto";
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
        let formData = new FormData();
        try {
            formData.append('picture', file ? file : '');
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            };
            xmlhttp.responseType = '';
            xmlhttp.open("POST", "http://localhost:3333/api/v1/file/file", true);
            xmlhttp.send(formData);
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit = async (evt) => {
        const { openTab } = this.props;
        this.setState({ result: 'Sending...' });
        this.setState({ err: '' });

        evt.preventDefault();
        try {

            const productObj = this.state;
            let response = await axios.post("http://localhost:3333/api/v1/products/product/add/2", productObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState(this.initState);
                this.setState({ result: 'Success' })
                setTimeout(openTab('formthree'), 3000);
            }

        } catch (error) {
            this.setState({ result: '' });
            this.setState({ err: "Error!" });
            console.log(error);
        }
    }

    render() {
        const { product_category, product_sub_category, product_video, product_description, product_video_link } = this.state;

        return (
            <ErrorBoundary>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="picture" className="label-control">Select category</label>
                                <input
                                    type="text"
                                    name="product_category"
                                    id="product_category"
                                    placeholder="product category here"
                                    className="form-control rounded"
                                    required
                                    onChange={this.handleChange}
                                    value={product_category}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="subCat">Choose sub category</label>
                                <input
                                    type="text"
                                    name="product_sub_category"
                                    id="product_sub_category"
                                    className="form-control rounded"
                                    placeholder="sub category"
                                    required
                                    onChange={this.handleChange}
                                    defaultValue={product_sub_category}
                                />
                                <span id="productPictureResult"></span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="video">Paste your product's Youtube video link or upload one</label>
                                <p><button type="button" className="btn btn-sm btn-outline-success mr-2" onClick={this.showVideoLinkInput}>Video Link</button><button type="button" className="btn btn-sm btn-outline-info" onClick={this.showVideoInput}>Upload Video</button></p>

                                <div className="embed-responsive embed-responsive-4by4">
                                    <iframe
                                        title="video"
                                        id="productVideo"
                                        className="embed-responsive-item"
                                        src={product_video ? product_video : "https://www.youtube.com/embed/zpOULjyy-n8?rel=0"}
                                        style={{ display: !this.state.link ? 'block' : 'none' }}
                                        allowFullScreen
                                        frameBorder="0"
                                    ></iframe>
                                </div>

                                <input
                                    type="text"
                                    name="product_video"
                                    id="product_video_link"
                                    style={{ display: this.state.link ? 'block' : 'none' }}
                                    className="form-control rounded"
                                    placeholder="Paste the product's video link here"
                                    defaultValue={product_video_link}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="file"
                                    style={{ display: !this.state.link ? 'block' : 'none' }}
                                    name="product_video"
                                    accept="video/*"
                                    className="form-control rounded"
                                    defaultValue={product_video}
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="feature">Product's descripton</label>
                                <textarea
                                    name="product_description"
                                    cols="30"
                                    maxLength="50000"
                                    placeholder="copy and paste product features and benefits especially"
                                    className="form-control rounded"
                                    onChange={this.handleChange}
                                    defaultValue={product_description}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{this.state.result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{this.state.err}</span>
                                <input
                                    type="submit"
                                    value="Save and continue"
                                    className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        );
    }
}
export class FormThree extends Component {
    initState = {
        product_package: '',
        product_colour: '',
        product_model: '',
        product_quantity: '',
        product_weight: '',
        product_size: '',
        product_seller: '',
        product_email: '',
        product_phone: '',
        product_shipping: '',
        product_warranty: '',
        product_return: '',
    }

    state = {
        product_package: '',
        product_colour: '',
        product_model: '',
        product_quantity: '',
        product_weight: '',
        product_size: '',
        product_seller: '',
        product_email: '',
        product_phone: '',
        product_review: '',
        product_shipping: '',
        product_warranty: '',
        product_return: '',
        product_id: window.localStorage.getItem("formone"),
        vendor_id: window.sessionStorage.getItem("userId"),
        files: [],
        filenames: '',
        result: '',
        err: ''
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;

        this.setState({
            [name]: value
        });


    }


    showPostPicture = (evt) => {
        var imagefile, objUrl;;
        try {
            imagefile = evt.target.files[0];

            if (!(imagefile.size > 0.05 * 1024 * 1024)) {

                this.setState({
                    filenames: this.state.filenames.concat(';' + imagefile.name),
                    files: [...this.state.files, { [evt.target.name]: evt.target.files[0] }]
                });

                objUrl = URL.createObjectURL(imagefile);
                this.displayImages(objUrl);

            } else { alert("Large file, your file must be less than 50KB") }
        } catch (error) { console.log(error) }


    }

    handleImages = () => {
        document.querySelector(".fa.fa-camera").addEventListener("click", () => {
            let input = document.createElement("input");
            input.type = 'file';
            input.name = `file`
            input.onchange = (evt) => this.showPostPicture(evt);
            input.click();
        });

    };

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


    handleFiles = () => {

        let files = this.state.files.map((file, i) => {
            return file.file;
        });

        for (let i = 0; i < files.length; i++) {
            this.handleFileUpload(files[i]);
        }
    }

    handleFileUpload = (file) => {
        let formData = new FormData();
        try {
            formData.append('picture', file ? file : '');
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            };
            xmlhttp.responseType = '';
            xmlhttp.open("POST", "http://localhost:3333/api/v1/file/file", true);
            xmlhttp.send(formData);
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({ result: 'Sending...' });
        this.setState({ err: '' });
        const { openTab } = this.props;
        try {
            const productObj = this.state;
            let response = await axios.post("http://localhost:3333/api/v1/products/product/add/3", productObj);
            let result = JSON.parse(JSON.stringify(await response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState(this.initState);
                this.setState({ result: 'Success' });
                window.localStorage.setItem("formone", result.insertId);
                console.log(result.insertId);
                this.handleFiles();
                setTimeout(openTab('formone'), 3000);
            }
        } catch (error) {
            this.setState({ result: '' });
            this.setState({ err: 'Error!' });
            console.log(error);
        }
    }

    componentDidMount() {
        this.handleImages();
    }


    render() {
        const {
            product_package,
            product_color,
            product_model,
            product_quantity,
            product_weight,
            product_shipping,
            product_warranty,
            product_return,
            product_size,
            product_seller,
            product_email,
            product_phone } = this.state;

        return (
            <ErrorBoundary>
                <form onSubmit={this.handleSubmit}>
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
                                    defaultValue={product_package}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_color}
                                    onChange={this.handleChange} />
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
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="qty">Quantity</label>
                                <input
                                    type="number"
                                    name="product_quantity"
                                    placeholder="product quantity"
                                    className="form-control rounded"
                                    required
                                    onChange={this.handleChange}
                                    defaultValue={product_quantity} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="weight">Weight (in KG)</label>
                                <input
                                    type="tel"
                                    name="product_weight"
                                    placeholder="product weight of a unit"
                                    className="form-control rounded"
                                    required
                                    defaultValue={product_weight}
                                    onChange={this.handleChange} />
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Product size (in mm or cm or m)</label>
                                <input
                                    type="text"
                                    name="product_size"
                                    placeholder="product's size"
                                    className="form-control rounded"
                                    required
                                    defaultValue={product_size}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_shipping}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_warranty}
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="size">Delivery and Return policy</label>
                                <textarea
                                    name="product_return"
                                    placeholder="product's delivery and return policy"
                                    className="form-control rounded"
                                    required
                                    defaultValue={product_return}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_seller}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_phone}
                                    onChange={this.handleChange} />
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
                                    defaultValue={product_email}
                                    onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <span>Tap the camera icon to add product pictures</span>
                                <div className="input-group d-flex justify-content-between mb-2">
                                    <div id="displayImages"></div><span className="fa fa-camera btn-link text-decoration-none"></span>
                                </div>
                            </div>
                        </div>


                        {/* <div className="col-md-6">
                            <div className="form-group">
                                <span id="productReview" className="d-block"></span>
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
                                    defaultValue={product_review}
                                    multiple
                                    onChange={this.handleChange} />
                                <span id="productReviewResult"></span>
                            </div>
                        </div> */}

                        <div className="col-12 col-md-12 text-center">
                            <div className="form-group">
                                <span id="addProductResultS" className="bg-success text-white">{this.state.result}</span>
                                <span id="addProductResultF" className="bg-danger text-white">{this.state.err}</span>
                                <input
                                    type="submit"
                                    value="Add"
                                    className="btn btn-outline-success btn-block" />
                            </div>
                        </div>
                    </div>
                </form>
            </ErrorBoundary>
        );
    }
}

export default class VendorAddPlusForm extends Component {

    state = {
        tabName: 'formone'
    }


    openTab = (tabname) => {
        this.setState({ tabName: tabname })
    }

    render() {
        return (
            <div className="container" >
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link className="nav-link active" data-toggle="tab" onClick={() => this.openTab('formone')} to="#">Form One</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" data-toggle="tab" onClick={() => this.openTab('formtwo')} to="#formtwo">Form Two</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" data-toggle="tab" onClick={() => this.openTab('formthree')} to="#formthree">Form Three</Link>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane container active">
                        {this.state.tabName === 'formone' && <FormOne openTab={this.openTab} />}
                        {this.state.tabName === 'formtwo' && <FormTwo openTab={this.openTab} />}
                        {this.state.tabName === 'formthree' && <FormThree openTab={this.openTab} />}
                    </div>
                </div>
            </div>
        );
    }
}



