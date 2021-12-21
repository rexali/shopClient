import axios from "axios";


const getJwt = () => {
    axios.get("/jwt").then((response)=>{
   this.setState({ jwt: response.data.jwtoken });
   });
   return true;
}

const getCsrfToken = async () => {
   let {data} = await axios.get('/csrf-token');
   axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;

   return true;
}

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
    return pictures?.filter((item, _) => item !== "");
}

const shareApp = async () => {
    const dataToShare = {
        title: window.location.origin,
        text: 'Check out this shopping website you may like it.',
        url: window.location.origin
    }
    if (navigator.share) {
        try {
            await navigator.share(dataToShare);
        } catch (error) {
            console.warn(error);
        }
    }
}

const shareProduct = async (productId) => {
    const dataToShare = {
        title: window.location.origin,
        text: 'Check out this shopping website you may like it.',
        url: window.location.origin+"/detail/"+productId
    }
    if (navigator.share) {
        try {
            await navigator.share(dataToShare);
        } catch (error) {
            console.warn(error);
        }
    }
}

const MOCK_DATA = [];

export { 
    MOCK_DATA, 
    postData, 
    getData, 
    fetchData, 
    sendMail, 
    readData, 
    getPicture,
    shareApp, 
    shareProduct,
    getCsrfToken,
    getJwt
}