import axios from "axios";
import React from "react";
import SendMessage from "./SendMessage";

export default class AdminMessage extends React.Component {
    state = { data: [] };

    getMessages = async () => {
        try {
            let { data } = await axios.get("/support/message/read");
            this.setState({ data: data });
        } catch (error) {
            console.error(error);
        }
    }

    removeMessage = async (id) => {
        try {
            let { data } = await axios.get("/support/message/delete/"+id);
            console.log(data)
            if (data.affectedRows === 1 && data.warningCount === 0) this.getMessages();
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getMessages();
    }

    render() {
        const { data } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            {data.map((message, i) => {
                                return (
                                    <div key={i} className="col-md-6 card shadow-none">
                                        <p className="text-center"><a href={`mailto:${message.email}`} className="text-decoration-none" >{message.email}</a></p>
                                        <p className="text-center">{message.subject}</p>
                                        <p className="text-center">{message.message}</p>
                                        <p className="text-center"><button className="btn btn-outline-danger btn-sm" onClick={() => this.removeMessage(message.message_id)}>Delete</button></p>
                                    </div>
                                )
                            })
                            }
                            {!data.length && <div className="card shadow-none text-center mt-5">No notification found</div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <SendMessage />
                    </div>
                </div>
            </div>
        );
    }
}