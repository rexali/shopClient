import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import HomeDropdown from "./HomeDropdown";
import HomeDrawer from './HomeDrawer';
import { appContext } from '../AppProvider';
import OverflowMenu from '../common/OverflowMenu';
import CartResult from '../common/CartResult';
import { Link } from 'react-router-dom';

const HomeHeader = ({ sendBackData, cartData }) => {
  const { setCartData } = React.useContext(appContext);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light">
      <span className="d-md-none"><HomeDrawer sendBackData={sendBackData} placement="start" scroll={true} backdrop={false} /></span>
      <Link to={"/"} className="navbar-brand text-reset text-uppercase" id="brand">Kanimart</Link>
      <span className="d-md-none"><CartResult setCartData={setCartData} cartData={cartData} placement="end" /> </span>
      <span className="d-md-none"><OverflowMenu placement="end" /></span>

      <div className="collapse navbar-collapse" id="navbarCollapse">

        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link className="nav-link text-reset" to={"/about"}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={"/contact"} >Contact</Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-reset"
              href="https://mujaware.com/blog"
              target="_blank"
              rel="noopener noreferrer"
            >Blog</a>
          </li> */}
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <HomeDropdown setCartData={setCartData} cartData={cartData} />
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={'/user'}><i className="fa fa-user mr-1" aria-hidden="true"> Account</i></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={'/favourite'}><i className="fa fa-heart mr-1" aria-hidden="true"> Wish</i></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={'/auth/user/login'}><i className="fa fa-sign-in mr-1" aria-hidden="false"> Log in</i></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HomeHeader;
