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
      setResult("");
      const registerObj = { email: username, password: password }
      axios.post("http://localhost:3333/auth/vendor/register", registerObj).then((res) => {
        console.log(res.data);
        let result = JSON.parse(JSON.stringify(res.data));
        if (result.affectedRows===1 && result.warningCount===0) {
          setResult("Registration success")
          setUsername('');
          setPassword('');
          submitRef.current.value = 'Sign up';
          register();
        }
      }).catch((err) => {
        console.log(err);
        setErr("Error!");
        submitRef.current.value = 'Sign up';
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
            <span className="bg-success text-white d-block mb-1 rounded">{result}</span>
            <span className="bg-danger text-white d-block mb-1 rounded">{err}</span>
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