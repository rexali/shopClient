import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import VendorTabs from "./VendorTabs";
function Vendor(props) {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title={"Vendor"} />
            {props.authButton}
            <main style={styles.mainHeight}>
                <VendorTabs />
            </main>
            <Footer />
        </div>
    );
}
export default Vendor;