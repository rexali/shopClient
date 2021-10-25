import React, {useState } from "react";
import SearchResult from "../common/SearchResult";

function HomeSearch() {
    let [displaySearch, setDisplaySearch] = useState(null)

    const handleChange = () => {
        setDisplaySearch(true);
    }

   const  handleSearch =(x)=>{
    setDisplaySearch(x);
    }

    return (
        <div className="container">
            <input
                type="search"
                name="searchProducts"
                id="searchPro"
                placeholder="Search..."
                autoComplete="off"
                value="Search..."
                onChange={() => handleChange()}
                className="searchPro form-control form-control-sm rounded w-100 mb-2  d-md-nonex"
            />
            {displaySearch && <SearchResult placement="end" scroll={true} backdrop={true} setDisplaySearch={handleSearch} />}
        </div>
    );
}
export default HomeSearch;