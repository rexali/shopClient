import React from "react";
import { getData } from "../../service";

export default class AuthShipperForgetPass extends React.Component {
    state = {
        email: '',
        result: '',
        err: ''
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {

        let result = await getData('/auth/shipper/request/password', this.state);

        if (result.affectedRows === 1 && result.warningCount === 0) {
            this.setState({ result: 'Success: check your inbox for confirmation email', email: '' })
            console.log(result)
        } else {
            this.setState({ err: 'Error!' })
            console.error(result)
        }
    }

    render() {
        const { result, err, email } = this.state;
        return (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '500px' }}>
                <form name="requestPasswordForm" id="requestPasswordForm" onSubmit={this.handleSubmit}>
                    <h5>Request password change</h5>
                    <p className="text-center bg-success text-white" id="requestPasswordResult"></p>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Enter your email here"
                            required
                            defaultValue={email}
                        />
                    </div>
                    <div className="text-center">
                        <span className="bg-success text-white">{result}</span>
                        <span className="bg-danger text-white">{err}</span>
                        <input
                            type="submit"
                            id="submit-request"
                            className="btn btn-outline-success"
                            value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}