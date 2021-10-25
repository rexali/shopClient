import React, { Component } from "react";

class ShipperAddForm extends Component {

    initialState = {
        product_name: '',
        product_picture: '',
        product_category: '',
        product_sub_category: '',
        product_description: '',
        product_quantity: '',
        product_price: '',
        product_weight: '',
        product_size: ''
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
        product_size: ''
    }


    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        });
        
    }

    handleSubmit = () => {
        const productObj = this.state;
        console.log(productObj);
        this.setState(this.initialState)
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
            <form name="adminAddForm" id="adminAddForm">
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
                            <img
                                src=""
                                id="productPictureAdd"
                                alt=""
                                className="rounded img-fluid d-block mx-auto" />

                            <label htmlFor="picture">Choose or take picture</label>
                            <input
                                type="file"
                                name="product_picture" id="product_picture_add"
                                accept="images/*"
                                className="form-control rounded"
                                required
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
                            <span id="addProductResultS" className="bg-success text-white"></span>
                            <span id="addProductResultF" className="bg-danger text-white"></span>
                            <input type="button" onClick={this.handleSubmit} value="Add" className="btn btn-outline-success btn-block" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default ShipperAddForm;