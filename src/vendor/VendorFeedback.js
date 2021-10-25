import axios from "axios";
import React from "react";

export default class VendorFeedback extends React.Component {
    state = { data: [] };

    async getNotifications() {
        try {
            let response = await axios.get("http://localhost:3333/notification/read");
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            this.setState({data:result});
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {

        this.getNotifications();
    }

    render() {
        const {data}=this.state;
        return (
            <div className="container">
            <div className="row">
                {data.map((message, i) => {
                    return (
                        <div key={i} className="col-md-4 card shadow-none">
                            <p className="text-center">{message.subject}</p>
                            <p className="text-center">{message.message}</p>
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