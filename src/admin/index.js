import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import AdminTabs from "./AdminTabs";
function Admin(props) {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title="Admin" />
            <div className="container">{props.authButton}</div>
            <main style={styles.mainHeight}>
                <AdminTabs/>
            </main>
            <Footer />
        </div>
    );
}
export default Admin;