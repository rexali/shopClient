import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
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
            <Footer />
        </div>
    );
}
export default Shipper;