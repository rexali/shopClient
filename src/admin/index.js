import React from "react";
import Header from "../common/Header";
import HomeFooter from "../home/HomeFooter";
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
            <HomeFooter />
        </div>
    );
}
export default Admin;