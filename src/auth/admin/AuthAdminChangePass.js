import React from "react";
import { postData } from '../../service'

export default class AuthAdminChangePass extends React.Component {
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

        // test
        console.log(this.props.location.params);
    }

    handleSubmit = async () => {
        const success = <div className="alert alert-success">Successfully changed</div>;
        const status = <div className="alert alert-info">Sending...</div>;
        const failure = <div className="alert alert-danger">Error!</div>;
        const mismatch = <div className="alert alert-danger">Error!: password mismatch </div>;

        if (this.state.password === this.state.password2) {

            const postObj = {
                email: this.emailAddress,
                random_code: this.random_code,
                password: this.state.password
            }
            this.setState({ result: status, err: '' })
            let result;
            if (await this.context.getCsrfToken()) {
                result = await postData('/auth/admin/change/password', postObj);
            }
            if (result.affectedRows === 1 && result.warningCount === 0) {
                this.setState({ result: success, password1: '', password2: '', err: '' })
                console.log(result);
            } else {
                this.setState({ err: failure, result: '' })
                console.error(result);
            }

        } else {
            this.setState({ err: mismatch, result: '' })
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
                            className="form-control border border-primary rounded-pill rounded-sm"
                            onChange={this.handleChange}
                            defaultValue={password1}
                            placeholder="Enter new password"
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password2"
                            className="form-control border border-primary rounded-pill rounded-sm"
                            defaultValue={password2}
                            onChange={this.handleChange}
                            placeholder="Confirm new password"
                            required />
                    </div>
                    <div className="text-center">
                        {result}{err}
                        <input
                            type="submit"
                            id="submit-id"
                            className="btn btn-outline-success rounded-pill rounded-sm"
                            value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}