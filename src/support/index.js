import React, { Component } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
class Support extends Component {

    state = {
        name: '',
        email: '',
        subject:'',
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
        this.setState({ result: 'Sending...'})
        let messageObj = this.state;
        axios.post("/support/send/mail", messageObj).then((response) => {
            let data = response.data;
            console.log(data);
            if (data.result) {
                this.setState({ result: 'Sent successfully', name: '', email: '', message: '' })
                setTimeout(this.setState({ result: '' }), 2000)
            } else {
                this.setState({ result: 'Error' })
                setTimeout(this.setState({ result: '' }), 2000)
            }
        }).catch((error) => {
            this.setState({ err: "Error" })
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Header />
                <main className="container">
                    <h1 className="text-center">Support</h1>
                    <form name="contactForm" id="contactForm" onSubmit={this.handleChange}>
                        
                        <div class="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input
                                type="email"
                                name="email"
                                class="form-control"
                                id="email"
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label htmFor="inputName">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                class="form-control"
                                id="name"
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div class="form-group">
                            <label htmlFor="inputMessage">Message</label>
                            <textarea
                                class="form-control"
                                name="message"
                                id="message"
                                rows="4"
                                required
                                onChange={this.handleChange}
                            />
                        </div>

                        <div class="form-group">
                            <div>
                                <span id="contactFormSuccess" class="d-block text-center bg-success text-white">{this.state.result}</span>
                                <span id="contactFormFailure" class="d-block text-center bg-danger text-white">{this.state.err}</span>
                            </div>
                            <div>
                                <input type="reset" class="btn btn-primary" value="Reset" />
                                <input type="submit" class="btn btn-primary" value="Send" />
                                <input type="button" class="btn btn-link" data-dismiss="modal" value="Cancel" />
                            </div>
                        </div>
                    </form>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Support