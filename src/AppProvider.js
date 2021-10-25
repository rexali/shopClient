import React from "react";
import axios from "axios";

export const appContext = React.createContext();

export default class AppProvider extends React.Component {

    state = {
        data: [],
        cartData: [],
        authData: {},
        token:''
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
        let {data} = await axios.get("/jwt");
        this.setState({token:data.token});
        console.log(data.token);
        try {
            let response = await fetch("/products/product/read", {
                mode: 'cors',
                method: 'get'
            });
            this.setState({ data: [...await response.json()] });
            console.log(this.state.data[0]);
        } catch (error) {
            console.warn(error);
        }
    }

    componentDidMount() {
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
