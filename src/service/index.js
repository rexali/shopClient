import axios from "axios";

const sendMail = async (to, subject, name = 'html', html, text) => {
    let response, result;
    try {
        response = await axios.post('/send/mail', {
            to: to, subject: subject, [name]: html ? html : text,
        });
        result = await JSON.parse(JSON.stringify(response.data));
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const postData = async (url, obj) => {
    try {
        let {data} = await axios.post(url, obj);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getData = async (url, obj) => {
    try {
        let {data} = await axios.get(url, obj);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const fetchData = async (url, obj = {}) => {
    let promise = new Promise((resolve, reject) => {
        import("axios").then((axios) => {
            axios.get(url, obj).then(function (response) {
                resolve(JSON.parse(JSON.stringify(response.data)));
            }).catch(function (error) {
                console.log(error);
                reject("Error");
            });
        });
    });
    return await promise;
}

const readData = async (url, obj = {}) => {
    let response, result = [];
    try {
        response = await fetch(url, { mode: 'cors', method: 'get', body: obj });
        result = await response.json();
        return result;
    } catch (error) {
        console.warn(error);
    }
}

const getPicture = (pic) => {
    let pictures = pic?.split(";");
    return pictures?.filter(((item, _) => item !== ""));
}

const MOCK_DATA = [];

export { MOCK_DATA, postData, getData, fetchData, sendMail, readData, getPicture }