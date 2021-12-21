import React from "react";
import Header from "../common/Header";
import HomeFooter from "../home/HomeFooter";
import ShipperTabs from "./ShipperTabs";
function Shipper(props) {
    const styles = {
        mainHeight: { minHeight: "600px" }
    }
    return (
        <div>
            <Header title="Shipper" />
            <div className="container">{props.authButton}</div>
            <main style={styles.mainHeight}>
                <ShipperTabs />
            </main>
            <HomeFooter />
        </div>
    );
}
export default Shipper;