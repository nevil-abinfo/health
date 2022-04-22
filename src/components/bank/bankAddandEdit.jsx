import React, { useEffect, useState } from "react";
import { AxiosAPI } from "../../utils/axios";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
const requiredField = [
  "accountNo",
  "bankBranch",
  "ifscCode",
  "micr",
  "bankName",
];
const initialField = {
  bankID: 0,
  clientID: 2,
  bankName: "",
  bankBranch: "",
  ifscCode: "",
  micr: "",
  accountNo: "",
  isActive: 1,
  isDeleted: 0,
  operation: "Insert",
};
export default function BankAddAndEdit({ data, setType, setEditData }) {
  const [bankForm, setBankForm] = useState({ ...initialField });
  const [editForm, setEditForm] = useState(false);
  const handleChange = (e) => {
    let cloneBankForm = { ...bankForm };
    const { name, value } = e?.target;
    cloneBankForm[name] = value;
    setBankForm(cloneBankForm);
  };

  useEffect(() => {
    if (data) {
      !editForm && setEditForm(true);
      setBankForm({
        bankID: data?.BankID,
        clientID: data?.ClientID,
        bankName: data?.BankName,
        bankBranch: data?.BankBranch,
        ifscCode: data?.IFSCCode,
        micr: data?.Micr,
        accountNo: data?.AccountNo,
        isActive: data?.IsActive,
        isDeleted: data?.IsDeleted,
        operation: "UPDATE",
      });
    } else {
      editForm && setEditForm(false);
    }
  }, [data]);

  const handleUpdateBankDetails = async () => {
    let error = false;
    requiredField.map((key) => {
      if (bankForm[key] === "") {
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
      bankID: bankForm?.bankID,
      clientID: clientID,
      bankName: bankForm?.bankName,
      bankBranch: bankForm?.bankBranch,
      ifscCode: bankForm?.ifscCode,
      micr: bankForm?.micr,
      accountNo: bankForm?.accountNo,
      isActive: 1,
      isDeleted: 0,
      operation: "UPDATE",
    };
    const response = await AxiosAPI(
      `BankDetails/UpdateBankdetails`,
      "put",
      payload
    );
    if (response && response?.message) {
      setType("list");
      setEditData(null);
    }
  };

  const handleAddBankDetails = async () => {
    let error = false;
    requiredField.map((key) => {
      if (bankForm[key] === "") {
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
      bankID: 0,
      clientID: clientID,
      bankName: bankForm?.bankName,
      bankBranch: bankForm?.bankBranch,
      ifscCode: bankForm?.ifscCode,
      micr: bankForm?.micr,
      accountNo: bankForm?.accountNo,
      isActive: 1,
      isDeleted: 0,
      operation: "Insert",
    };
    const response = await AxiosAPI(
      `BankDetails/InsertBankdetails`,
      "post",
      payload
    );
    if (response && response?.message) {
      setType("list");
      setEditData(null);
    }
  };
  return (
    <div className="bank-form">
      <h3 className="title">
        {" "}
        {editForm ? "Update Bank Details" : "Add Bank Details"}
      </h3>
      <FormInput
        label="Account number"
        name="accountNo"
        type="text"
        onChange={handleChange}
        value={bankForm?.accountNo}
        required
      />
      <FormInput
        label="Bank Name"
        name="bankName"
        type="text"
        onChange={handleChange}
        value={bankForm?.bankName}
        required
      />
      <FormInput
        label="Branch Name"
        name="bankBranch"
        type="text"
        onChange={handleChange}
        value={bankForm?.bankBranch}
        required
      />
      <FormInput
        label="IFSC Code"
        name="ifscCode"
        type="text"
        onChange={handleChange}
        value={bankForm?.ifscCode}
        required
      />
      <FormInput
        label="MICR"
        name="micr"
        type="text"
        onChange={handleChange}
        value={bankForm?.micr}
        required
      />
      {editForm ? (
        <CustomButton onClick={handleUpdateBankDetails}>Update</CustomButton>
      ) : (
        <CustomButton onClick={handleAddBankDetails}>Add</CustomButton>
      )}
    </div>
  );
}
