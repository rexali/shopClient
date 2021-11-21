import axios from "axios";
import React, { Component } from "react";
import { appContext } from "../AppProvider";

class ShippingAddForm extends Component {

    static contextType = appContext;

    initialState = {
        shipping_name: '',
        shipping_mean: '',
        shipping_picture: '',
        shipping_description: ''
    }

    state = {
        shipping_name: '',
        shipping_mean: '',
        shipping_picture: '',
        shipping_description: '',
        shipper_id: this.context.state.authData?.shipper_id,
        filenames: '',
        files: [],
        data: []
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        });

    }

    addStateFees = () => {
        const { data } = this.state;
        this.setState({ data: [...data, 1] })
    }

    removeStateFee = (evt) => {
        evt.target.parentNode.remove();
    }

    postStateFee = async (location, destination, fee) => {
        try {
            let { data } = await axios.post("/shipping/add/shippingfee", { location: location, destination: destination, fee: fee })
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    handleStateAndFee = () => {
        var locationArr = [];
        var destinationArr = [];
        var feeArr = [];
        var locations = document.getElementsByName('location');
        var destinations = document.getElementsByName('destination');
        var fees = document.getElementsByName('fee');

        for (let i = 0; i < locations.length; i++) {
            locationArr.push(locations[i].value);
            feeArr.push(fees[i].value);
            destinationArr.push(destinations[i].value);
        }

        for (let i = 0; i < locationArr.length; i++) {
            // setTimeout(()=>console.log,1000,[stateArr[i], feeArr[i]]);
            this.postStateFee(locationArr[i], destinationArr[i], feeArr[i]);
        }
    }

    handleSubmit = async () => {
        const shippingObj = this.state;
        try {
            let { data } = await axios.post("/shipping/add/shipping", shippingObj)
            console.log(data);
            this.handleStateAndFee();
            this.setState(this.initialState)
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        const {
            shipping_name,
            shipping_mean,
            shipping_picture,
            shipping_description,
            data
        } = this.state;

        return (
            <form name="adminAddForm" id="adminAddForm">
                <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="shipping_name"
                                id="shipping_name"
                                placeholder="Name of your company or business or services"
                                className="form-control rounded"
                                required
                                onChange={this.handleChange}
                                value={shipping_name}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                name="shipping_mean"
                                id="shipping_mean"
                                placeholder="means of transportation e.g. car, truck etc"
                                className="form-control rounded"
                                required
                                onChange={this.handleChange}
                                value={shipping_mean}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <img
                                src=""
                                id="shippingPictureAdd"
                                alt=""
                                className="rounded img-fluid d-block mx-auto" />

                            <label htmlFor="picture">Choose or take picture</label>
                            <input
                                type="file"
                                name="shipping_picture" id="shipping_picture_add"
                                accept="images/*"
                                className="form-control rounded"
                                required
                                onChange={this.handleChange}
                                value={shipping_picture}
                            />
                            <span id="shippingPictureResult"></span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <textarea
                                name="shipping_description"
                                id="shipping_description"
                                cols="30"
                                rows="5"
                                maxLength="100"
                                placeholder="detail or description of shipping"
                                className="form-control rounded"
                                value={shipping_description}
                                required
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-md-12" >
                        <div>
                            <div className="text-right"><input type="button" className="btn btn-outline-secondary btn-sm" value="Add" onClick={this.addStateFees} /></div>
                            <div className="text-center mb-2">
                                <input type="text" name="location" placeholder="Enter service location" className="col-3 mr-1" />
                                <input type="text" name="destination" placeholder="Enter service destination" className="col-3 mr-1" />
                                <input type="text" name="fee" placeholder="Enter service charge" className="col-3 mr-1" />
                                <input type="button" value="X" className="btn btn-sm btn-outline-success" />
                            </div>
                            {data.map((_, i) => {
                                return (<div key={i} className="text-center mb-2">
                                    <input type="text" name="location" placeholder="Enter service location" className="col-3 mr-1" />
                                    <input type="text" name="destination" placeholder="Enter service destination" className="col-3 mr-1" />
                                    <input type="text" name="fee" placeholder="Enter service charge" className="col-3 mr-1" />
                                    <input type="button" value="X" className="btn btn-sm btn-outline-success" onClick={(evt) => this.removeStateFee(evt, i)} />
                                </div>)
                            })}
                            {/* <div className="text-center"><input type="button" value="Submit" onClick={handleSubmit} /></div> */}
                        </div>
                    </div>

                    <div className="col-12 col-md-12 text-center">
                        <div className="form-group">
                            <span id="addshippingResultS" className="bg-success text-white"></span>
                            <span id="addshippingResultF" className="bg-danger text-white"></span>
                            <input type="button" onClick={this.handleSubmit} value="Submit" className="btn btn-outline-success btn-block" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default ShippingAddForm;