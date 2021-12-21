import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPromotion() {
    let [data, setData] = useState([]);

    const readPromotions = async () => {
        try {
            const { data } = await axios.get("/promotion/read");
            console.log(data);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        readPromotions()
    }, []);

    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table table-stripped table-sm">
                    <tbody>
                        <tr>
                            <th>Seller</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Channel</th>
                            <th>Charge</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                        {data.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.first_name}{" "}{item.last_name}</td>
                                    <td><a className="text-decoration-none" href={`mailto:${item.email}`}>{item.email}</a></td>
                                    <td><a className="text-decoration-none" href={`tel:${item.phone ? item.phone : '08065899144'}`}>{item.phone ? item.phone : '08065899144'}</a></td>
                                    <td>{item.channel}</td>
                                    <td>{item.charge}</td>
                                    <td>{item.message}</td>
                                    <td><Link to={`/product/${item.product_id}`} className="btn btn-outline-success text-decoration-none"><span className="fa fa-eye"></span></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
