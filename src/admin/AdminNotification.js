import axios from "axios";
import React from "react";
import SendNotification from "./SendNotification";

export default class AdminNotification extends React.Component {
    state = { data: [] };

    async getNotifications() {
        try {
            let { data } = await axios.get("/notification/read");
            this.setState({ data: data });
        } catch (error) {
            console.error(error);
        }
    }

    removeNotifaction = async (id) => {
        try {
            let { data } = await axios.post("/notification/delete", { notification_id: id });
            if (data.result) this.getNotifications();
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {

        this.getNotifications();
    }

    render() {

        const { data } = this.state;
        return (
            <div className="container_fluid">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            {data.map((message, i) => {
                                return (
                                    <div key={i} className="col-md-6 card shadow-none">
                                        <p className="text-center">{message.subject}</p>
                                        <p className="text-center">{message.message}</p>
                                        <p className="text-center"><button className="btn btn-outline-danger btn-sm" onClick={() => this.removeNotifaction(message.message_id)}>Delete</button></p>
                                    </div>
                                )
                            })
                            }
                            {!data.length && <div className="card shadow-none text-center mt-5">No notification found</div>}
                        </div>
                    </div>
                    <div className="col">
                        <SendNotification />
                    </div>
                </div>
            </div>
        );
    }
}