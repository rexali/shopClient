import { useState, useEffect } from "react";
import axios  from "axios";

const useAxios = (obj={}) => {
let [data, setData] = useState(null);

    useEffect(() => {
        axios(obj)
            .then((resp) => JSON.parse(JSON.stringify(resp.data)))
            .then((data) => setData(data))
            .catch((error)=>console.log(error));
    }, [obj]);

    return [data];
};

export default  useAxios;


