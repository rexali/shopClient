import React, { 
useState 
} from "react";
import { Offcanvas } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { getPicture } from "../service";


function Sorting({ receivedData, initData }) {

    const ascendingPrice = (params) => {
        let fromLowest = params.sort((a, b) => {
            return a.product_price - b.product_price
        });
        receivedData([...fromLowest]);
    }

    const descendingPrice = (params) => {
        let fromHighest = params.sort((a, b) => {
            return b.product_price - a.product_price;
        });
        receivedData(fromHighest);
    }

    const ascendingName = (params) => {

        let ascendingName_A_Z = params.sort((a, b) => {
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
                return 1;
            }
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
                return -1;
            }
            return 0;
        });
        receivedData(ascendingName_A_Z);
    }

    const descendingName = (params) => {
        let descendingName_Z_A = params.sort((a, b) => {
            if (a.product_name.toLowerCase() > b.product_name.toLowerCase()) {
                return 1;
            }
            if (a.product_name.toLowerCase() < b.product_name.toLowerCase()) {
                return -1;
            }
            return 0;
        });
        descendingName_Z_A = descendingName_Z_A.reverse();
        receivedData(descendingName_Z_A)

    }

    const getSortValue = (evt) => {
        let value = evt.target.value;

        switch (Number(value)) {

            case 1:
                ascendingPrice(initData);
                break;

            case 2:
                descendingPrice(initData)
                break;

            case 3:
                ascendingName(initData)
                break;

            case 4:
                descendingName(initData)
                break;

            default:

                break;
        }

    }

    return (
        <div className="d-flex justify-content-between">
            <select className="d-inline-block" style={{ borderRadius: "3px", borderStyle: "none" }} id="sortProduct" onChange={(evt) => { getSortValue(evt) }}>
                <option>Sort by price or name</option>
                <option value="1">Low - High (price)</option>
                <option value="2">High - Low (price)</option>
                <option value="3">A - Z (Alphabetically)</option>
                <option value="4">Z - A (Alphabetically)</option>
            </select>
        </div>
    );
}

export default function FilterResult({ data, showFilter, ...props }) {
    const [show, setShow] = useState(true);
    // const handleShow = () => { setShow(true); }
    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            showFilter(false);
        }, 2000);
    }

    const styles = {
        catFont: { fontSize: '10px' },
        nameFont: { fontSize: '11px' },
        imageProps: { minWidth: "100px", maxHeight: "100px" },
        mainHeight:{minHeight:'450px'}
    }

    let [initData, setInitData] = useState(data)
    let [totalItemCounts,] = useState(data.length)
    let [pageData, setPageData] = useState({
        data: data,
        activePage: 1
    })

    
    const sortData =(data)=>{
        setPageData({
             data: data,
             activePage: 1
        })
        setInitData(data)
    }

    const filterPrev = (index) => {
        let newData = initData.filter((_, i) => {
            return i >= ((index * 6) - 6) && i < (index * 6);
        });
        return newData;
    }

    const handlePageChange = (pageNumber) => {
        setPageData({
            data: [...filterPrev(pageNumber)],
            activePage: pageNumber,
        })
    }


    return (
        <div>
            {/* <button className='btn btn-sm text-reset' onClick={handleShow}><i className="fa fa-shopping-cart" aria-hidden="true"></i></button> */}
            <Offcanvas show={show} onHide={handleClose} {...props} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <span className="d-inline-block">Result</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="d-inline-block"><Sorting receivedData={sortData} initData={pageData.data} /></span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row" style={styles.mainHeight}>

                        {pageData.data.map((product, i) => {
                            return i < 6 ? (
                                <div key={i} className="col-6 col-md-4" >
                                    <div className="card shadow-none my-1 mx-auto">
                                        <div>
                                            <Link to={
                                                {
                                                    pathname: `/detail/${product.product_id}`,
                                                    state: product
                                                }
                                            }><img variant="top" style={styles.imageProps} className="img-fluid d-block mx-auto" src={`/uploads/${getPicture(product.product_picture)[0] ? getPicture(product.product_picture)[0] : getPicture(product.product_picture)[1]}`} alt={product.product_name ? product.product_name : ''} /></Link>
                                        </div>

                                        <div className="card-body">
                                            <span className="text-muted d-block" style={styles.catFont}>{product.product_category ? product.product_category : ''}</span>
                                            <span className="d-block text-truncate" style={{ width: '100px' }}>
                                                <strong>{product.product_name ? product.product_name : ''}</strong>
                                            </span>
                                            <span className="d-block">
                                                {product.product_currency ? product.product_currency : 'N'}{product.product_price ? product.product_price : 'N'}
                                            </span>
                                        </div>
                                    </div>
                                </div>) : ''

                        })}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={pageData.activePage}
                            itemsCountPerPage={6}
                            totalItemsCount={totalItemCounts}
                            pageRangeDisplayed={4}
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={handlePageChange.bind(this)}
                        />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}