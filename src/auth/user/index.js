import React from "react";
import Header from "../../common/Header";
import HomeFooter from "../../home/HomeFooter";
import AuthUserTabs from "./AuthUserTabs";
import HomeProducts from "../../home/HomeProducts";
import { appContext } from "../../AppProvider";
import { Row } from "react-bootstrap";
function AuthUser() {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title="Log in"  />
            <main style={styles.mainHeight} className="container">
                <AuthUserTabs />
                <appContext.Consumer>
                {({state})=><Row><HomeProducts products={state.data} /></Row>}
                </appContext.Consumer>
            </main>
            <HomeFooter />
        </div>
    );
}
export default AuthUser;

