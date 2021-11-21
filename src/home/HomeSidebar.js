import React from "react";
import {Filter} from "./ModalFilter";

function HomeSidebar ({receivedData, setFilterData}){
    const handleClose = () => {};
return <Filter receivedData={receivedData} setFilterData={setFilterData} handleClose={handleClose}/>
}
export default HomeSidebar;