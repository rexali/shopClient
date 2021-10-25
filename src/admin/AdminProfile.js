import React, { useEffect, useState } from "react";
import axios from "axios";
import { appContext } from "../AppProvider";
function AdminProfile(props) {
    let [data, setData] = useState({});
    const { state } = React.useContext(appContext);
    const adminId = state.authData?.admin_id;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = document.getElementById("adminProfileForm");
        let firstName = form.elements['firstName'].value;
        let lastName = form.elements['lastName'].value;
        let phone = form.elements['phone'].value;
        let email = form.elements['email'].value;

        let admin_picture;
        try {
            admin_picture = document.getElementById('admin_picture')[0].files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!admin_picture) {
               admin_picture= document.getElementById("adminPicture").getAttribute("src").split('/')[1];
            }
        }

        let nin = form.elements['nin'].value;
        let dob = form.elements['dob'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['localGovt'].value;
        let state = form.elements['state'].value;
        let country = form.elements['country'].value;

        let admin_document;
        try {
            admin_document = document.getElementById('admin_document')[0].files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!admin_document) {
                admin_document = document.getElementById("adminDocument").getAttribute("src").split('/')[1];
            }
        }


        const profileObj = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            picture: admin_picture,
            nin: nin,
            dob: dob,
            address: address,
            localGovt: localGovt,
            state: state,
            country: country,
            document: admin_document
        };

        console.log(profileObj);

        axios.post("http://localhost:3333/users/admin/update", profileObj).then((result) => {
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
        
        uploadPicture();
    }

    const handlePicture = () => {
        const form = new FormData();
        form.append(
            "adminpicture",
            document.getElementById('admin_picture').files[0],
            document.getElementById('admin_picture').files[0].name
        );
        form.append(
            "admindocument",
            document.getElementById('admin_document').files[0],
            document.getElementById('admin_document').files[0].name
        );
        axios.post("http://localhost:3333/file/multiplefiles", form);
    }

    const showPicture = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("adminPicture").setAttribute("src", objUrl);
        document.getElementById("adminPicture").setAttribute("width", "100px");
        document.getElementById("adminPicture").setAttribute("height", "100px");
        document.getElementById("adminPicture").style.display = "block";
        document.getElementById("adminPicture").style.margin = "auto";
    }


    const uploadPicture = () => {
        let admin_picture = document.getElementById('admin_picture')[0].files[0];
        let picObj;
        let formData = new FormData();
        formData.append('admin_picture', admin_picture?admin_picture:'');
        document.getElementById("#pictureResult").innerHTML = "Checking data...";
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                picObj = JSON.parse(this.responseText);
                document.getElementById("pictureResult").html(picObj.result);
            }
        };
        xmlhttp.responseType = '';
        xmlhttp.open("POST", "/filetoupload", true);
        xmlhttp.send(formData);
    }


    useEffect(() => {
        const getProfileData = (aid) => {
            import("axios").then((axios) => {
                axios.post('http://localhost:3333/users/admin', { admin_id: aid }).then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    console.log(result)
                    setData(result[0]);
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
        getProfileData(adminId);
    }, [adminId]);

    return (
        <form name="adminProfileForm" id="adminProfileForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fnm">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    required
                    defaultValue={data?.firstName}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lnm">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    required
                    defaultValue={data?.lastName}
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
                    id="adminPicture"
                    alt=""
                    className="rounded img-fluid d-block mx-auto"
                />
                <input
                    type="file"
                    id="admin_picture"
                    name="admin_picture"
                    className="form-control"
                    required
                    onChange={showPicture}
                    defaultValue={data?.picture}
                />
                <p id="adminPictureResult" className="bg-success text-white text-center"></p>
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
                    name="localGovt"
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
                                id="adminDocument"
                                alt={data?.name}
                                className="rounded img-fluid d-block mx-auto"
                            />

                            <label htmlFor="doc">Document</label>
                            <input
                                type="file"
                                id="admin_document"
                                name="admin_document"
                                className="form-control"
                                // onChange={showDocument}
                                defaultValue={data?.document} />
                            <p id="adminDocumentResult" className="bg-success text-white text-center"></p>
                        </div>

            <div className="form-group">
                <input
                    type="submit"
                    name="submit"
                    value="Update"
                    className="btn btn-primary btn-block"
                />
                <p id="adminProfileResultS" className="text-center text-success text-white"></p>
                <p id="adminProfileResultF" className="text-center text-danger text-white"></p>
            </div>
        </form>
    );
}
export default AdminProfile;