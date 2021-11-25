import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../AppProvider";

export default class VendorFeedback extends React.Component {
    static contextType=appContext;
    state = { data: [] };

    async getFeedbacks() {
        try {
            let response = await axios.post("/review/read",{vendor_id: this.context.state.authData?.vendor_id});
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            this.setState({data:result});
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {

        this.getFeedbacks();
    }

    render() {
        const {data}=this.state;
        return (
            <div className="container">
            <div className="row">
                {data.map((message, i) => {
                    return (
                        <div key={i} className="col-md-4 card shadow-sm">
                            <Link to={'/detail/'+message.product_id} className="text-decoration-none"><i className="fa fa-eye" aria-hidden="true"></i></Link>
                            <p className="text-center">{message.name}</p>
                            <p className="text-center">{message.message}</p>
                            <p className="text-center"><a href={'mailto:'+message.email} className="text-decoration-none">Reply</a></p>
                        </div>
                    )
                })
                }
                {!data.length && <div className="card shadow-none text-center mt-5">No notification found</div>}
            </div>
        </div>
        );
    }
}