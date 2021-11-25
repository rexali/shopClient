import React, { Component } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";

class Contact extends Component {

    state = {
        name: '',
        email: '',
        subject: '',
        message: '',
        err: '',
        result: ''
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ result: 'Sending...' })
        let messageObj = this.state;
        axios.post("/support/message/add", messageObj).then((response) => {
            let result = JSON.parse(JSON.stringify(response.data));
            console.log(result);
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState({ result: 'Sent successfully', name: '', email: '', message: '' })
                setTimeout(() => { this.setState({ result: '' }) }, 5000)
            } else {
                this.setState({ result: 'Error' })
                setTimeout(() => { this.setState({ result: '' }) }, 5000)
            }
        }).catch((error) => {
            this.setState({ err: "Error" })
            setTimeout(() => { this.setState({ err: '' }) }, 4000)
            console.log(error)
        })
    }

    render() {
        const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };
        return (
            <div>
                <Header title={"Contact"} />
                <main className="container" style={styles.mainHeight}>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Contact us</h4>
                            <p>Tel:<a className="text-decoration-none" href={`tel:07016807004`}>07016807004</a></p>
                            <p>Email:<a className="text-decoration-none" href={`mailto:admin@mujaware.com`}> admin at mujaware dot com</a></p>
                            <p>Address: Naibawa, Kumbotso LG, Kano state</p>
                        </div>
                        <div className="col-md-6">
                            <h4 className="text-center">Send message now</h4>
                            <form name="contactForm" id="contactForm" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputName">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="form-control"
                                        id="name"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputMessage">Message</label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        id="message"
                                        rows="4"
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <div>
                                        <span id="contactFormSuccess" className="d-block text-center bg-success text-white">{this.state.result}</span>
                                        <span id="contactFormFailure" className="d-block text-center bg-danger text-white">{this.state.err}</span>
                                    </div>
                                    <div className="text-center">
                                        <input type="reset" className="btn btn-primary m-2" value="Reset" />
                                        <input type="submit" className="btn btn-primary m-2" value="Send" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Contact;