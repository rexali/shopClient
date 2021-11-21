import React, { useState } from "react";
import axios from "axios";
import { Offcanvas } from "react-bootstrap";
import HomeProducts from "../home/HomeProducts";

export default function SearchResult({setDisplaySearch,...props }) {
    let [data, setData] = useState([])
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false); 
        setDisplaySearch(false)
    }

    const handleChange = (event) => {
        var inputVal = event.target.value;
        if (inputVal.length) {
            axios.post("/products/product/search", { search: inputVal }).then((response) => {
                let result = JSON.parse(JSON.stringify(response.data));
                setData(result);
            }).catch(error => { console.warn(error); }).finally(()=>{});
        }
    }
    
    return (
        <div className="d-md-non">
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="container">
                        <input
                            type="search"
                            name="searchProducts"
                            id="searchPro"
                            autoComplete='off'
                            autoFocus={false}
                            placeholder="Enter your search term here"
                            onChange={(ev) => handleChange(ev)}
                            className="searchPro form-control form-control-sm rounded w-100 mb-2  d-md-nonex"
                        />
                    </div>
                    {data.length?<div className="row"><HomeProducts products = {data} /></div>:<div className="text-center mt-5">No match found</div>}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}