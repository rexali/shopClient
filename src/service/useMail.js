import { useState } from "react";
import axios from "axios";

const useMail = async (to, subject, format = 'html', html, text) => {
    let [result, setResult] = useState(null);
    let [err, setErr] = useState(null);

    try {
        let response = axios.post('http://localhost:3333/send/mail', {
            to: to, subject: subject, [format]: html ? html : text,
        });
        let result = await JSON.parse(JSON.stringify(response.d));
        setResult(result);
    } catch (error) {
        console.error(error);
        setErr('Error');
    }

    return [result, err];
}

export default useMail;