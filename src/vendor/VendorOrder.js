import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { appContext } from "../AppProvider";

function TableBody() {
    
    let [data, setData] = useState([]);
    const { state } = React.useContext(appContext);
    const vendorId = state.authData?.vendor_id;
    const styles = {
        emailFont: { fontSize: 'small' },
        phoneFont: { fontSize: 'small' },
    }

    const readOrders = async (vid) => {
        if (vid) {
            try {
                let { data } = await axios.post("/transaction/read/fv", { vendor_id: vid });
                setData(data);
            } catch (error) {
                console.error(error);
            }
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
                <th>Address</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            {data.map((item, i) => {
                return (
                    <tr key={i}>
                        <td>{item.first_name}{ } {item.last_name}</td>
                        <td style={styles.emailFont}><a href={`mailto:${item.email}`}>{item.email}</a></td>
                        <td style={styles.phoneFont}><a href={`tel:${item.phone ? item.phone : '08065899144'}`}>{item.phone ? item.phone : '08065899144'}</a></td>
                        <td>{item.address} {','}{item.loc_govt} {','}{item.state}</td>
                        <td>{item.product_name}</td>
                        <td>{item.product_price}</td>
                        <td><Link to={'/detail/'+item.product_id}><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
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
