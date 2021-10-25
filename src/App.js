import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link,
} from "react-router-dom";
import Detail from "./detail";
import Home from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App';
import Vendor from './vendor';
import Favourite from './favourite';
import Cart from './cart';
import Login from './auth/Login';
import Register from './auth/Register';
import Shipper from './shipper';
import Admin from './admin';
import User from './user';
import Support from './contact';
import DetailProduct from './detail/DetailProduct';
import AuthUser from './auth/user';
import AuthVendor from './auth/vendor';
import AuthAdmin from './auth/admin';
import AuthAdminForgetPass from './auth/admin/AuthAdminForgetPass';
import AuthUserForgetPass from './auth/user/AuthUserForgetPass';
import AuthVendorForgetPass from './auth/vendor/AuthVendorForgetPass';
import AuthVendorChangePass from './auth/vendor/AuthVendorChangePass';
import AuthUserChangePass from './auth/user/AuthUserChangePass';
import AuthAdminChangePass from './auth/admin/AuthAdminChangePass';
import { appContext } from './AppProvider';
import axios from 'axios';
import About from './about';
import Contact from './contact';

export default function App() {
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/csrf-token');
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    }
    getCsrfToken();
  }, [])

  return (
    <ProvideAuth>
      <Router>
        <div >
          <Switch>
            <Route path="/home" component={Home} ></Route>

            <PrivateRoute path="/favourite">
              <Favourite />
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/auth/user">
              <AuthUser />
            </Route>

            <Route path="/auth/vendor">
              <AuthVendor />
            </Route>

            <Route path="/auth/admin">
              <AuthAdmin />
            </Route>

            <Route path="/admin/forget">
              <AuthAdminForgetPass />
            </Route>

            <Route path="/user/forget">
              <AuthUserForgetPass />
            </Route>

            <Route path="/vendor/forget">
              <AuthVendorForgetPass />
            </Route>

            <Route path="/vendor/change">
              <AuthVendorChangePass />
            </Route>

            <Route path="/user/change">
              <AuthUserChangePass />
            </Route>

            <Route path="/admin/change">
              <AuthAdminChangePass />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/support">
              <Support />
            </Route>

            <PrivateRoute path="/vendor" pathname={'/auth/vendor/login'}>
              <Vendor authButton={<AuthButton />} />
            </PrivateRoute>

            <PrivateRoute path="/shipper" pathname={'/auth/shipper/login'}>
              <Shipper authButton={<AuthButton />} />
            </PrivateRoute>

            <PrivateRoute path="/admin" pathname={'/auth/admin/login'}>
              <Admin authButton={<AuthButton />} />
            </PrivateRoute>

            <PrivateRoute path="/user" pathname={'/auth/user/login'}>
              <User authButton={<AuthButton />} />
            </PrivateRoute>

            <Route path="/detail/:id">
              <Detail />
            </Route>

            <Route path="/product/:id">
              <DetailProduct />
            </Route>

            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

const realAuth = {
  isAuthenticated: false,
  signin(cb) {
    realAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    realAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
  signup(cb) {
    realAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function useProvideAuth() {

  const [user, setUser] = useState(null);

  const signin = cb => {
    return realAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const { logOut, setCartData } = React.useContext(appContext)

  const signout = cb => {
    return realAuth.signout(() => {
      setUser(null);
      logOut();
      setCartData([]);
      cb();
    });
  };

  const signup = cb => {
    return realAuth.signup(() => {
      setUser(null);
      cb();
    });

  };

  return {
    user,
    signin,
    signout,
    signup,
    setUser
  };
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: rest.pathname, // "/auth/user/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export function AuthButton() {
  const { logOut, setCartData } = React.useContext(appContext)

  let history = useHistory();
  let auth = useAuth();
  return auth.user ? (
    <p className="mt-4 ml-2">
      <span className="alert-success ml-2">Welcome!</span>{" "}
      <button className="btn btn-outline-success btn-sm pull-right mr-2"
        onClick={() => {
          logOut();
          setCartData([]);
          auth.signout(() => history.push("/"));
        }}>
        Sign out
      </button>
    </p>
  ) : (
    <p className="mt-4 mr-2 text-info">You're not logged in. <Link to="/auth/user/login" className="btn btn-outline-info  btn-sm text-decoration-none pull-right" >Log in</Link></p>
  );
}



