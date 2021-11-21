import { useState, useEffect } from "react";
const useFetch = (url='', obj={}) => {
    let [data, setData] = useState(null);
    useEffect(() => {
        fetch(url, obj)
            .then((resp) => resp.json())
            .then((data) => setData(data))
            .catch((error)=>console.log(error));

    }, [url, obj]);

    return [data];

};
export default useFetch;