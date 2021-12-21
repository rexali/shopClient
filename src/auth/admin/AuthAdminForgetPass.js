import React from "react";
import { getData } from "../../service";

export default class AuthAdminForgetPass extends React.Component {
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
        const success = <div className="alert alert-success">Success: check your inbox</div>;
        const status = <div className="alert alert-info">Sending...</div>;
        const failure = <div className="alert alert-danger">Error!</div>;
        this.setState({ result: status, err: '' })

        let result = await getData('/auth/admin/request/password', this.state);
        if (result.affectedRows === 1 && result.warningCount === 0) {
            this.setState({ result: success, email: '', err:'' })
            console.log(result)
        } else {
            this.setState({ err: failure, result:'' })
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
                            className="btn btn-outline-success rounded-pill rounded-sm"
                            value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}