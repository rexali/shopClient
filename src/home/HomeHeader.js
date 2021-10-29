import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import HomeDropdown from "./HomeDropdown";
import HomeDrawer from './HomeDrawer';
import { appContext } from '../AppProvider';
import OverflowMenu from '../common/OverflowMenu';
import { Link } from 'react-router-dom';
// import ShowModal from '../common/ShowModal';

const HomeHeader = ({ sendBackData, cartData }) => {
  const { setCartData } = React.useContext(appContext);
  // const [blog,setBlog]= useState(false)
  // const showBlog = (x)=>{
  //   setBlog(x)
  // }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light">
      <span className="d-md-none"><HomeDrawer sendBackData={sendBackData} placement="start" scroll={true} backdrop={false} /></span>
      <Link to={"/"} className="navbar-brand text-reset text-uppercase" id="brand">Kanimart</Link>
      <span className="d-md-none"><HomeDropdown setCartData={setCartData} cartData={cartData} /></span>
      <span className="d-md-none"><OverflowMenu placement="end" /></span>

      <div className="collapse navbar-collapse" id="navbarCollapse">

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-reset" to={"/about"}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={"/contact"} >Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset" to={"/blog"}>Blog</Link>
            {/* <Link className="nav-link text-reset" to={"https://mujaware.com/blog"} onClick={()=>showBlog(true)}>Blog</Link> */}
          </li>
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
            <Link className="nav-link text-reset" to={'/auth/user'}><i className="fa fa-sign-in mr-1" aria-hidden="false"> Log in</i></Link>
          </li>
        </ul>
      </div>
      {/* {blog&&<ShowModal title='Blog' body='I am the blog. When the blog link is ready let me know' setAbout={setBlog} />} */}

    </nav>
  );
}

export default HomeHeader;
