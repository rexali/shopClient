import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";

function VendorProfile(props) {
    let [data, setData] = useState({});
    let [result, setResult] = useState();
    let [err, setErr] = useState();

    const { state } = React.useContext(appContext);
    const vendorId = state.authData?.vendor_id;

    const success = <div className="alert alert-success">Success</div>;
    const status = <div className="alert alert-info">Sending...</div>;
    const failure = <div className="alert alert-danger">Error!</div>;


    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(status)
        let form = document.getElementById("vendorProfileForm");
        let firstName = form.elements['first_name'].value;
        let lastName = form.elements['last_name'].value;
        let phone = form.elements['phone'].value;
        let email = form.elements['email'].value;

        let vendor_picture;
        try {
            vendor_picture = document.getElementById('vendor_picture').files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!vendor_picture) {
                vendor_picture = document.getElementById("vendorPicture").getAttribute("src");
            }
        }

        let nin = form.elements['nin'].value;
        let dob = form.elements['date_of_birth'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['loc_govt'].value;
        let state = form.elements['state'].value;
        let country = form.elements['country'].value;

        let vendor_document;
        try {
            vendor_document = document.getElementById('vendor_document').files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!vendor_document) {
                vendor_document = document.getElementById("vendorDocument").getAttribute("src");
            }
        }

        const profileObj = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            picture: vendor_picture,
            nin: nin,
            dob: dob,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            document: vendor_document,
            vendorId: vendorId
        };

        console.log(profileObj);

        axios.post("/users/vendor/update", profileObj).then((response) => {
            let result = JSON.parse(JSON.stringify(response.data));
            if (result.affectedRows === 1 && result.warningCount === 0) {
                handlePicture()
                setResult(success)
                setTimeout(() => { setResult(null) }, 4000)
            }
        }).catch((error) => {
            console.log(error);
            setErr(failure)
            setTimeout(() => { setErr(null) }, 5000)
        })
    }

    const showPicture = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("vendorPicture").setAttribute("src", objUrl);
        document.getElementById("vendorPicture").setAttribute("width", "100px");
        document.getElementById("vendorPicture").setAttribute("height", "100px");
        document.getElementById("vendorPicture").style.display = "block";
        document.getElementById("vendorPicture").style.margin = "auto";
    }

    const showDocument = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("vendorDocument").setAttribute("src", objUrl);
        document.getElementById("vendorDocument").setAttribute("width", "100px");
        document.getElementById("vendorDocument").setAttribute("height", "100px");
        document.getElementById("vendorDocument").style.display = "block";
        document.getElementById("vendorDocument").style.margin = "auto";
    }


    const handlePicture = () => {
        const form = new FormData();
        try {
            let pictureFile = document.getElementById('vendor_picture').files[0];
            let documentFile = document.getElementById('vendor_document').files[0];

            let pictureName = pictureFile.name;
            let documentName = documentFile.name;

            form.append(
                "vendorpicture",
                pictureFile ? pictureFile : '',
                pictureName ? pictureName : ''
            );

            form.append(
                "vendordocument",
                documentFile ? documentFile : '',
                documentName ? documentName : ''
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
        if (id) {
            import("axios").then((axios) => {
                axios.post('/users/vendor', { vendor_id: id }).then(function (response) {
                    let result = JSON.parse(JSON.stringify(response.data));
                    setData(result[0]);
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
    }

    useEffect(() => {
        getProfileData(vendorId);
    }, [vendorId]);

    return (
        <div className="container">
            <form name="vendorProfileForm" id="vendorProfileForm" onSubmit={handleSubmit}>
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
                                id="vendorPicture"
                                alt=""
                                className="rounded img-fluid d-block mx-auto"
                            />
                            <input
                                type="file"
                                id="vendor_picture"
                                name="vendor_picture"
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
                                src={`/uploads/${data?.document ? data?.document : 'logo512.png'}`}
                                id="vendorDocument"
                                alt={data?.name}
                                className="rounded img-fluid d-block mx-auto"
                            />

                            <label htmlFor="doc">Document</label>
                            <input
                                type="file"
                                id="vendor_document"
                                name="vendor_document"
                                className="form-control"
                                onChange={showDocument}
                                defaultValue={data?.document} 
                                />
                            <p id="vendorDocumentResult" className="bg-success text-white text-center"></p>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
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
export default VendorProfile;