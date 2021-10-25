import React from "react";
import VendorHeader from "./VendorHeader";
import VendorFooter from "./VendorFooter";
import VendorTabs from "./VendorTabs";
function Vendor(props) {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <VendorHeader />
            {props.authButton}
            <main style={styles.mainHeight}>
                <VendorTabs />
            </main>
            <VendorFooter />
        </div>
    );
}
export default Vendor;