import React, { Component } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default class Blog extends Component {
    render() {
    const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };

        return (
            <div>
                <Header title={"Blog"} />
                <main  className="container" style={styles.mainHeight}>
                <iframe 
                title="blog" 
                src="https://mujaware.com" 
                allowFullScreen={true} 
                height="550px"
                 width= "100%" 
                 scrolling="yes"></iframe>
                </main>
                <Footer />
            </div>
        )
    }
}