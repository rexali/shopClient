import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";

function UserProfile(props) {
    let [data, setData] = useState({});

    const { state } = React.useContext(appContext);
    const userId = state.authData?.user_id;


    const handleSubmit = (event) => {
        event.preventDefault();
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

        let nin = form.elements['nin'].value;
        let dob = form.elements['date_of_birth'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['loc_govt'].value;
        let state = form.elements['state'].value;
        let country = form.elements['country'].value;

        let user_document;
        try {
            user_document = document.getElementById('user_document').files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!user_document) {
                user_document = document.getElementById("userDocument").getAttribute("src");
            }
        }


        const profileObj = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            picture: user_picture,
            nin: nin,
            dob: dob,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            document: user_document,
            userId: userId
        };

        console.log(profileObj);

        axios.post("http://localhost:3333/users/user/update", profileObj).then((result) => {
            let resObj = JSON.stringify(result.data);
            let rObj = JSON.parse(resObj);
            console.log(rObj.result);
            if (rObj.result) {
                handlePicture();
                // uploadPicture();
                alert("success");
            }
        }).catch((error) => {
            console.log(error);
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


    // const uploadPicture = () => {
    //     let user_document, user_picture
    //     try {
    //         user_picture = document.getElementById('user_picture').files[0];
    //         user_document = document.getElementById('user_document').files[0];
    //     } catch (error) { console.log(error); }
    //     let formData = new FormData();
    //     formData.append('user_picture', user_picture ? user_picture : '');
    //     formData.append('user_document', user_document ? user_document : '');
    //     let xmlhttp = new XMLHttpRequest();
    //     xmlhttp.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             console.log(this.responseText);
    //         }
    //     };
    //     xmlhttp.responseType = '';
    //     xmlhttp.open("POST", "http://localhost:3333/file/multiplefiles", true);
    //     xmlhttp.send(formData);
    // }

    const handlePicture = () => {
        const form = new FormData();
        form.append(
            "vendorpicture",
            document.getElementById('user_picture').files[0],
            document.getElementById('user_picture').files[0].name
        );
        form.append(
            "vendordocument",
            document.getElementById('user_document').files[0],
            document.getElementById('user_document').files[0].name
        );
        axios.post("http://localhost:3333/file/multiplefiles", form);
    }


    useEffect(() => {
        console.log(userId)
        const getProfileData = (id) => {
            import("axios").then((axios) => {
                axios.post('http://localhost:3333/users/user', { user_id: id }).then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result)
                    setData(result[0]);
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
        getProfileData(userId);
    }, [userId]);

    return (
        <div className="container">
            <form name="userProfileForm" id="userProfileForm" onSubmit={handleSubmit}>
                {"welcome  " + window.sessionStorage.getItem("userId")}
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
                                src={`http://localhost:3333/uploads/${data?.picture ? data?.picture : 'logo512.png'}`}
                                id="userPicture"
                                alt=""
                                className="rounded img-fluid d-block mx-auto"
                            />
                            <input
                                type="file"
                                id="user_picture"
                                name="user_picture"
                                className="form-control"
                                required
                                onChange={showPicture}
                                defaultValue={data?.picture}
                            />
                            <p id="vendorPictureResult" className="bg-success text-white text-center"></p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="vehNIN">National Identity Number.</label>
                            <input
                                type="number"
                                name="nin"
                                className="form-control"
                                required
                                defaultValue={data?.nin} />
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
                                required
                                defaultValue={data?.country}
                            />
                        </div>

                        <div className="form-group">
                            <img
                                src={`http://localhost:3333/uploads/${data?.document ? data?.document : 'logo512.png'}`}
                                id="userDocument"
                                alt={data?.name}
                                className="rounded img-fluid d-block mx-auto"
                            />

                            <label htmlFor="doc">Document</label>
                            <input
                                type="file"
                                id="user_document"
                                name="user_document"
                                className="form-control"
                                onChange={showPicture}
                                defaultValue={data?.document} />
                            <p id="vendorDocumentResult" className="bg-success text-white text-center"></p>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group text-center">
                            <input
                                type="submit"
                                name="submit"
                                value="Update"
                                className="btn btn-primary btn-block"
                            />
                            <p id="adminProfileResultS" className="text-center text-success text-white"></p>
                            <p id="adminProfileResultF" className="text-center text-danger text-white"></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default UserProfile;