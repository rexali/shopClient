import axios from "axios";
import React, { useEffect, useState } from "react";

function TableBody() {
    let [data, setData] = useState([]);

    const readOrders = async () => {
        try {
            let response = await axios.post("http://localhost:3333/transaction/read");
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Price</th>
                <th>Address</th>
            </tr>
            {data.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.userfirstname}</td>
                        <td><a href={`mailto:${item.useremail}`}>{item.useremail}</a></td>
                        <td><a href={`tel:${item.userphone}`}>{item.userphone}</a>a</td>
                        <td>{item.productname}</td>
                        <td>{item.productprice}</td>
                        <td>{item.useraddress} {','}{item.userlocgovt} {','}{item.userstate}</td>
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
