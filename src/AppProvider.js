import React from "react";
import axios from "axios";

export const appContext = React.createContext();

export default class AppProvider extends React.Component {

    state = {
        data: [],
        cartData: [],
        authData: {},
        jwt: ''
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
        this.setAuthData({ authData: {} })
    }

    getJwt = () => {
         axios.get("/jwt").then((response)=>{
        this.setState({ jwt: response.data.jwtoken });
        });
        
      return true;
    }

    getCsrfToken = async () => {
        let {data} = await axios.get('/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;

        return true;
    }

    render() {
        return (
            <appContext.Provider value={
                {
                    state: this.state,
                    setData: this.setData,
                    setCartData: this.setCartData,
                    setAuthData: this.setAuthData,
                    logOut: this.logOut,
                    getJwt:this.getJwt,
                    getCsrfToken: this.getCsrfToken
                }
            }>
                {this.props.children}
            </appContext.Provider>
        );
    }
}
