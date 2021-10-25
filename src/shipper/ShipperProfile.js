import React, { useEffect, useState } from "react";
function ShipperProfile(props) {
    let [data, setData] = useState([]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = document.getElementById("shipperProfileForm");
        let firstName = form.elements['firstName'].value;
        let lastName = form.elements['lastName'].value;
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
        let dob = form.elements['dob'].value;
        let address = form.elements['address'].value;
        let localGovt = form.elements['localGovt'].value;
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
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            picture: shipper_picture,
            nin: nin,
            dob: dob,
            address: address,
            localGovt: localGovt,
            state: state,
            country: country,
            document: shipper_document
        };

        console.log(profileObj);
        
        uploadPicture();
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


    const uploadPicture = () => {
        let shipper_picture = document.getElementById('shipper_picture')[0].files[0];
        let picObj;
        let formData = new FormData();
        formData.append('shipper_picture', shipper_picture?shipper_picture:'');
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
        const getProfileData = (id) => {
            import("axios").then((axios) => {
                axios.get('http://localhost:3000/mydata.json', {
                    body: { product_id: id }
                }).then(function (response) {
                    let loadData = JSON.stringify(response.data);
                    setData(JSON.parse(loadData).filter((e) => {
                        return Number(e.id) === id;
                    }));
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
        getProfileData(2)
    }, []);

    return (
        <form name="shipperProfileForm" id="shipperProfileForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fnm">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    required
                    defaultValue={data[0].firstName}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lnm">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    required
                    defaultValue={data[0].lastName}
                />
            </div>

            <div className="form-group">
                <label htmlFor="vph">Phone.</label>
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    required
                    defaultValue={data[0].phone}
                />
            </div>

            <div className="form-group">
                <label htmlFor="vph">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    defaultValue={data[0].email}
                    readOnly
                />
            </div>

            <div className="form-group">
                <label htmlFor="psspt">Passport</label>
                <img
                    src={`${data[0].image.src}`}
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
                    defaultValue={data[0].image.src}
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
                    defaultValue={data[0].nin} />
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth.</label>
                <input
                    type="date"
                    name="date_of_birth"
                    className="form-control"
                    required
                    defaultValue={data[0].dob}
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    required
                    defaultValue={data[0].address}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lgv">Local Government</label>
                <input
                    type="text"
                    name="localGovt"
                    className="form-control"
                    required
                    defaultValue={data[0].localGovt}
                />
            </div>

            <div className="form-group">
                <label htmlFor="Ste">State</label>
                <input
                    type="text"
                    name="state"
                    className="form-control"
                    required
                    defaultValue={data[0].state}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cntry">Country</label>
                <input
                    type="text"
                    name="country"
                    className="form-control"
                    required
                    defaultValue={data[0].country}
                />
            </div>

            <div className="form-group">
                <img
                    src={`${data[0].image.src}`}
                    id="shipperDocument"
                    alt={data[0].name}
                    className="rounded img-fluid d-block mx-auto"
                />

                <label htmlFor="doc">Document</label>
                <input
                    type="file"
                    id="shipper_document"
                    name="shipper_document"
                    className="form-control"
                    required
                    onChange={showPicture}
                    defaultValue={data[0].image.src} />
                <p id="shipperDocumentResult" className="bg-success text-white text-center"></p>
            </div>


            <div className="form-group">
                <input
                    type="submit"
                    name="submit"
                    value="Update"
                    className="btn btn-primary btn-block"
                />
                <p id="shipperProfileResultS" className="text-center text-success text-white"></p>
                <p id="shipperProfileResultF" className="text-center text-danger text-white"></p>
            </div>
        </form>
    );
}
export default ShipperProfile;