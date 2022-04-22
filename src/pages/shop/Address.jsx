import React, { useState } from "react";
// import {
//     Card,
//     Grid,
//     Button,
//     Checkbox,
//     CircularProgress,
//     FormControlLabel,
// } from '@mui/material'
// import FormInput from '';
// import 'collections.overview.styles.scss'
// import FormInput from '../../components/collections-overview/collections-overview.component'
import axios from "axios";
import Swal from "sweetalert2";

const Address = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    addresstype: "",
    address1: "", //'jason@ui-lib.com',
    address2: "", //'dummyPasss',
    address3: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    contactperson: "",
    contactno: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo };
    temp[name] = value;
    setUserInfo(temp);
  };
  const handleSubmit = async (event) => {
    Add();
  };
  const Add = async () => {
    var customerid = JSON.parse(localStorage.getItem("user"));

    const config = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    };
    const result = await axios
      .post(
        "https://localhost:44342/api/OperateAddressmaster/InsertAddress",
        {
          CustID: customerid.ClientID, //1,
          addresstype: userInfo.addresstype,
          address1: userInfo.address1,
          address2: userInfo.address2,
          address3: userInfo.address3,
          city: userInfo.city,
          state: userInfo.state,
          country: userInfo.country,
          zipcode: userInfo.zipcode,
          contactperson: userInfo.contactperson,
          contactno: userInfo.contactno,
        },
        config
      )
      .then((json) => {
        // console.log(json.data)
        if (json.data.message == "Success! Your Address Insert Successfully.") {
          // console.log(json.data.Status)
          // alert('UOM Master Save Successfully')
          Swal.fire({
            title: "Success",
            type: "success",
            text: "Success! Your Address Insert Successfully.",
          });
          window.location.href = window.location.origin + "/addresslist";
        } else {
          alert("Somthing wrong..");
          debugger;
        }
      });
  };

  return (
    <>
      <center>
        <form
        //    onSubmit={()=>handleSubmit()}
        >
          <div className="sign-in">
            <h2>Add Your Address Here</h2>
            <span>Enter Your Address Type</span>
            <input
              type="text"
              name="addresstype"
              placeholder="Enter Your address1"
              onChange={handleChange}
              value={userInfo.addresstype}
            />
            <span>Enter Your Address1</span>
            <input
              type="text"
              name="address1"
              placeholder="Enter Your address1"
              onChange={handleChange}
              value={userInfo.address1}
            />
            <span>Enter Your Address2</span>
            <input
              type="text"
              name="address2"
              placeholder="Enter Your address2"
              onChange={handleChange}
              value={userInfo.address2}
            />
            <span>Enter Your Address3</span>
            <input
              type="text"
              name="address3"
              placeholder="Enter Your address3"
              onChange={handleChange}
              value={userInfo.address3}
            />
            <span>Enter Your City</span>
            <input
              type="text"
              name="city"
              placeholder="Enter Your city"
              onChange={handleChange}
              value={userInfo.city}
            />
            <span>Enter Your State</span>
            <input
              type="text"
              name="state"
              placeholder="Enter Your state"
              onChange={handleChange}
              value={userInfo.state}
            />
            <span>Enter Your Country</span>
            <input
              type="text"
              name="country"
              placeholder="Enter Your country"
              onChange={handleChange}
              value={userInfo.country}
            />
            <span>Enter Your Zipcode</span>
            <input
              type="text"
              name="zipcode"
              placeholder="Enter Your zipcode"
              onChange={handleChange}
              value={userInfo.zipcode}
            />
            <span>Enter Contact Person</span>
            <input
              type="text"
              name="contactperson"
              placeholder="Enter Your contactperson"
              onChange={handleChange}
              value={userInfo.contactperson}
            />
            <span>Enter Mobile no</span>
            <input
              type="text"
              name="contactno"
              placeholder="Enter Your mobileno"
              onChange={handleChange}
              value={userInfo.contactno}
            />
            <br />

            <div className="buttons">
              <center>
                {" "}
                <button
                  type="submit"
                  style={{ marginLeft: 140 }}
                  className="btn btn-lg btn-md-6 btn-primary"
                  onClick={() => Add()}
                >
                  {" "}
                  Submit{" "}
                </button>
              </center>
            </div>
          </div>
        </form>
      </center>
    </>
  );
};

export default Address;
