import {
  Button,
  Icon,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  TableRow,
  Link,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import BatchInfoPopUP from "./BatchInfoPopUp";
import Popupstyle from "./PopupStyle.css";
import moment from "moment";
import { TablePagination } from "@mui/material";
import axios from "axios";

import Swal from "sweetalert2";

const Invoice = (props) => {
  const [users, setUser] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [batchItemList, setBatchItemList] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState();
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [invoiceId, setinvoiceId] = useState();
  const [statusID, setstatusID] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const config = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadUsers();
    axios
      .get(
        "https://localhost:44342/api/OperateStatusMaster/GetAllStatusMaster",
        config
      )
      .then((response) => setList(response.data.Table))
      .then((error) => console.log(error));
  }, []);

  const loadUsers = async () => {
    var customerid = JSON.parse(localStorage.getItem("user"));

    const result = await axios.get(
      `https://localhost:44342/api/Order/InvoiceHistoryForClient?ClientID=${customerid.ClientID}`,
      // 'https://localhost:44342/api/InvoiceStatus/GetAllInCompletedInvoices',
      config
    );
    setUser(result.data.InvoiceDetails);
    console.log(result.data.InvoiceMaster);
  };

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    // alert(id)

    axios
      .get(
        "https://localhost:44342/api/InvoiceStatus/GetAllInCompletedInvoices",
        config
      )
      .then((response) => setBatchItemList(response.data.InvoiceDetails))
      //   .then((response) =>    console.log(response.data.StockNoteBook))
      .then((error) => console.log(error));
  };

  const togglePopupForStatus = (id, invoiceid) => {
    setIsStatusOpen(!isStatusOpen);
    setinvoiceId(invoiceid);

    axios
      .get(
        "https://localhost:44342/api/OperateStatusMaster/GetAllStatusMaster",
        config
      )
      .then((response) => setStatusList(response.data.Table))
      .then((error) => console.log(error));

    axios
      .get(
        `https://localhost:44342/api/InvoiceStatus/GetInvoiceStatusHistory?InvoiceID=${invoiceid}`,
        config
      )
      .then((response) => setStatusHistory(response.data.StatusHistory));
  };

  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": {
        "& th": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
    "& tbody": {
      "& tr": {
        "& td": {
          paddingLeft: 0,
          textTransform: "capitalize",
        },
      },
    },
  }));
  const onItemChange = (e) => {
    alert(e.target.value);
    setstatusID(e.target.value);
    //    setList(e.taget.value);
  };
  const Update = () => {
    axios
      .post(
        "https://localhost:44342/api/InvoiceStatus/InsertInvoiceStatus/",
        {
          invoiceID: invoiceId,
          statusID: statusID,
        },
        config
      )
      .then((json) => {
        if (
          json.data.message ==
          "Success! Your Invoice Status Insert Successfully."
        ) {
          Swal.fire({
            title: "Success",
            type: "success",
            text: "Success! Your invoice status Inserted Successfully.",
          });
          axios
            .get(
              `https://localhost:44342/api/InvoiceStatus/GetInvoiceStatusHistory?InvoiceID=${invoiceId}`,
              config
            )
            .then((response) => setStatusHistory(response.data.StatusHistory))
            //   .then((response) =>    console.log(response.data.StockNoteBook))
            .then((error) => console.log(error));
        } else {
          alert("Somthing wrong..");
        }
      });
  };
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
      margin: "16px",
    },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "16px",
      },
    },
  }));

  return (
    <>
      <Container>
        <br />
        <br />
        <center>
          <h4>Invoice History Report</h4>
        </center>

        <br />
        <hr />
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "green" }}>
                  <h5>Invoice Id</h5>
                </TableCell>
                {/* <TableCell>Item Description</TableCell> */}
                <TableCell style={{ color: "green" }}>
                  <h5>Invoice Number</h5>
                </TableCell>
                <TableCell style={{ color: "green" }}>
                  <h5>Invoice Date</h5>
                </TableCell>
                <TableCell style={{ color: "green" }}>
                  <h5>Client Name</h5>
                </TableCell>
                <TableCell style={{ color: "green" }}>
                  <h5>Company Name</h5>
                </TableCell>
                <TableCell align="right" style={{ color: "green" }}>
                  <h5>Amount</h5>
                </TableCell>
                <TableCell align="right" style={{ color: "green" }}>
                  <h5></h5>
                </TableCell>
                {/* <TableCell style={{ color: 'green' }}>
                                    <h5>Address</h5>
                                </TableCell> */}
                <TableCell style={{ color: "green" }}>
                  <h5>Status Name</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <h5>
                        <Link
                          onClick={() => togglePopup(item.InvoiceID)}
                          // href={`/ItemStockReport?BatchId=1`}
                          taget="_blank"
                        >
                          {item.InvoiceID}
                        </Link>
                      </h5>
                    </TableCell>

                    <TableCell>
                      <h5>{item.InvoiceNo}</h5>
                    </TableCell>
                    <TableCell>
                      <h5>{moment(item.InoiceDate).format("MM/DD/YYYY")}</h5>
                    </TableCell>
                    <TableCell>
                      <h5>{item.ClientName}</h5>
                    </TableCell>
                    <TableCell>
                      <h5>{item.CompnayName}</h5>
                    </TableCell>
                    <TableCell align="right">
                      <h5>{item.TotalAmount}</h5>
                    </TableCell>
                    {/* <TableCell><h5>{" "}</h5></TableCell> */}
                    <TableCell>
                      <h5>
                        {item.Address1}
                        {"  "}
                        {item.Address2} {item.Address3}
                      </h5>
                    </TableCell>
                    <TableCell>
                      <h5>
                        <Link
                          onClick={() =>
                            togglePopupForStatus(item.StatusID, item.InvoiceID)
                          }
                          // href={`/ItemStockReport?BatchId=1`}
                        >
                          {item.StatusName}
                        </Link>
                      </h5>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
          {isOpen && (
            <BatchInfoPopUP
              content={
                <>
                  <b>
                    <center>
                      <h3>Item Info</h3>
                    </center>
                  </b>
                  <br />
                  <hr />
                  <Box width="100%" overflow="auto">
                    <StyledTable>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ color: "red" }}>
                            <h5> Item name</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Image</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>UOM Name</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Item Type</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Qty</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Rate</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Amount</h5>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <h5>Expiry date</h5>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {batchItemList
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <p
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {item.ItemName}
                                </p>
                              </TableCell>
                              <TableCell>
                                {/* {item.ItemImageURl} */}
                                <img
                                  src={item.ItemImageURl}
                                  style={{
                                    height: 100,
                                    width: 100,
                                  }}
                                  alt=""
                                />
                              </TableCell>
                              <TableCell>{item.UOMName}</TableCell>
                              <TableCell>{item.ItemType1}</TableCell>
                              <TableCell>{item.InvoiceDetailQTY}</TableCell>
                              <TableCell>{item.InvoiceDetailPrice}</TableCell>
                              <TableCell>{item.InvoiceAmount}</TableCell>
                              <TableCell>
                                {moment(item.ExpiryDate).format("MM/DD/YYYY")}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </StyledTable>
                  </Box>
                </>
              }
              handleClose={togglePopup}
            />
          )}
          {isStatusOpen && (
            <BatchInfoPopUP
              content={
                <>
                  <b>
                    <center>
                      <h3>Status </h3>
                    </center>
                  </b>
                  <br />
                  <hr />
                  <Box width="100%" overflow="auto">
                    <FormLabel component="legend">
                      {/* <center><h4>Status List</h4></center>    */}
                    </FormLabel>

                    <StyledTable>
                      <TableHead>
                        <TableRow>
                          <TableCell>Status Name</TableCell>
                          <TableCell>Status Description</TableCell>
                          <TableCell>Date</TableCell>{" "}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {statusHistory
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <p
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  {item.StatusName}
                                </p>
                              </TableCell>

                              <TableCell>{item.StatusDescription}</TableCell>
                              <TableCell>
                                {moment(item.Adddate).format(
                                  "MM/DD/YYYY HH:MM:SS"
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </StyledTable>
                  </Box>
                  <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={statusHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page",
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              }
              handleClose={togglePopupForStatus}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Invoice;
