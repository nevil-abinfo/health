// import {
//     Button,
//     Icon,
//     Grid,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     Checkbox,
//     Table,
//     TableHead,
//     TableBody,
//     TableCell,
//     IconButton,
//     TableRow,
// } from '@mui/material'
// import { Box, styled } from '@mui/system'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import axios from "axios";

import Swal from "sweetalert2";

const AddressList = (props) => {
  const config = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  };
  const [address, setAddress] = useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadAddresList();
  }, []);

  const loadAddresList = async () => {
    var customerid = JSON.parse(localStorage.getItem("user"));

    // alert(customerid.ClientID)
    const result = await axios.get(
      `https://localhost:44342/api/OperateAddressmaster/GetAddressByCustID?CustID=${customerid.ClientID}`,
      config
    );
    setAddress(result.data.AddressMaster);
  };

  const handleEdit = (id) => {
    // navigate(`/master/UomMaster/UOMAddOrEdit/${id}`)
    window.location.href = window.location.origin + `/address?id=${id}`;
  };
  const AddAddress = () => {
    window.location.href = window.location.origin + "/address";
  };
  const DeleteAddress = (
    id,
    AddressType,
    Address1,
    Address2,
    Address3,
    City,
    State,
    Country,
    ZipCode,
    ContactPerson,
    ContactNo
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (isConfirmed) {
      if (isConfirmed.isConfirmed) {
        const result = axios
          .delete(
            "https://localhost:44342/api/OperateAddressmaster/DeleteAddress",
            {
              headers: {
                Authorization: "Bearer " + window.localStorage.getItem("token"),
              },
              data: {
                AddressID: id,
                AddressType: AddressType,
                Address1: Address1,
                Address2: Address2,
                Address3: Address3,
                City: City,
                State: State,
                Country: Country,
                ZIPCode: ZipCode,
                ContactPerson: ContactPerson,
                ContactNo: ContactNo,
              },
            }
          )
          .then((res) => {
            if (
              res.data.message == "Success! Your Address deleted Successfully."
            ) {
              Swal.fire({
                title: "Done!",
                text: "Success! Your Address deleted Successfully.",
                icon: "success",
                timer: 4000,
                button: false,
              });
              loadAddresList();
            }
          });
      }
    });
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title">Address List</DialogTitle>
      <Button
        style={{ paddingRight: 50 }}
        color="primary"
        variant="contained"
        type="submit"
        onClick={() => AddAddress()}
        // onClick={() =>
        //     navigate('/master/UomMaster/UOMAddOrEdit/id')
        // }
        sx={{ ml: 125 }}
      >
        <span sx={{ pl: 1, textTransform: "capitalize" }}>Add New</span>
      </Button>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {address && address.length > 0
            ? address.map((data, index) => {
                const {
                  IsDefault,
                  AddressType,
                  AddressID,
                  Address1,
                  Address2,
                  Address3,
                  City,
                  State,
                  Country,
                  ZipCode,
                  ContactPerson,
                } = data;
                return (
                  <div key={index} className="address-box">
                    <Button
                      style={{ paddingRight: 20 }}
                      color="primary"
                      variant="contained"
                      type="submit"
                      onClick={() => handleEdit(data.AddressID)}
                      sx={{ ml: 1 }}
                    >
                      <span>Edit</span>
                    </Button>
                    <Button
                      style={{ paddingRight: 20 }}
                      className="btn btn-sm btn-danger"
                      variant="contained"
                      type="submit"
                      onClick={() =>
                        DeleteAddress(
                          data.AddressID,
                          data.AddressType,
                          data.Address1,
                          data.Address2,
                          data.Address3,
                          data.City,
                          data.State,
                          data.Country,
                          data.ZipCode,
                          data.ContactPerson,
                          data.ContactNo
                        )
                      }
                      sx={{ ml: 2 }}
                    >
                      <span>Delete</span>
                      <br />
                    </Button>
                    <br />
                    <label style={{ marginLeft: 10 }}>
                      <b> Contact Persone</b>: {ContactPerson || ""}
                    </label>{" "}
                    <br></br>
                    <label style={{ marginLeft: 10 }} className="address">
                      <b>Address</b>:{" "}
                      {`${Address1}, ${Address2}, ${Address3}, ${City}, ${State}, ${Country}, ${ZipCode}.`}
                    </label>
                  </div>
                );
              })
            : "You don't have any address currnettly please add address first then you can checkout!"}
        </DialogContentText>
      </DialogContent>
    </>
  );
};

export default AddressList;
