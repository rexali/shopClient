import React, { useEffect, useState } from "react";
import axios from "axios";
import { appContext } from "../AppProvider";
function AdminProfile() {
    let [data, setData] = useState({});
    let [result, setResult] = useState('');
    let [err, setErr] = useState('');

    const { state } = React.useContext(appContext);
    const adminId = state.authData?.admin_id;

    const success = <div className="alert alert-success">Success</div>;
    const status = <div className="alert alert-info">Sending...</div>;
    const failure = <div className="alert alert-success">Error!</div>;

    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(status)
        let form = document.getElementById("adminProfileForm");
        let firstName = form.elements['first_name'].value;
        let lastName = form.elements['last_name'].value;
        let phone = form.elements['phone'].value;
        let email = form.elements['email'].value;

        let admin_picture;
        try {
            admin_picture = document.getElementById('admin_picture')[0].files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!admin_picture) {
                admin_picture = document.getElementById("adminPicture").getAttribute("src").split('/')[1];
            }
        }

        let nin = form.elements['nin'].value;
        let dob = form.elements['date_of_birth'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['loc_govt'].value;
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
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            picture: admin_picture,
            nin: nin,
            dob: dob,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            document: admin_document,
            admin_id: adminId
        };

        console.log(profileObj);

        axios.post("/users/admin/update", profileObj).then((response) => {
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

    const handlePicture = () => {
        const form = new FormData();
        try {
            let pictureFile = document.getElementById('admin_picture').files[0];
            let documentFile = document.getElementById('admin_document').files[0];

            let pictureName = pictureFile.name;
            let documentName = documentFile.name;

            form.append(
                "adminpicture",
                pictureFile ? pictureFile : '',
                pictureName ? pictureName : ''
            );

            form.append(
                "admindocument",
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


    const showDocument = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("adminDocument").setAttribute("src", objUrl);
        document.getElementById("adminDocument").setAttribute("width", "100px");
        document.getElementById("adminDocument").setAttribute("height", "100px");
        document.getElementById("adminDocument").style.display = "block";
        document.getElementById("adminDocument").style.margin = "auto";
    }


    useEffect(() => {
        const getProfileData = (aid) => {
            import("axios").then((axios) => {
                axios.post('/users/admin', { admin_id: aid }).then(function (response) {
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
                    src={`/uploads/${data?.picture ? data?.picture : 'logo512.png'}`}
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
                    onChange={showDocument}
                    defaultValue={data?.document} />
                <p id="adminDocumentResult" className="bg-success text-white text-center"></p>
            </div>

            <div className="form-group">
                {result}{err}
                <p className="text-center text-danger text-white">{err}</p>
                <input
                    type="submit"
                    name="submit"
                    value="Update"
                    className="btn btn-primary btn-block"
                />
            </div>
        </form>
    );
}
export default AdminProfile;