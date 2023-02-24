import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CapitalExpenditureCostContext } from "../contexts/CapitalExpenditureCostContext";
import { useParams } from 'react-router-dom'
/* import { useState } from 'react' */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import ActionButtons_CapitalExpenditureCost from "../components/CapitalExpenditureCost/ActionButtons_CapitalExpenditureCost";
import AddCapitalExpenditureCostModal from "../components/CapitalExpenditureCost/AddCapitalExpenditureCostModal"; //Note
import UpdateCapitalExpenditureCostModal from "../components/CapitalExpenditureCost/UpdateCapitalExpenditureCostModal"; //Note

import Table from "react-bootstrap/Table";
//View all CapitalExpenditureCost
export const CapitalExpenditureCost_all = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    CapitalExpenditureCostState: { CapitalExpenditureCost, CapitalExpenditureCosts, CapitalExpenditureCostsLoading },
    getCapitalExpenditureCosts,
    setShowAddCapitalExpenditureCostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CapitalExpenditureCostContext);

  // hàm tính tổng thành tiền
  function sumArray(mang) {
    let sum = 0;
    mang.map(function (value) {
      sum += value;
    });
    return sum;
  }

  // Start: Get all CapitalExpenditureCosts
  useEffect(() => getCapitalExpenditureCosts(), []);
  let body = null;
  let stt = 1;
  //const tongsotienkhachhangtra = sumArray(CapitalExpenditureCosts.map((CapitalExpenditureCost) => CapitalExpenditureCost.sotienKHtra)); //note
  //const tongsotienthanhtoanNTP = sumArray(CapitalExpenditureCosts.map((CapitalExpenditureCost) => CapitalExpenditureCost.sotienTTNTP)); //note
  if (CapitalExpenditureCostsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (CapitalExpenditureCosts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">CHI PHÍ VỐN</Card.Header>
          <Card.Body>
            <Card.Title>Chưa có dữ liệu</Card.Title>
            {/* <Button
              variant="primary"
              onClick={setShowAddCapitalExpenditureCostModal.bind(this, true)}
            >
              Thêm!
            </Button> */}
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">DANH SÁCH CHI PHÍ VỐN</Card.Header>
          <Card.Body>
            <Table responsive="sm" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>STT</th>
                  <th> Giá vốn </th>
                  <th>Doanh thu</th>
                  <th>Chi phí vốn</th>
                  <th>Số ngày hàng tồn kho</th>
                  <th>Số ngày triển khai</th>
                  <th>Số ngày công nợ nhà cung cấp</th>
                  <th>Số ngày thu nợ</th>
                  <th>Khách hàng trả trước (đặt cọc)</th>
                  <th>Đặt cọc cho NTP</th>
                  <th>Ghi chú</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {CapitalExpenditureCosts.map((CapitalExpenditureCost) => (
                  <tr key={CapitalExpenditureCost._id}>
                    <td>{stt++} </td>
                    <td>{CapitalExpenditureCost.CapitalCost.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.Revenue.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.CapitalExpense.toLocaleString(2)}</td>
                    <td>{CapitalExpenditureCost.InventoryDays.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.ImplementationDays.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.BedtDays}</td>
                    <td>{CapitalExpenditureCost.DebtCollectionDays.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.Deposits.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.DepositsNTP.toLocaleString()}</td>
                    <td>{CapitalExpenditureCost.ghichu} </td>
                    <td>
                      <ActionButtons_CapitalExpenditureCost _id={CapitalExpenditureCost._id} />
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td colSpan={3}>Tổng</td>
                  <td>{ }</td>
                  <td>{ }</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> */}
              </tbody>
            </Table>
            {/* <Button
              variant="primary"
              onClick={setShowAddCapitalExpenditureCostModal.bind(this, true)}
            >
              Thêm mới
            </Button> */}
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      {body}
      <AddCapitalExpenditureCostModal />
      {CapitalExpenditureCost !== null && <UpdateCapitalExpenditureCostModal />}
      {/* After CapitalExpenditureCost is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

//View all CapitalExpenditureCost
export const CapitalExpenditureCost_byidContract = () => {
  const params = useParams()
  // Contexts

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    CapitalExpenditureCostState: { CapitalExpenditureCost, CapitalExpenditureCosts, CapitalExpenditureCostsLoading },
    getCapitalExpenditureCosts_byidContract,
    setShowAddCapitalExpenditureCostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CapitalExpenditureCostContext);

  // hàm tính tổng thành tiền
  function sumArray(mang) {
    let sum = 0;
    mang.map(function (value) {
      sum += value;
    });
    return sum;
  }

  // Start: Get all CapitalExpenditureCosts
  useEffect(() => getCapitalExpenditureCosts_byidContract(params.id), []);

  let body = null;
  if (CapitalExpenditureCostsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (CapitalExpenditureCosts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">CHI PHÍ VỐN</Card.Header>
          <Card.Body>
            <Card.Title>Chưa có dữ liệu</Card.Title>
            <Button
              variant="primary"
              onClick={setShowAddCapitalExpenditureCostModal.bind(this, true)}
            >
              Thêm!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">CHI PHÍ VỐN</Card.Header>
          <Card.Body>
            <Table responsive="sm" striped bordered hover size="sm">
              {CapitalExpenditureCosts.map((CapitalExpenditureCost) => (
                <>
                  <tr className='text-left' key={CapitalExpenditureCost._id}>
                    <th>Giá vốn:</th>
                    <th>{CapitalExpenditureCost.CapitalCost.toLocaleString()}</th>
                  </tr>
                  <tr className='text-left'>
                    <th>Doanh thu</th>
                    <th>{CapitalExpenditureCost.Revenue.toLocaleString()}</th>
                  </tr>
                  <tr className='text-left'>
                    <th>Chi phí vốn</th>
                    <th>{CapitalExpenditureCost.CapitalExpense.toLocaleString(2)}</th>
                  </tr>
                  <tr className='text-left'>
                    <td>Số ngày hàng tồn kho</td>
                    <td>{CapitalExpenditureCost.InventoryDays.toLocaleString()} </td>
                  </tr>
                  <tr className='text-left'>
                    <td>Số ngày triển khai</td>
                    <td>{CapitalExpenditureCost.ImplementationDays.toLocaleString()}</td>
                  </tr>
                  <tr className='text-left'>
                    <td>Số ngày công nợ nhà cung cấp</td>
                    <td>{CapitalExpenditureCost.BedtDays}</td>
                  </tr>
                  <tr className='text-left'>
                    <td>Số ngày thu nợ</td>
                    <td>{CapitalExpenditureCost.DebtCollectionDays.toLocaleString()}</td>
                  </tr><tr className='text-left'>
                    <td>Khách hàng trả trước (đặt cọc)</td>
                    <td>{CapitalExpenditureCost.Deposits.toLocaleString()}</td>
                  </tr><tr className='text-left'>
                    <td>Đặt cọc cho NTP</td>
                    <td>{CapitalExpenditureCost.DepositsNTP.toLocaleString()}</td>
                  </tr><tr className='text-left'>
                    <td>Ghi chú</td>
                    <td>{CapitalExpenditureCost.ghichu} </td>
                  </tr>
                  <tr className='text-left'>
                    <td>Thao tác</td>
                    <td><ActionButtons_CapitalExpenditureCost _id={CapitalExpenditureCost._id} /></td>
                  </tr>
                </>
              ))}

              <tr>
                <td colSpan={2}><
                  Button
                  variant="primary"
                  onClick={setShowAddCapitalExpenditureCostModal.bind(this, true)}
                >
                  Thêm mới
                </Button></td>
              </tr>
            </Table>

            <a href={`/summary/${params.id}`}>
              <Button
                variant='primary'
              >
                Xem PTHD
              </Button>
            </a>
            <span> </span>
            <a href={`/inputform/${params.id}`}>
              <Button
                variant='primary'
              >
                Kết thúc
              </Button>
            </a>
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      {body}
      <AddCapitalExpenditureCostModal />
      {CapitalExpenditureCost !== null && <UpdateCapitalExpenditureCostModal />}
      {/* After CapitalExpenditureCost is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

