import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, Badge, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { appContext } from '../AppProvider';


export default function HomeDropdown({ setCartData, cartData }) {
   let [cartCount, setCartCount] = useState([]);
   const { state } = React.useContext(appContext);
   const userId = state.authData?.user_id

   const clearCart = () => {
      axios.post('/cart/delete/all', { user_id: userId })
         .then(function (response) {
            let result = JSON.parse(JSON.stringify(response.data));
            console.log(result.result)
            if (result.affectedRows >= 1 && result.warningCount === 0) {
               setCartData([])
            }
         }).catch(function (error) {
            console.log(error);
         });
   }


   const removeCartItem = (pid) => {

      axios.post('/cart/delete', { user_id: userId, product_id: pid })
         .then(function (response) {
            let result = JSON.parse(JSON.stringify(response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
               let newCartData = cartData.filter((product, _) => {
                  return product.product_id !== pid;
               })
               setCartData(newCartData)
            }
         }).catch(function (error) {
            console.log(error);
         });
   }

   useEffect(() => {
      if (userId) {
         setCartCount(cartData?.length);
      }
   }, [userId, cartData?.length]);

   return (
      <Dropdown className="d-inline" autoClose={false} align="end">
         <Dropdown.Toggle variant="white" id="dropdown-autoclose-false2">
            <sup><Badge pill bg="light" style={{ fontSize: "10px", color: "black" }} id="cartCount">{cartCount}</Badge></sup><i className="fa fa-shopping-cart"></i>
         </Dropdown.Toggle>
         <Dropdown.Menu style={{ width: "200px", overflowX: 'hidden', overflowY: 'scroll', maxHeight: "250px" }} >
            <HomeDropdownItem cartData={cartData} clearCart={clearCart} removeCartItem={removeCartItem} />
            {cartData?.length !== 0 ?
               <Row><Link className="btn btn-outline-success" to="/cart">CHECKOUT</Link><Button variant="outline-dark" size="sm" onClick={clearCart}>CLEAR</Button></Row> : <Row><div className="text-center text-success">Empty cart</div></Row>}
         </Dropdown.Menu>
      </Dropdown>
   );
}

export function HomeDropdownItem({ cartData, removeCartItem }) {
   const getPictures = (pictures) => {
      let productPictures = [];
      productPictures = pictures?.split(';');
      return productPictures.filter((item) => { return item !== "" });
   }

   return cartData.map((item, i) => {
      return (
         <Dropdown.Item key={i}>
            <div className="d-flex justify-content-between">
               <span ><span style={{ maxWidth: "60px" }} className="d-inline-block text-truncate">{item.product_name}</span><span><br />{item.product_price}</span></span>
               <img className="img-fluid w-25 h-25 align-self-center" src={`/uploads/${getPictures(item.product_picture)[0] ? getPictures(item.product_picture)[0] : ''}`} alt={item.product_name ? item.product_name : ''} />
               <button className="btn ml-3" onClick={() => removeCartItem(item.product_id)}>X</button>
            </div>
         </Dropdown.Item>
      );
   })
}
