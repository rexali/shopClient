import React from "react";
import Header from "../../common/Header";
import HomeFooter from "../../home/HomeFooter";
import AuthVendorTabs from "./AuthVendorTabs";
import HomeProducts from "../../home/HomeProducts";
import { appContext } from "../../AppProvider";
import { Row } from "react-bootstrap";
function AuthVendor() {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title={"Log in"}  />
            <main style={styles.mainHeight} className="container">
                <AuthVendorTabs />
                <appContext.Consumer>
                {({state})=><Row><HomeProducts products={state.data} /></Row>}
                </appContext.Consumer>
            </main>
            <HomeFooter />
        </div>
    );
}
export default AuthVendor;