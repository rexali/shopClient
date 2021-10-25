import React, { useEffect, useState } from "react";
import { Offcanvas } from 'react-bootstrap';
// import { AuthButton } from "../App";

function DrawerContent({ sendBackData, handleClose }) {
    let [data, setData] = useState([]);

    const getUniqueCategories = () => {
        let result = []
        let finalResult = [];
        data.forEach(element => {
            result.push(element.product_category);
        });
        finalResult = Array.of(...new Set(result));
        return finalResult
    }


    const getUniqueSubCategories = (x) => {
        let result = [];
        let finalResult = [];
        data.forEach(element => {
            if (element.product_category === getUniqueCategories()[x]) {
                result.push(element.product_sub_category);
            }
        });
        finalResult = Array.of(...new Set(result));
        return finalResult;
    }

    const allSearch = () => {
        handleClose();
        sendBackData(data);
    }

    const categorySearch = (value) => {
        handleClose();
        let result = data.filter((item, _) => {
            return item.product_sub_category === value;
        })
        sendBackData(result);

    }


    useEffect(() => {
        const getData = () => {
            import("axios").then((axios) => {
                axios.get('http://localhost:3333/products/product/read').then(function (response) {
                    let loadData = JSON.stringify(response.data);
                    let result = JSON.parse(loadData);
                    setData(result);
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
        getData();
    }, []);




    return (
        <div style={{overflowY: 'auto', maxHeight: "550px" }}>
            <div className='card w-100'><button className='btn btn-link bg-light text-decoration-none' onClick={allSearch}>All</button></div>
            <div id='accordion'>
                {getUniqueCategories().map((e, i) => {
                    return (
                        // card start
                        <div className='card' key={i}>
                            <div className='card-header' id={`heading${i}`}>
                                <h5 className='mb-0'>
                                    {i === 0 ?
                                        <button className='btn btn-link text-decoration-none w-100 text-capitalize' data-toggle='collapse' data-target={`#collapse${i}`} aria-expanded='true' aria-controls={`collapse${i}`} >{e}</button>
                                        :
                                        <button className='btn btn-link w-100 text-decoration-none  collapsed  text-capitalize' data-toggle='collapse' data-target={`#collapse${i}`} aria-expanded='true' aria-controls={`collapse${i}`} >{e}</button>
                                    }
                                </h5>
                            </div>
                            {i === 0 ?
                                <div id={`collapse${i}`} className='collapse' aria-labelledby={`heading${i}`} data-parent='#accordion'>
                                    {getUniqueSubCategories(i).map((e, x) => {
                                        return <span key={x} className='card-body w-100' id={`bodyHtml${i}`}><a href="#none" className='btn btn-link text-info' onClick={() => categorySearch(e)}>{e}</a><br /></span>
                                    })}
                                </div>
                                :
                                <div id={`collapse${i}`} className='collapse' aria-labelledby={`heading${i}`} data-parent='#accordion'>
                                    {getUniqueSubCategories(i).map((e, x) => {
                                        return <span key={x} className='card-body w-100' id={`bodyHtml${i}`}><a href="#none" className='btn btn-link text-info' onClick={() => categorySearch(e)}>{e}</a><br /></span>
                                    })}
                                </div>
                            }

                        </div>
                        // card end
                    );
                })}
            </div>
        </div>
    );
}


function HomeDrawer({ sendBackData, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <button className='btn btn-sm text-reset' onClick={handleShow}><span className="fa fa-bars"></span></button>
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <AuthButton /> */}
                    <DrawerContent sendBackData={sendBackData} handleClose={handleClose} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default HomeDrawer;