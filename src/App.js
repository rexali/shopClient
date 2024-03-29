import React, {
  createContext,
  useContext,
  useState,
} from 'react';

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
import Shipper from './shipper';
import Admin from './admin';
import User from './user';
import Support from './contact';
import ProductDetail from './detail/ProductDetail';
import AuthUser from './auth/user';
import AuthVendor from './auth/vendor';
import AuthAdmin from './auth/admin';
import AuthShipper from './auth/shipper';
import AuthAdminForgetPass from './auth/admin/AuthAdminForgetPass';
import AuthUserForgetPass from './auth/user/AuthUserForgetPass';
import AuthVendorForgetPass from './auth/vendor/AuthVendorForgetPass';
import AuthVendorChangePass from './auth/vendor/AuthVendorChangePass';
import AuthUserChangePass from './auth/user/AuthUserChangePass';
import AuthAdminChangePass from './auth/admin/AuthAdminChangePass';
import AuthShipperChangePass from './auth/shipper/AuthShipperChangePass';
import { appContext } from './AppProvider';
import About from './about';
import Contact from './contact';
import Blog from './blog';
import PageNotFound from './common/PageNotFound';

export default function App() {

  return (
    <ProvideAuth>
      <Router>
        <div >
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/home">
              <Redirect to="/" />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/blog">
              <Blog />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/support">
              <Support />
            </Route>

            <Route path="/favourite">
              <Favourite />
            </Route>

            <Route path="/auth/user/login">
              <AuthUser />
            </Route>

            <Route path="/log in">
              <Redirect to="/auth/user/login" />
            </Route>

            <Route path="/auth/vendor/login">
              <AuthVendor />
            </Route>

            <Route path="/auth/admin/login">
              <AuthAdmin />
            </Route>

            <Route path="/auth/shipper/login">
              <AuthShipper />
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

            <Route path="/shipper/change">
              <AuthShipperChangePass />
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
              <ProductDetail />
            </Route>

            <Route path="*" >
               <PageNotFound />
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

  const { logOut, setCartData } = React.useContext(appContext)


  const signin = cb => {
    return realAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

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
      render={({ location }) => auth.user ? ( children) : ( 
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
          auth.signout(() => history.push("/home"));
        }}>
        Sign out
      </button>
    </p>
  ) : (
    <p className="mt-4 mr-2 text-info">You're not logged in. <Link to="/auth/user/login" className="btn btn-outline-info  btn-sm text-decoration-none pull-right" >Log in</Link></p>
  );
}



