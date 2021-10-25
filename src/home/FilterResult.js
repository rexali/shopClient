import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeProducts from './HomeProducts';
import Pagination from 'react-js-pagination';

export default function FilterResult({ products, updateCart, sendBackData }) {

let [activePage, setActivePage]=useState([1])

    const handlePageChange = (pageNumber)=>{
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber)
        sendBackData([...filterPrev(pageNumber)])
    }

    const filterPrev = (index) => {
        let newData = products.filter((_, i) => {
           return i >= ((index * 6) - 6) && i < (index * 6);
        });
        return newData;
     }

    return (
        <div>
            <HomeProducts products={products} updateCart={updateCart} />
            <div className="d-flex justify-content-center">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={6}
                    totalItemsCount={products.length}
                    pageRangeDisplayed={4}
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}
