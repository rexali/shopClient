import React from "react";
import { appContext } from "../AppProvider";

function HomeMenu({ sendBackData }) {
    let {state} =React.useContext(appContext);
    let data = state.data; 

    const styles = {
        divScrollmenu: {
            overflowX: "auto",
            whiteSpace: "nowrap",
            maxWidth:'1024px'
        },
        scrollmenuA: {
            display: "inline-block",
            color: "black",
            textAlign: "center",
            padding: "7px",
            borderColor: "blue",
            borderStyle: "solid",
            textDecoration: "none",
            margin:'1px',
            width:'100px'
        },
        divScrollmenuAHover: {
            backgroundColor: "green"
        }
    }

    const searchByCategory = async (category) => {
        let result = data.filter((item, _) => {
            return item.product_category.toLowerCase() === category;
        })
        sendBackData(result)
    }

    const category = () => {
        let category = data.map(product => {
            return product.product_category.toLowerCase();
        });
        return category;
    }

    const uniqueCategory = () => {
        return Array.from(new Set([...category()]))
    }
    

    return (
        <div style={styles.divScrollmenu} className="container text-center" id="menu-horizon" >
            {uniqueCategory().map((item, i) => {
                return <a key={i} style={styles.scrollmenuA} className="nav-link text-truncate card" href="#contact" onClick={() => searchByCategory(item)}>{item}</a>
            })}
        </div>
    );
}
export default HomeMenu;