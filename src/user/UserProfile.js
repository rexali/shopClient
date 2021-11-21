import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";

function UserProfile() {
    let [data, setData] = useState({});
    let [result, setResult] = useState(null);
    let [err, setErr] = useState(null);
    const { state } = React.useContext(appContext);
    const userId = state.authData?.user_id;

    const success = <div className="alert alert-success">Success</div>;
    const status = <p className="alert alert-info">Sending...</p>;
    const progress = <p className="alert alert-info">Please wait...</p>;
    const failure = <p className="alert alert-danger">Error!</p>;

    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(status)
        let form = document.getElementById("userProfileForm");
        let firstName = form.elements['first_name'].value;
        let lastName = form.elements['last_name'].value;
        let phone = form.elements['phone'].value;
        let email = form.elements['email'].value;

        let user_picture;
        try {
            user_picture = document.getElementById('user_picture').files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!user_picture) {
                user_picture = document.getElementById("userPicture").getAttribute("src");
            }
        }

        let dob = form.elements['date_of_birth'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['loc_govt'].value;
        let state = form.elements['state'].value;
        let country = form.elements['country'].value;


        const profileObj = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            picture: user_picture,
            dob: dob,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            user_id: userId
        };
        setResult(progress);
        axios.post("/users/user/update", profileObj).then((response) => {
            let result = JSON.parse(JSON.stringify(response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                handlePicture()
                setResult(success)
                setTimeout(() => { setResult(null) }, 4000)
            }
        }).catch((error) => {
            console.log(error);
            setErr(failure)
            setTimeout(() => { setErr(null) }, 4000)
        })
    }

    const showPicture = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("userPicture").setAttribute("src", objUrl);
        document.getElementById("userPicture").setAttribute("width", "100px");
        document.getElementById("userPicture").setAttribute("height", "100px");
        document.getElementById("userPicture").style.display = "block";
        document.getElementById("userPicture").style.margin = "auto";
    }

    const handlePicture = () => {
        const form = new FormData();
        try {
            let pictureFile = document.getElementById('user_picture').files[0];
            let pictureName = pictureFile.name;
            form.append(
                "userpicture",
                pictureFile ? pictureFile : '',
                pictureName ? pictureName : ''
            );
        } catch (error) {
            console.error(error);
        }

        try {
            axios.post("/file/multiplefiles", form);
        } catch (error) {
            console.error(error);
        }
    }

    const getProfileData = (id) => {
        import("axios").then((axios) => {
            axios.post('/users/user', { user_id: id }).then(function (response) {
                let result = JSON.parse(JSON.stringify(response.data));
                setData(result[0]);
            }).catch(function (error) {
                console.log(error);
            });
        });
    }


    useEffect(() => {
        if(userId){
            getProfileData(userId);
        }  
    }, [userId]);

    return (
        <div className="container">
            <form name="userProfileForm" id="userProfileForm" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="fnm">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                required
                                defaultValue={data?.first_name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lnm">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                required
                                defaultValue={data?.last_name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vph">Phone.</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                required
                                defaultValue={data?.phone}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vph">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                defaultValue={data?.email}
                                readOnly
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="psspt">Passport</label>
                            <img
                                src={`/uploads/${data?.picture ? data?.picture : 'logo512.png'}`}
                                id="userPicture"
                                alt=""
                                className="rounded img-fluid d-block mx-auto"
                            />
                            <input
                                type="file"
                                id="user_picture"
                                name="user_picture"
                                className="form-control"
                                onChange={showPicture}
                                defaultValue={data?.picture}
                            />
                            <p id="vendorPictureResult" className="bg-success text-white text-center"></p>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth.</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                className="form-control"
                                required
                                defaultValue={data?.date_of_birth}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                required
                                defaultValue={data?.address}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lgv">Local Government</label>
                            <input
                                type="text"
                                name="loc_govt"
                                className="form-control"
                                required
                                defaultValue={data?.loc_govt}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Ste">State</label>
                            <input
                                type="text"
                                name="state"
                                className="form-control"
                                placeholder="state"
                                required
                                defaultValue={data?.state}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cntry">Country</label>
                            <input
                                type="text"
                                name="country"
                                className="form-control"
                                placeholder="country"
                                required
                                defaultValue={data?.country}
                            />
                        </div>

                    </div>

                    <div className="col-md-12">
                        <div className="form-group text-center">
                            {result}{err}
                            <input
                                type="submit"
                                name="submit"
                                value="Update"
                                className="btn btn-primary btn-block"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default UserProfile;