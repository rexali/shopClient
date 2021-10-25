import axios from "axios";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import HomeFooter from "../home/HomeFooter";
import HomeHeader from "../home/HomeHeader";

function Register() {
  let history = useHistory();
  let location = useLocation();

  let auth = useAuth();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [result, setResult] = useState('');

  const styles = {
    mainHeight: { minHeight: "550px" }
  };

  let { from } = location.state || { from: { pathname: "/login" } };

  const register = () => {
    auth.signup(() => {
      history.replace(from);
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerObj = { email: username, password: password }

    axios.post("http://localhost:3333/auth/user/register", registerObj).then((res) => {
      console.log(res.data);
      let resObj = JSON.stringify(res.data);
      let rObj = JSON.parse(resObj);
      if (rObj.result) {
        register();
        console.log("user");
        setResult("Registration success. Log in now")
        setUsername('');
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
        <form onSubmit={handleSubmit}>
          <h4 className="text-center text-success">{result}</h4>
          <div className="form-group">
            <label className="label-control">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
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
          <div className="form-group text-center">
            <input type="submit" value="Sign up" id="submit" className="btn btn-sm btn-success" />
            <p className="text-muted">Already have an account?{" "}<Link to="/login">Log in</Link></p>
            <p>You must register to view the page at {from.pathname}</p>
          </div>
          {/* <button onClick={register}>Register</button> */}
        </form>
      </main>
      <HomeFooter />
    </div>
  );
}
export default Register;