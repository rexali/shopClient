import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { appContext } from "../AppProvider";

function HomeSorting({ receivedData }) {
    let {state} =React.useContext(appContext);
    let data = state.data; 

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
                ascendingPrice(data);
                break;

            case 2:
                descendingPrice(data)
                break;

            case 3:
                ascendingName(data)
                break;

            case 4:
                descendingName(data)
                break;

            default:

                break;
        }

    }

    return (
        <div className="d-flex justify-content-between d-none d-lg-block">
            <i className="fa fa-sort" aria-hidden="true"> Sort By</i>
            <select className="mt-2 mr-4 d-inline-block" style={{ borderRadius: "6px", borderStyle: "none" }} id="sortProduct" onChange={(evt) => { getSortValue(evt) }}>
                <option>Price</option>
                <option value="1">ASC</option>
                <option value="2">DESC</option>
                <option value="3">A-Z</option>
                <option value="4">Z-A</option>
            </select>
        </div>
    );
}

export default HomeSorting;