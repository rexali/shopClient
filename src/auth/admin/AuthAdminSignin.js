import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { useAuth } from "../../App";
import { appContext } from "../../AppProvider";
import jwt from "jsonwebtoken";



function AuthAdminSignin() {
  let history = useHistory();
  let location = useLocation();

  let submitRef = useRef();

  let auth = useAuth();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [result, setResult] = useState('');
  let [err, setErr] = useState('');

  const { setAuthData } = React.useContext(appContext);

  let { from } = location.state || { from: { pathname: "/" } };

  
  const success = <div className="alert alert-success">Success</div>;
  const status = <div className="alert alert-info">Sending...</div>;
  const failure = <div className="alert alert-danger">Error!</div>;


  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    setErr(null)
    setResult(null)
    setResult(status)
    submitRef.current.value = 'Submitting...';
    const loginObj = { email: email, password: password }
    axios.post("/auth/admin/login", loginObj).then((res) => {

      let decoded = jwt.verify(res.data.token, 'aqwsderfgtyhjuiklop');

      if (decoded.result[0].admin_id && decoded.result[0].email === email) {
        setResult(success)
        setAuthData({ admin_id: decoded.result[0].admin_id, email: decoded.result[0].email, token: res.data.token })
        setEmail('');
        setPassword('');
        submitRef.current.value = 'Log in';
        setTimeout(()=>login(), 3000)
      }
    }).catch((err) => {
      console.log(err);
      setResult(null)
      setErr(failure)
      submitRef.current.value = 'Log in';
      setTimeout(() => {
      setErr(null) 
      }, 3000);
    })
  }

  return (
    <div>
      <main className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} id="loginForm">
          <div className="form-group">
            <label className="label-control">Username</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              className="form-control"
              defaultValue={email}
              required
              onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="label-control">Password</label>
            <span><Link to="/admin/forget" className="pull-right mb-1 text-muted">Forget password</Link></span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className="form-control"
              defaultValue={password}
              required
              onChange={handleChange} />
          </div>

          <div className="form-group text-center">
            {result}{err}
            <input
              type="submit"
              value="Log in"
              id="submit"
              ref={submitRef}
              className="btn btn-sm btn-outline-success pull-right" /><br />
            <p className="text-muted">Don't have an account?{" "}Sign up</p>
            <p>You must log in to view the page at {from.pathname === "/" ? '/home' : from.pathname}</p>
          </div>
        </form>

      </main>
    </div>
  );
}
export default withRouter(AuthAdminSignin);