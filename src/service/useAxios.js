import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (obj = {}) => {
    let [axiosData, setAxiosData] = useState(null);

    useEffect(() => {
        axios(obj)
            .then((resp) => JSON.parse(JSON.stringify(resp.data)))
            .then((data) => setAxiosData(data))
            .catch((error) => console.log(error));
    }, [obj]);

    return [axiosData];
};

export default useAxios;


