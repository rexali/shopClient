import React, { Component } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default class About extends Component {
    render() {
    const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };

        return (
            <div>
                <Header title={"About us"} />
                <main  className="container" style={styles.mainHeight}>
                <p>I am the about</p>
                </main>
                <Footer />
            </div>
        )
    }
}