import React from "react";
import { postData } from "../../service";

export default class AuthUserForgetPass extends React.Component {
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


    handleSubmit = async (evt) => {
        const success = <div className="alert alert-success">Success: check your inbox</div>;
        const status = <div className="alert alert-info">Sending...</div>;
        const failure = <div className="alert alert-danger">Error!</div>;
        console.log(this.state)
        evt.preventDefault()
        this.setState({ result: status, err: '' })
        let result = await postData('/auth/user/request/password', this.state);
        console.log(result)
        if (result.result) {
            this.setState({ result: success, email: '' })
            console.log(result)
        } else {
            this.setState({ err: failure, result: '' })
            console.error(result)
        }
    }


    render() {
        const { result, err, email } = this.state;
        return (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '500px' }}>
                <form name="requestPasswordForm" id="requestPasswordForm" onSubmit={this.handleSubmit}>
                    <h5 className="text-center">Request password</h5>
                    <p className="text-center bg-success text-white" id="requestPasswordResult"></p>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control border border-primary rounded-pill rounded-sm"
                            onChange={this.handleChange}
                            placeholder="Enter your email here"
                            required
                            defaultValue={email}
                        />
                    </div>
                    <div className="text-center">
                        {result}{err}
                        <input
                            type="submit"
                            id="submit-request"
                            className="btn btn-outline-success rounded-pill"
                            value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}