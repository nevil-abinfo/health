import React, { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";

const Address = () => {
  const [userInfo, setUserInfo] = useState({
    AddressID: "",
    CustID: "",
    AddressType: "",
    Address1: "",
    Address2: "",
    Address3: "",
    City: "",
    State: "",
    Country: "",
    ZipCode: "",
    ContactPerson: "",
    ContactNo: "",
  });
  const [address, setAddress] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  };
  const uidpath = window.location.href;

  let resultforid = uidpath.substring(33);
  useEffect(() => {
    loadAddresListById(resultforid);
  }, []);
  const loadAddresListById = async (id) => {
    const result = await axios.get(
      `https://localhost:44342/api/OperateAddressmaster/GetAddressMasterById?AddressID=${id}`,
      config
    );

    setUserInfo({
      ...userInfo,
      AddressID: result.data.AddressMaster[0].AddressID,
      CustID: result.data.AddressMaster[0].CustID,
      AddressType: result.data.AddressMaster[0].AddressType,
      Address1: result.data.AddressMaster[0].Address1,
      Address2: result.data.AddressMaster[0].Address2,
      Address3: result.data.AddressMaster[0].Address3,
      City: result.data.AddressMaster[0].City,
      State: result.data.AddressMaster[0].State,
      Country: result.data.AddressMaster[0].Country,
      ZipCode: result.data.AddressMaster[0].ZipCode,
      ContactPerson: result.data.AddressMaster[0].ContactPerson,
      ContactNo: result.data.AddressMaster[0].ContactNo,
    });
  };

  const handleChange = (event) => {
    event.persist();
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (resultforid == "id") Add();
    else EditAddress();
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
          addresstype: userInfo.AddressType,
          address1: userInfo.Address1,
          address2: userInfo.Address2,
          address3: userInfo.Address3,
          city: userInfo.City,
          state: userInfo.State,
          country: userInfo.Country,
          zipcode: userInfo.ZipCode,
          contactperson: userInfo.ContactPerson,
          contactno: userInfo.ContactNo,
        },
        config
      )
      .then((json) => {
        if (json.data.message == "Success! Your Address Insert Successfully.") {
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
  const EditAddress = async () => {
    const result = await axios
      .put(
        "https://localhost:44342/api/OperateAddressmaster/UpdateAddress/",
        {
          AddressID: userInfo.AddressID,
          CustID: userInfo.CustID,
          addresstype: userInfo.AddressType,
          address1: userInfo.Address1,
          address2: userInfo.Address2,
          address3: userInfo.Address3,
          city: userInfo.City,
          state: userInfo.State,
          country: userInfo.Country,
          zipcode: userInfo.ZipCode,
          contactperson: userInfo.ContactPerson,
          contactno: userInfo.ContactNo,
        },
        config
      )
      .then((json) => {
        if (
          json.data.message == "Success! Your Address Updated Successfully."
        ) {
          Swal.fire({
            title: "Success",
            type: "success",
            text: "Success! Your Address Updated Successfully.",
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
        <form onSubmit={handleSubmit}>
          {/* <ValidatorForm onSubmit={handleSubmit} onError={() => null}></ValidatorForm> */}
          <div className="sign-in">
            <h2>Add Your Address Here</h2>
            <span>Enter Your Address Type</span>
            <input
              type="text"
              name="AddressType"
              placeholder="Enter Your address1"
              onChange={handleChange}
              value={userInfo.AddressType}
            />
            <span>Enter Your Address1</span>
            <input
              type="text"
              name="Address1"
              placeholder="Enter Your address1"
              onChange={handleChange}
              value={userInfo.Address1}
            />
            <span>Enter Your Address2</span>
            <input
              type="text"
              name="Address2"
              placeholder="Enter Your address2"
              onChange={handleChange}
              value={userInfo.Address2}
            />
            <span>Enter Your Address3</span>
            <input
              type="text"
              name="Address3"
              placeholder="Enter Your address3"
              onChange={handleChange}
              value={userInfo.Address3}
            />
            <span>Enter Your City</span>
            <input
              type="text"
              name="City"
              placeholder="Enter Your city"
              onChange={handleChange}
              value={userInfo.City}
            />
            <span>Enter Your State</span>
            <input
              type="text"
              name="State"
              placeholder="Enter Your state"
              onChange={handleChange}
              value={userInfo.State}
            />
            <span>Enter Your Country</span>
            <input
              type="text"
              name="Country"
              placeholder="Enter Your country"
              onChange={handleChange}
              value={userInfo.Country}
            />
            <span>Enter Your Zipcode</span>
            <input
              type="text"
              name="ZipCode"
              placeholder="Enter Your zipcode"
              onChange={handleChange}
              value={userInfo.ZipCode}
            />
            <span>Enter Contact Person</span>
            <input
              type="text"
              name="ContactPerson"
              placeholder="Enter Your contactperson"
              onChange={handleChange}
              value={userInfo.ContactPerson}
            />
            <span>Enter Mobile no</span>
            <input
              type="text"
              name="ContactNo"
              placeholder="Enter Your mobileno"
              onChange={handleChange}
              value={userInfo.ContactNo}
            />
            <br />

            <div className="buttons">
              <center>
                {!userInfo.AddressID && (
                  <button
                    type="submit"
                    style={{ marginLeft: 140 }}
                    className="btn btn-lg btn-md-6 btn-primary"
                    onClick={() => Add()}
                  >
                    {" "}
                    Add Recortd{" "}
                  </button>
                )}
                {userInfo.AddressID && (
                  <button
                    type="submit"
                    style={{ marginLeft: 140 }}
                    className="btn btn-lg btn-md-6 btn-primary"
                    onClick={() => EditAddress(userInfo.AddressID)}
                  >
                    {" "}
                    Update Recortd{" "}
                  </button>
                )}
              </center>
            </div>
          </div>
        </form>
      </center>
    </>
  );
};

export default Address;
