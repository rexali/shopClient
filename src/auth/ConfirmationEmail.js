import React, { useContext, useEffect, useState, useRef } from "react";
import { postData } from "../service";
import { appContext } from "../AppProvider";


export default function ConfirmationEmail() {

    const params = new URLSearchParams(window.location.search);
    const random_code = params.get('random_code');
    const emailAddress = params.get('emailAddress');

    const [res, setRes] = useState(null)
    const [err, setErr] = useState(null)

    const { getCsrfToken } = useContext(appContext)

    const confirmationObj = {
        email: emailAddress,
        random_code: random_code,
    }

    const success = <div className="alert alert-success text-center">Email confirmation successful</div>;
    const error = <div className="alert alert-danger text-center">Email Confirmation Error!</div>;

    const isMounted =  useRef(true);

    const getConfirmation = async () => {
        let result;
        if (await getCsrfToken()) {
            result = await postData('/auth/user/confirmation', confirmationObj);
            if (result.result) {
                setRes(success)
                console.log(result);
                setTimeout(() => {
                    setRes(null)
                }, 4000);
            } else {
                setErr(error)
                console.error(result);
                setTimeout(() => {
                    setErr(null)
                }, 4000);
            }
        }
    }

    useEffect(() => {
        if (isMounted.current) {
          if(random_code) getConfirmation();
        }
        return () => {
            isMounted.current = false;
        }
    })

    return (
        <div className="container">
            {res}{err}
        </div>
    )
}