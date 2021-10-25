import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import { appContext } from "../AppProvider";
import HomeFooter from "../home/HomeFooter";
import HomeHeader from "../home/HomeHeader";


function Login() {
  let history = useHistory();
  let location = useLocation();

  let auth = useAuth();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [userId, setUserId] = useState(0);


  const { setAuthData } = React.useContext(appContext);
  const styles = {
    mainHeight: { minHeight: "550px" }
  };

  let { from } = location.state || { from: { pathname: "/" } };

  const login = () => {
    auth.signin(() => {
      history.replace(from, userId);
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
    const loginObj = { email: email, password: password }
    axios.post("http://localhost:3333/auth/user/login", loginObj).then((res) => {
      console.log(res.data);
      let resObj = JSON.stringify(res.data);
      let result = JSON.parse(resObj);
      if (result[0].user_id && result[0].email === email) {
        setUserId(result[0].user_id);
        window.sessionStorage.setItem('userId', result[0].user_id);
        window.sessionStorage.setItem('email', result[0].email);
        setAuthData({userId:result[0].user_id, email:result[0].email})
        setTimeout(login(), 10000)
        console.log("user authenticated login now ");
        setEmail('');
        setPassword('');
      }
    }).catch((err) => {
      console.log(err);
    })

  }


  return (
    <div>
      <HomeHeader />
      <main className="container d-flex justify-content-center align-items-center" style={styles.mainHeight}>
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
            <input type="submit" value="Log in" id="submit" className="btn btn-sm btn-outline-success" />
            <p className="text-muted">Don't have an account?{" "}<Link to="/register">Sign up</Link></p>
            <p>You must log in to view the page at {from.pathname === "/" ? '/home' : from.pathname}</p>
          </div>
          {/* <button onClick={login}>Log in</button> */}
        </form>

      </main>
      <HomeFooter />
    </div>
  );
}
export default Login;