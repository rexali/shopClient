import axios from "axios";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";

function TableBody() {
    let [data, setData] = useState([]);
    const { state } = React.useContext(appContext);
    const vendorId = state.authData.vendor_id;
    const styles={
        emailFont:{fontSize:'x-small'},
        phoneFont:{fontSize:'x-small'},
}
    

    const readOrders = async (vid) => {
        try {
            let response = await axios.post("/transaction/read/fv", { vendor_id: vid });
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        readOrders(vendorId)
    }, [vendorId]);

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
                        <td>{item.name}</td>
                        <td style={styles.emailFont}><a href={`mailto:${item.email}`}>{item.email}</a></td>
                        <td style={styles.phoneFont}><a href={`tel:${item.phone?item.phone:'08065899144'}`}>{item.phone?item.phone:'08065899144'}</a></td>
                        <td>{item.product_name}</td>
                        <td>{item.product_price}</td>
                        <td>{item.address} {','}{item.loc_govt} {','}{item.state}</td>
                    </tr>
                )
            })}
        </tbody>
    )

}

function UserOrder() {
    return <div className="table-responsive">
        <table className="table table-stripped table-sm">
            {<TableBody />}
        </table>
    </div>
}
export default UserOrder;
