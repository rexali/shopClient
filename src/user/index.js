import React from "react";
import Header from "../common/Header";
import HomeFooter from "../home/HomeFooter";
import UserTabs from "./UserTabs";
function User(props) {
    const styles = {
        mainHeight: { minHeight: "550px" }
    }
    return (
        <div>
            <Header title={"User"}  />
            {props.authButton}
            <main style={styles.mainHeight}>
                <UserTabs />
            </main>
            <HomeFooter />
        </div>
    );
}
export default User;