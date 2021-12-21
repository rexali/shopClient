import React, { PureComponent } from "react";
import HomeFooter from "../home/HomeFooter";
import Header from "../common/Header";

export default class About extends PureComponent {

    render() {

    const styles = { mainHeight: { minHeight: "550px" }, beAboveS: { zIndex: "2", right: 0 }, };
        return (
            <div>
                <Header title={"About us"} />
                <main  className="container" style={styles.mainHeight}>
                    <h1>Kanimart</h1>
                <p>Kanimart is a digital marketing or ecommerce web platform that tries to bring the sellers or the vendors and the consumers or the buyers together to exchange goods. 
                    Kanimart facilitate this process by making sure that both parties involved are not at any risk.</p>
                <p>How? The buyers' monies are kept saved by kanimart until the sellers or vendors fulfill his/her part of obligations by making sure the goods are delivered safely to the buyers</p>
                <p>When the buyers are satisfied with the goods then the Kanimart which is the party in the transaction will release the money to the vendor or seller involved</p>
                </main>
                <HomeFooter />
            </div>
        )
    }
}