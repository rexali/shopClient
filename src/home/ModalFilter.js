import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { appContext } from "../AppProvider";

export function Filter({receivedData, setFilterData, handleClose}) {
    let {state} =React.useContext(appContext);
    let data = state.data;
    
    let [categories, setCategories] = useState([])
    let [priceRange, setPriceRange] = useState([])
    let [lowerRange, setLowerRange] =useState(0)
    let [higherRange, setHigherRange] =useState(0)


    const resetForm = () => {
        let cat = document.getElementsByName("category");
        cat.forEach((e) => {
            e.checked = false;
        });

        let pr = document.getElementsByName("pricerange");
        pr.forEach((e) => {
            e.checked = false;
        });
        setCategories([])
        setPriceRange([])
        receivedData(data);
        // setFilterData(data);
        handleClose();
    }


    const getPriceRange = event => {
        let rangeString = event.target.value;
        let rangeNumber = rangeString.split("-").map(n => parseInt(n));
        setLowerRange(rangeNumber[0])
        setHigherRange(rangeNumber[1])
        setPriceRange([...rangeNumber]);

    }

    const getCategories = ev => {
        let cat = Array.from(new Set(categories))
        setCategories([...cat, ev.target.value]);
    }

    const category = () => {
        let category = data.map(product => {
            return product.product_category.toLowerCase();
        });
        return category;
    }

    const uniqueCategory = () => {
        return Array.from(new Set([...category()]))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let filteredData
        if(categories.length>0 && priceRange.length>0){
            filteredData = data.filter((product, i) => {
                return categories.includes(product.product_category.toLowerCase()) && (product.product_price>=lowerRange && product.product_price<=higherRange);
            })
        } else if(categories.length>0 && priceRange.length===0){
            filteredData = data.filter((product, i) => {
                return categories.includes(product.product_category.toLowerCase());
            })
        } else if (categories.length===0 && priceRange.length>0) {
            filteredData = data.filter((product, i) => {
                return product.product_price>=lowerRange && product.product_price<=higherRange;
            })  
        } else{
            filteredData = data;
        } 
        console.log(filteredData)
        receivedData(filteredData);
        setFilterData(filteredData);
        handleClose();
    }

    return (
        <Form>
            <Form.Label>Filter by category</Form.Label>

            {uniqueCategory().map((category, i) => (
                <div key={i} className="mb-3">
                    <Form.Check onChange={(ev) => getCategories(ev)}
                        label={category}
                        name="category"
                        type="checkbox"
                        value={category}
                        id={`checkbox-${i}`}
                        className="myCheck"
                    />
                </div>
            ))}
            <hr />
            <Form.Label>Filter by price range</Form.Label>
            <Form.Check
                label="Lower than N20"
                name="pricerange"
                type="radio"
                value="0-20"
                id={`radio-price1`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="N20-N100"
                name="pricerange"
                type="radio"
                value="20-100"
                id={`checkbox-price2`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="N100-N200"
                name="pricerange"
                type="radio"
                value="100-200"
                id={`radio-price3`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="More than N200"
                name="pricerange"
                type="radio"
                value="200-1000000"
                id={`radio-price4`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />
            <div className="d-flex justify-content-between">
                <Button variant="outline-dark" onClick={() => resetForm()}>
                    Reset
                </Button>
                <Button variant="dark" className="mr-4" onClick={(ev) => { handleSubmit(ev) }}>
                    Apply
                </Button>
            </div>
        </Form>
    );
}

function ModalFilter({receivedData, setFilterData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    return (
        <div className="d-lg-none mt-2">
            <Button variant="outline-default" size="sm" onClick={handleShow}>
                <span className="fa fa-sliders text-dark"> Filter</span>
            </Button>
            <Modal 
            size="sm"
            fullscreen={false}
            show={show} 
            onHide={handleClose} 
            backdrop={true} 
            keyboard={false} 
            scrollable={true}
            centered
            aria-labelledby="contained-modal-title-vcenter"
            animation={true}
            dialogClassName="modal-100w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Filter receivedData={receivedData} setFilterData={setFilterData} handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default ModalFilter;