import axios from "axios";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";

function TableBody() {
    let [data, setData] = useState([]);
    const { state } = React.useContext(appContext);
    const shipperId = state.authData?.shipper_id;
    const styles = {
        emailFont: { fontSize: 'small' },
        phoneFont: { fontSize: 'small' },
    }

    const readOrders = async (sid) => {
        if (sid) {
            try {
                let { data } = await axios.post("/transaction/read/fs", { shipper_id: sid });
                setData(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        readOrders(shipperId)
    }, [shipperId]);

    return (
        <tbody>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Product</th>
                <th>Price</th>
            </tr>
            {data.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.first_name}{ } {item.last_name}</td>
                        <td style={styles.emailFont}><a href={`mailto:${item.email}`}>{item.email}</a></td>
                        <td style={styles.phoneFont}><a href={`tel:${item.phone ? item.phone : '08065899144'}`}>{item.phone ? item.phone : '08065899144'}</a></td>
                        <td>{item.address} {' ' }{item.loc_govt} { ' '}{item.state}</td>
                        <td>{item.product_name}</td>
                        <td>{item.product_price}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

function ShipperOrder() {
    return <div className="table-responsive">
        <table className="table table-stripped table-sm">
            {<TableBody />}
        </table>
    </div>
}
export default ShipperOrder;
