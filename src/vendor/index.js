import React from "react";
import Header from "../common/Header";
import HomeFooter from "../home/HomeFooter";
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
            <HomeFooter />
        </div>
    );
}
export default Vendor;