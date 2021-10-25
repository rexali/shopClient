import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import AdminTabs from "./AdminTabs";
function Admin(props) {
    const styles = {
        mainHeight: { height: "800px" }
    }
    return (
        <div>
            <Header title="Admin" />
            {props.authButton}
            <main style={styles.mainHeight}>
                <AdminTabs/>
            </main>
            <Footer />
        </div>
    );
}
export default Admin;