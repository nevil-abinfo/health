import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import BankAddAndEdit from "./bankAddandEdit";
import "./bank.styles.scss";
import { AxiosAPI } from "../../utils/axios";
export default function Bank() {
  const [type, setType] = useState("list");
  const [editData, setEditData] = useState(null);
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    if (type === "list") {
      getBankListAPI();
    }
  }, [type]);

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

  const handleDeleteAccount = async (value) => {
    const payload = {
      bankID: value?.BankID,
      clientID: value?.ClientID,
      bankName: " ",
      bankBranch: "",
      ifscCode: " ",
      micr: "",
      accountNo: "",
      isActive: 0,
      isDeleted: 1,
      operation: "DELETE",
    };
    const response = await AxiosAPI(
      "BankDetails/DeleteBankdetails",
      "delete",
      payload
    );
    if (response && response?.message) {
      getBankListAPI();
    }
  };

  const handleEditAccount = (data) => {
    setType("edit");
    setEditData(data);
  };

  const handleRenderData = () => {
    switch (type) {
      case "list":
        return handleBankList();

      case "edit":
        return (
          <BankAddAndEdit
            data={editData}
            setType={setType}
            setEditData={setEditData}
          />
        );

      case "add":
        return <BankAddAndEdit setType={setType} setEditData={setEditData} />;

      default:
        return handleBankList();
    }
  };
  const handleBankList = () => {
    return (
      <div className="bank-list-form">
        <div className="">
          <h3 className="title">User Added Bank List</h3>
          <Button
            onClick={() => setType("add")}
            color="primary"
            className="add-btn"
            variant="contained"
          >
            Add
          </Button>
        </div>

        <div className="list">
          <table style={{ border: "2px solid lightBlue" }}>
            <thead style={{ border: "2px solid lightBlue" }}>
              <tr>
                <th>Bank Name</th>
                <th>Branch Name</th>
                <th>Account Number</th>
                <th>IFCS Code</th>
                <th>MICR Code</th>
                <th>Fund</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ border: "2px solid lightBlue" }}>
              {bankList &&
                bankList?.length &&
                bankList.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data?.BankName}</td>
                      <td>{data?.BankBranch}</td>
                      <td>{data?.AccountNo}</td>
                      <td>{data?.IFSCCode}</td>
                      <td>{data?.Micr}</td>
                      <td>{data?.AvailableFund}</td>
                      <td>
                        <Button
                          color="primary"
                          variant="contained"
                          className="btn-edit"
                          onClick={() => handleEditAccount(data)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteAccount(data)}
                          color="primary"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return <div>{handleRenderData()}</div>;
}
