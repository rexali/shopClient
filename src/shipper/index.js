import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import ShipperTabs from "./ShipperTabs";
function Shipper(props) {
    const styles = {
        mainHeight: { height: "800px" }
    }
    return (
        <div>
            <Header />
            {props.authButton}
            <main style={styles.mainHeight}>
                <ShipperTabs />
            </main>
            <Footer />
        </div>
    );
}
export default Shipper;