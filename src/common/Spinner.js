import React from "react";
export default function Spinner() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "550px" }}>
            <div className="spinner-border" role="status" id="waiting">
                <span className="sr-only">Loading....</span>
            </div>
        </div>
    )
}