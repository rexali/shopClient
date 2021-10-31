import React from "react";
import axios from "axios";

export const appContext = React.createContext();

export default class AppProvider extends React.Component {

    state = {
        data: [],
        cartData: [],
        authData: {},
        jwt:''
    }

    setData = (x) => {
        this.setState({ data: x })
    }

    setCartData = (x) => {
        this.setState({ cartData: x })
    }

    setAuthData = (x) => {
        this.setState({ authData: x })
    }

    logOut = () => {
       this.setAuthData({authData:{}})
    }
    getData = async () => {
        try {
            let response = await fetch("/products/product/read", {
                mode: 'cors',
                method: 'get'
            });
            this.setState({ data: [...await response.json()]});
        } catch (error) {
            console.warn(error);
        }
    }

    async componentDidMount() {
        
        const getJwt=async()=>{
            let {data} = await axios.get("/jwt");
            this.setState({jwt:data.jwtoken});
        }
        
        const getCsrfToken = async () => {
            const { data } = await axios.get('/csrf-token');
            axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
          }
        
        getJwt();
        getCsrfToken();
        this.getData();
    }

    render() {
        return (
            <appContext.Provider value={
                {
                    state: this.state,
                    setData: this.setData,
                    setCartData: this.setCartData,
                    setAuthData: this.setAuthData,
                    logOut: this.logOut
                }
            }>
                {this.props.children}
            </appContext.Provider>
        );
    }
}
