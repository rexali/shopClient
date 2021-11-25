import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import UserTabs from "./UserTabs";
function User(props) {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title={"user"}  />
            {props.authButton}
            <main style={styles.mainHeight}>
                <UserTabs />
            </main>
            <Footer />
        </div>
    );
}
export default User;