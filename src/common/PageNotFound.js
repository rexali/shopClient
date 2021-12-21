import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div style={styles.container}>
            <p className="text-center text-success">Page is not found</p>
            <p className="text-center text-success"><Link to="/home" className="text-decoration-none">Go back to homepage</Link></p>
        </div>
    )
}

const styles = {
    container:{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     minHeight:'500px'
    }
}