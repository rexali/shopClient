import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function Filter({receivedData, handleClose}) {

    let [data, setData] = useState([])
    let [categories, setCategorie] = useState([])
    let [priceRange, setPriceRange] = useState([])

    const resetForm = () => {
        let cat = document.getElementsByName("category");
        cat.forEach((e) => {
            e.checked = false;
        });

        let pr = document.getElementsByName("pricerange");
        pr.forEach((e) => {
            e.checked = false;
        });
        setCategorie([])
        setPriceRange([])
        receivedData(data);
        handleClose();
    }

    const range = (start, end) => {
        let rangeArray = [];
        for (let i = start; i < end; i++) {
            rangeArray.push(i);
        }
        return rangeArray;
    }

    const getPriceRange = event => {
        let ran = Array.from(new Set(priceRange))
        let rangeString = event.target.value;
        let rangeNumber = rangeString.split("-").map(n => parseInt(n));
        setPriceRange([...ran,...range(rangeNumber[0], rangeNumber[1])]);
    }

    const getCategories = ev => {
        let cat = Array.from(new Set(categories))
        setCategorie([...cat, ev.target.value]);
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
        if(categories.length>0 && priceRange>0){
            filteredData = data.filter((product, i) => {
                return categories.includes(product.product_category.toLowerCase()) && priceRange.includes(Math.round(product.product_price));
            })
        } else if(categories.length>0 && priceRange.length===0){
            filteredData = data.filter((product, i) => {
                return categories.includes(product.product_category.toLowerCase());
            })

        } else if (categories.length===0 && priceRange.length>0) {
            filteredData = data.filter((product, i) => {
                return priceRange.includes(Math.round(product.product_price));
            })  
        } else{
            filteredData = data;
        }
        
        console.log(filteredData)
        receivedData(filteredData);
    }

    const fetchData = () => {
        const url = 'http://localhost:3333/products/product/read';
        fetch(
            url,
            {
                mode: 'cors',
                method: 'get'
            }
        ).then((result) => result.json())
            .then((result) => {
                setData(result);
            }).catch((error) => { console.log(error); })
    }

    useEffect(() => {
        fetchData()
    },[])


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
                label="Lower than $20"
                name="pricerange"
                type="radio"
                value="0-20"
                id={`radio-price1`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="$20-$100"
                name="pricerange"
                type="radio"
                value="20-100"
                id={`checkbox-price2`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="$100-$200"
                name="pricerange"
                type="radio"
                value="100-200"
                id={`radio-price3`}
                onChange={(ev) => getPriceRange(ev)}
                className="myCheck"
            />

            <Form.Check
                label="More than $200"
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

function ModalFilter({receivedData}) {
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
                    <Filter receivedData={receivedData} handleClose={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default ModalFilter;