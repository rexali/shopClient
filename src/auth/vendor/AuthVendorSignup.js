import axios from "axios";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../App";

function AuthVendorSignup() {
  let history = useHistory();
  let location = useLocation();
  let submitRef = useRef();

  let auth = useAuth();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  let [result, setResult] = useState('');
  let [err, setErr] = useState('');


  const success = <div className="alert alert-success">Success</div>;
  const status = <div className="alert alert-info">Sending...</div>;
  const failure = <div className="alert alert-danger">Error!</div>;


  let { from } = location.state || { from: { pathname: "/auth/vendor/login" } };

  const register = () => {
    auth.signup(() => {
      history.replace(from);
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'confirm_password') {
      setConfirmPassword(value);
    } else {
      setPassword(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      submitRef.current.value = 'Submitting...';
      setErr(null)
      setResult(null)
      setResult(status)
      const registerObj = { email: username, password: password }
      axios.post("/auth/vendor/register", registerObj).then((res) => {
        console.log(res.data);
        let result = JSON.parse(JSON.stringify(res.data));
        if (result.affectedRows === 1 && result.warningCount === 0) {
          setResult(success)
          setUsername('');
          setPassword('');
          submitRef.current.value = 'Sign up';
          setTimeout(() => register(), 2000)
        }
      }).catch((err) => {
        console.log(err);
        setResult(null)
        setErr(failure);
        submitRef.current.value = 'Sign up';
        setTimeout(() => { setErr(null) }, 4000)
      })
    } else {
      setResult("Password did not match");
    }
  }


  return (
    <div>
      <main className="container d-flex justify-content-center align-items-center" >
        <form onSubmit={handleSubmit}>
          <h4 className="text-center text-success">{result}</h4>
          <div className="form-group">
            <label className="label-control">Username</label>
            <input
              type="text"
              name="username"
              placeholder="email"
              id="username"
              className="form-control"
              value={username}
              required
              onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="label-control">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className="form-control"
              value={password}
              required
              onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="label-control">Confirm password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              id="confirm_password"
              className="form-control"
              value={confirmPassword}
              required
              onChange={handleChange} />
          </div>
          <div className="form-group text-center">
            {result}{err}
            <input
              type="submit"
              value="Sign up"
              id="submit"
              ref={submitRef}
              className="btn btn-sm btn-success" />
            {/* <p className="text-muted">Already have an account?{" "}<Link to="/login">Log in</Link></p> */}
            <p>You must register to view the page at {from.pathname}</p>
          </div>
        </form>
      </main>
    </div>
  );
}
export default AuthVendorSignup;