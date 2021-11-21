import axios from "axios";
import React, { useEffect, useState } from "react";
import { appContext } from "../AppProvider";
function ShipperProfile() {
    let [data, setData] = useState([]);
    let [result, setResult] = useState();
    let [err, setErr] = useState();
    const { state } = React.useContext(appContext);
    const shipperId = state.authData?.shipper_id;
    
    const success=<div className="alert alert-success">Success</div>;
    const status=<div className="alert alert-info">Sending...</div>;
    const failure=<div className="alert alert-danger">Error!</div>;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setResult(status)

        let form = document.getElementById("shipperProfileForm");
        let firstName = form.elements['first_name'].value;
        let lastName = form.elements['last_name'].value;
        let phone = form.elements['phone'].value;
        let email = form.elements['email'].value;

        let shipper_picture;
        try {
            shipper_picture = document.getElementById('shipper_picture')[0].files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!shipper_picture) {
               shipper_picture= document.getElementById("shipperPicture").getAttribute("src").split('/')[1];
            }
        }

        let nin = form.elements['nin'].value;
        let dob = form.elements['date_of_birth'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['loc_govt'].value;
        let state = form.elements['state'].value;
        let country = form.elements['country'].value;

        let shipper_document;
        try {
            shipper_document = document.getElementById('shipper_document')[0].files[0].name;
        } catch (error) {
            console.log(error)
        } finally {
            if (!shipper_document) {
                shipper_document = document.getElementById("shipperDocument").getAttribute("src").split('/')[1];
            }
        }

        const profileObj = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            picture: shipper_picture,
            nin: nin,
            dob: dob,
            address: address,
            loc_govt: localGovt,
            state: state,
            country: country,
            document: shipper_document
        };

        console.log(profileObj);
        axios.post("/users/shipper/update", profileObj).then((response) => {
            let result = JSON.parse(JSON.stringify(response.data));
            if (result.affectedRows===1 && result.warningCount===0) {
                handlePicture()
                setResult(success)
                setTimeout(()=>{setResult(null)},4000)
            }
        }).catch((error) => {
            console.log(error);
            setErr(failure)
            setTimeout(()=>{setErr(null)},5000)
        })
    }

    const showPicture = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("shipperPicture").setAttribute("src", objUrl);
        document.getElementById("shipperPicture").setAttribute("width", "100px");
        document.getElementById("shipperPicture").setAttribute("height", "100px");
        document.getElementById("shipperPicture").style.display = "block";
        document.getElementById("shipperPicture").style.margin = "auto";
    }

    const showDocument = (evt) => {
        let objUrl;
        try {
            objUrl = URL.createObjectURL(evt.target.files[0]);
        } catch (error) { console.log(error) }
        console.log(objUrl);
        document.getElementById("shipperDocument").setAttribute("src", objUrl);
        document.getElementById("shipperDocument").setAttribute("width", "100px");
        document.getElementById("shipperDocument").setAttribute("height", "100px");
        document.getElementById("shipperDocument").style.display = "block";
        document.getElementById("shipperDocument").style.margin = "auto";
    }


    const handlePicture = () => {
        const form = new FormData();
        try {
            let pictureFile = document.getElementById('shipper_picture').files[0];
            let documentFile = document.getElementById('shipper_document').files[0];

            let pictureName =  pictureFile.name;
            let documentName =  documentFile.name;

            form.append(
                "shipperpicture",
                pictureFile?pictureFile:'',
                pictureName?pictureName:''
            );  
            
            form.append(
                "shipperdocument",
                documentFile?documentFile:'',
                documentName?documentName:''
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
            axios.post('/users/shipper', { shipper_id: id }).then(function (response) {
                setData(JSON.parse(JSON.stringify(response.data)));
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    useEffect(() => {
       if (shipperId) getProfileData(shipperId)
    }, [shipperId]);

    return (
        <form name="shipperProfileForm" id="shipperProfileForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fnm">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    required
                    defaultValue={data[0]?.first_name}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lnm">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    required
                    defaultValue={data[0]?.last_name}
                />
            </div>

            <div className="form-group">
                <label htmlFor="vph">Phone.</label>
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    required
                    defaultValue={data[0]?.phone}
                />
            </div>

            <div className="form-group">
                <label htmlFor="vph">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    defaultValue={data[0]?.email}
                    readOnly
                />
            </div>

            <div className="form-group">
                <label htmlFor="psspt">Passport</label>
                <img
                    src={`${data[0]?.picture}`}
                    id="shipperPicture"
                    alt=""
                    className="rounded img-fluid d-block mx-auto"
                />
                <input
                    type="file"
                    id="shipper_picture"
                    name="shipper_picture"
                    className="form-control"
                    required
                    onChange={showPicture}
                    // defaultValue={data[0]?.picture}
                />
                <p id="shipperPictureResult" className="bg-success text-white text-center"></p>
            </div>

            <div className="form-group">
                <label htmlFor="vehNIN">National Identity Number.</label>
                <input
                    type="number"
                    name="nin"
                    className="form-control"
                    required
                    defaultValue={data[0]?.nin} />
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth.</label>
                <input
                    type="date"
                    name="date_of_birth"
                    className="form-control"
                    required
                    defaultValue={data[0]?.date_of_birth}
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    required
                    defaultValue={data[0]?.address}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lgv">Local Government</label>
                <input
                    type="text"
                    name="loc_govt"
                    className="form-control"
                    required
                    defaultValue={data[0]?.loc_govt}
                />
            </div>

            <div className="form-group">
                <label htmlFor="Ste">State</label>
                <input
                    type="text"
                    name="state"
                    className="form-control"
                    required
                    defaultValue={data[0]?.state}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cntry">Country</label>
                <input
                    type="text"
                    name="country"
                    className="form-control"
                    required
                    defaultValue={data[0]?.country}
                />
            </div>

            <div className="form-group">
                <img
                    src={`${data[0]?.document}`}
                    id="shipperDocument"
                    alt={data[0]?.name}
                    className="rounded img-fluid d-block mx-auto"
                />

                <label htmlFor="doc">Document</label>
                <input
                    type="file"
                    id="shipper_document"
                    name="shipper_document"
                    className="form-control"
                    required
                    onChange={showDocument}
                    // defaultValue={data[0]?.document} 
                    />
                <p id="shipperDocumentResult" className="bg-success text-white text-center"></p>
            </div>


            <div className="form-group">
            {result}{err}
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
export default ShipperProfile;