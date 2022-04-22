import React, { useEffect, useState } from "react";
import { AxiosAPI } from "../../utils/axios";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
const requiredField = ["clientID", "bank_ID", "fund"];
export default function Fund() {
  const [fundForm, setFundForm] = useState({
    clientID: 1,
    bank_ID: "",
    fund: "",
  });
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = React.useState("");

  console.log("fundForm", fundForm);

  useEffect(() => {
    getBankListAPI();
  }, []);

  const getBankListAPI = async () => {
    const clientID =
      (localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"))?.ClientID) ||
      null;
    const payload = {
      bankID: 0,
      clientID: clientID,
      bankName: "string",
      bankBranch: "string",
      ifscCode: "string",
      micr: "string",
      accountNo: "string",
      isActive: 0,
      isDeleted: 0,
      operation: "select",
    };
    const response = await AxiosAPI(
      "BankDetails/GetBankMaster",
      "post",
      payload
    );
    if (response && response?.Table) {
      setBankList(response?.Table || []);
    }
  };

  const handleChange = (e) => {
    let cloneFundForm = { ...fundForm };
    const { name, value } = e?.target;
    cloneFundForm[name] = value;
    setFundForm(cloneFundForm);
  };

  const handleAddFund = async () => {
    let error = false;
    requiredField.map((key) => {
      if (fundForm[key] === "") {
        error = true;
      }
    });
    if (error) {
      return;
    }
    const clientID =
      (localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"))?.ClientID) ||
      null;
    const payload = {
      clientID: clientID,
      bank_ID: fundForm?.bank_ID,
      fund: fundForm?.fund,
    };
    console.log("payload", payload);
    const response = await AxiosAPI(`Fund/InsertFund`, "post", payload);
    if (response && response?.message) {
      Swal.fire({
        title: "Success",
        type: "success",
        text: "Fund added successfully.",
      });
      setFundForm({
        clientID: 1,
        bank_ID: "",
        fund: "",
      });
      setBank("");
    }
  };

  const handleChanges = (event) => {
    setBank(event.target.value);
    setFundForm({
      ...fundForm,
      bank_ID: event.target.value,
    });
  };

  return (
    <div className="bank-form">
      <h3 className="title">Add Fund</h3>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Bank</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bank}
          label="Select Bank"
          onChange={handleChanges}
        >
          {bankList &&
            bankList.length &&
            bankList.map((data, index) => {
              return (
                <MenuItem key={index} value={data?.BankID}>
                  {data?.BankName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormInput
        label="Fund Amount"
        name="fund"
        type="text"
        onChange={handleChange}
        value={fundForm?.fund}
        required
      />

      <CustomButton onClick={handleAddFund}>Add</CustomButton>
    </div>
  );
}
