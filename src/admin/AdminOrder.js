import axios from "axios";
import React, { useEffect, useState } from "react";

function TableBody() {
    let [data, setData] = useState([]);

    const readOrders = async () => {
        try {
            let response = await axios.get("/transaction/read");
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        readOrders()
    }, []);

    return (
        <tbody>
            <tr>
                <th>Buyer name</th>
                <th>Buyer email</th>
                <th>Buyer phone</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Buyer Address</th>
                <th>Seller name</th>
                <th>Seller email</th>
                <th>Seller phone</th>
            </tr>
            {data.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.userfirstname}{" "}{item.userlastname}</td>
                        <td><a className="text-decoration-none" href={`mailto:${item.useremail}`}>{item.useremail}</a></td>
                        <td><a className="text-decoration-none" href={`tel:${item.userphone?item.userphone:'08065899144'}`}>{item.userphone?item.userphone:'08065899144'}</a></td>
                        <td>{item.productname}</td>
                        <td>{item.productprice}</td>
                        <td>{item.useraddress} {" "}{item.userlocgovt} { }{item.userstate}</td>
                        <td>{item.vendorfirstname}{" "}{item.vendorlastname}</td>
                        <td><a className="text-decoration-none" href={`mailto:${item.vendoremail}`}>{item.vendoremail}</a></td>
                        <td><a className="text-decoration-none" href={`tel:${item.vendorphone?item.vendorphone:'07016807004'}`}>{item.vendorphone?item.vendorphone:'07016807004'}</a></td>
                    </tr>
                )
            })}
        </tbody>
    )

}

function AdminOrder() {
    return <div className="table-responsive">
        <table className="table table-stripped table-sm">
            {<TableBody />}
        </table>
    </div>
}
export default AdminOrder;
