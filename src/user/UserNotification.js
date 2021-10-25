import axios from "axios";
import React,{ useEffect ,useState } from "react";

function UserNotification() {
    let [data, setData] = useState([]);

    const getNotifications = async () => {
        try {
            let response = await axios.get("/notification/read");
            let result = JSON.parse(JSON.stringify(await response.data));
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNotifications()
    }, [])
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
export default UserNotification;
