import React from "react";
import { postData } from '../../service'

export default class AuthVendorChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.params = new URLSearchParams(window.location.search);
        this.random_code = Number(this.params.get('random_code'));
        this.emailAddress = this.params.get('emailAddress');
        this.state = {
            password: '',
            password2: '',
            result: '',
            err: ''
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {
        if (this.state.password === this.state.password2) {

            const postObj = {
                email: this.emailAddress,
                random_code: this.random_code,
                password: this.state.password
            }

            let result = await postData('/auth/vendor/change/password', postObj);
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState({ result: 'Success: you can now log in', password1: '', password2: '' })
                console.log(result);
            } else {
                this.setState({ err: 'Error!' })
                console.error(result);
            }

        } else {
            this.setState({ err: 'Error: password mismatch' })
        }

    }

    render() {
        const { result, err, password1, password2 } = this.state;
        return (
            <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '500px' }}>
                <form name="changePasswordForm" id="changePasswordForm" onSubmit={this.handleSubmit}>
                    <h5>Change your password</h5>
                    <p className="text-center bg-success text-white" id="changePasswordResult"></p>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={this.handleChange}
                            defaultValue={password1}
                            placeholder="Enter new password"
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password2"
                            className="form-control"
                            defaultValue={password2}
                            onChange={this.handleChange}
                            placeholder="Confirm new password"
                            required />
                    </div>
                    <div className="text-center">
                        <span className="bg-success text-white">{result}</span>
                        <span className="bg-danger text-white">{err}</span>
                        <input
                            type="submit"
                            id="submit-id"
                            className="btn btn-outline-success"
                            value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}