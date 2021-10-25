import axios from "axios";


const sendMail = async (to, subject, name = 'html', html, text) => {
    let response, result;
    try {
        response = await axios.post('http://localhost:3333/send/mail', {
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

const MOCK_DATA = [
    {
        "id": 1,
        "name": "Red Bench",
        "category": "people",
        "price": 10,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel1.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 2,
        "name": "Egg Balloon",
        "category": "people",
        "price": 15,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel2.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 3,
        "name": "Man",
        "category": "people",
        "price": 17,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel3.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 4,
        "name": "Architecture",
        "category": "people",
        "price": 18,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel4.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 5,
        "name": "Red Bench",
        "category": "people",
        "price": 30,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel5.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 6,
        "name": "Egg Balloon",
        "category": "food",
        "price": 40.3,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel6.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 7,
        "name": "Man",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel7.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 8,
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel8.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 9,
        "name": "Red Bench",
        "category": "people",
        "price": 3.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel9.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 10,
        "name": "Egg Balloon",
        "category": "food",
        "price": 93.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel10.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 11,
        "name": "Man",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel11.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 12,
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel12.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 13,
        "name": "Red Bench",
        "category": "people",
        "price": 3.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel13.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 14,
        "name": "Egg Balloon",
        "category": "food",
        "price": 93.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel14.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 15,
        "name": "Man",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel15.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 16,
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel16.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 17,
        "name": "Red Bench",
        "category": "people",
        "price": 200.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel17.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 18,
        "name": "Egg Balloon",
        "category": "food",
        "price": 300.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel18.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 19,
        "name": "Man",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel19.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 20,
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel20.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 21,
        "name": "Red Bench",
        "category": "people",
        "price": 3.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel21.jpg",
            "alt": ""
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "id": 22,
        "name": "Egg Balloon",
        "category": "food",
        "price": 93.89,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel22.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 23,
        "name": "Man",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel23.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 24,
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": {
            "src": "pexels/pexel24.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "id": 25,
        "name": "Samurai king Restling",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "image": {
            "src": "pexels/pexel25.jpg",
            "alt": ""
        },
        "bestseller": false,
        "featured": true,
        "details": {
            "dimensions": {
                "width": 1020,
                "height": 1020
            },
            "size": 15000,
            "description": "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely",
            "recommendations": [
                {
                    "src": "pexels/pexel11.jpg",
                    "alt": ""
                },
                {
                    "src": "pexels/pexel2.jpg",
                    "alt": ""
                },
                {
                    "src": "pexels/pexel3.jpg",
                    "alt": ""
                }
            ]
        }
    }
];

export { MOCK_DATA, postData, getData, fetchData, sendMail, readData }