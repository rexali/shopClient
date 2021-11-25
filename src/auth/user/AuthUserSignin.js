import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { useAuth } from "../../App";
import { appContext } from "../../AppProvider";
import jwt from "jsonwebtoken";

function AuthSignin() {

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();
  let submitRef = useRef();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState(null);
  let [result, setResult] = useState(null);
  let [err, setErr] = useState(null);

  const { setAuthData, setCartData } = React.useContext(appContext);
  
  const success = <div className="alert alert-success">Success</div>;
  const status = <div className="alert alert-info">Sending...</div>;
  const failure = <div className="alert alert-danger">Error!</div>;

  let { from } = location.state || { from: { pathname: "/" } };

  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const getCartData = (uid) => {
    import("axios").then((axios) => {
      axios.post('/cart/read', { user_id: uid }).then(function (response) {
        let result = JSON.parse(JSON.stringify(response.data));
        setCartData([...result]);
      }).catch(function (error) {
        console.log(error);
      });
    });
  }

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
    submitRef.current.value = "Submiting...";
    const loginObj = { email: email, password: password }
    axios.post("/auth/user/login", loginObj).then((res) => {

      let decoded = jwt.verify(res.data.token, 'aqwsderfgtyhjuiklop');
      console.log(decoded);
      if (decoded.result[0].user_id && decoded.result[0].email === email) {

        setResult(success);

        getCartData(decoded.result[0].user_id);

        let authData = {
          user_id: decoded.result[0].user_id,
          email: decoded.result[0].email
        }

        setAuthData(authData);
        setEmail('');
        setPassword('');
        submitRef.current.value = 'Log in';
        setTimeout(()=>login(), 2000)
      }
    }).catch((err) => {
      console.log(err);
      setResult(null)
      setErr(failure);
      submitRef.current.value = 'Log in';
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
            <span><Link to="/user/forget" className="pull-right mb-1">Forget password</Link></span>
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

          <div className="form-group">
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
export default withRouter(AuthSignin);