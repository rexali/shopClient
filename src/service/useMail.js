import { useState } from "react";
import axios from "axios";

const useMail = async (to, subject, format = 'html', html, text,name) => {
    let [result, setResult] = useState(null);
    let [err, setErr] = useState(null);

    try {
        let {data} = await axios.post('/support/send/mail', {
            to: to, subject: subject, [format]: html ? html : text,name:name
        });
        setResult(data);
    } catch (error) {
        console.error(error);
        setErr('Error');
    }

    return [result, err];
}

export default useMail;