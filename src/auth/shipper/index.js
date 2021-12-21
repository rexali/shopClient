import React from "react";
import Header from "../../common/Header";
import HomeFooter from "../../home/HomeFooter";
import AuthShipperTabs from "./AuthShipperTabs";
import HomeProducts from "../../home/HomeProducts";
import { appContext } from "../../AppProvider";
import { Row } from "react-bootstrap";
function AuthShipper() {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title={"Log in"}  />
            <main style={styles.mainHeight} className="container">
                <AuthShipperTabs />
                <appContext.Consumer>
                {({state})=><Row><HomeProducts products={state.data} /></Row>}
                </appContext.Consumer>
            </main>
            <HomeFooter />
        </div>
    );
}
export default AuthShipper;


