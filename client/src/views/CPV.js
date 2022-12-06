import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CPVContext } from "../contexts/CPVContext"; //Note GET DELETE
/* import { useState } from 'react' */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import ActionButtons_CPV from "../components/chiphivon/ActionButtons_CPV";
import AddCPVModal from "../components/chiphivon/AddCPVModal"; //Note
import UpdateCPVModal from "../components/chiphivon/UpdateCPVModal"; //Note

import Table from "react-bootstrap/Table";

const CPV = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    CPVState: { CPV, CPVs, CPVsLoading },
    getCPVs,
    setShowAddCPVModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CPVContext);

  // hàm tính tổng thành tiền
  function sumArray(mang) {
    let sum = 0;
    mang.map(function (value) {
      sum += value;
    });
    return sum;
  }

  // Start: Get all CPVs
  useEffect(() => getCPVs(), []);

  let body = null;
  let stt = 1;
  const tongsotienkhachhangtra = sumArray(CPVs.map((CPV) => CPV.sotienKHtra)); //note
  const tongsotienthanhtoanNTP = sumArray(CPVs.map((CPV) => CPV.sotienTTNTP)); //note
  if (CPVsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (CPVs.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">CHI PHÍ VỐN</Card.Header>
          <Card.Body>
            <Card.Title>Chưa có dữ liệu</Card.Title>
            <Button
              variant="primary"
              onClick={setShowAddCPVModal.bind(this, true)}
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
              <thead>
                {/* <tr className='text-left'>
									<th>Giá vốn:</th>
									<th colSpan={10}>{CPV.giavon.toLocaleString()}</th>
								 </tr>
								<tr className='text-left'>
									<th>Giá vốn:</th>
									<th colSpan={10}>{CPV.giaban.toLocaleString()}</th>
								 </tr>
								 <tr className='text-left'>
									<th>Giá vốn:</th>
									<th colSpan={10}>{CPV.giatridaura.toLocaleString()}</th>
								 </tr> */}
                <tr>
                  <th>STT</th>
                  <th>Ngày</th>
                  <th>Diễn giải</th>
                  <th>Số tiền KH trả</th>
                  <th>Số tiền Thanh toán NTP</th>
                  <th>Số tiền hàng còn nợ</th>
                  <th>Số Ngày</th>
                  <th>Lãi suất</th>
                  <th>Chi phí lãi vay</th>
                  <th>Ghi chú</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {CPVs.map((CPV) => (
                  <tr key={CPV._id}>
                    <td>{stt++} </td>
                    <td>{new Date(CPV.ngay).toLocaleDateString()}</td>
                    <td>{CPV.diengiai}</td>
                    <td>{CPV.sotienKHtra.toLocaleString()}</td>
                    <td>{CPV.sotienTTNTP.toLocaleString()}</td>
                    <td>{CPV.sotienhangconno.toLocaleString()}</td>
                    <td>{CPV.songay}</td>
                    <td>{CPV.laisuat.toLocaleString()}</td>
                    <td>{CPV.chiphilaivay.toLocaleString()}</td>
                    <td>{CPV.ghichu} </td>
                    <td>
                      <ActionButtons_CPV _id={CPV._id} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}>Tổng</td>
                  <td>{tongsotienkhachhangtra.toLocaleString()}</td>
                  <td>{tongsotienthanhtoanNTP.toLocaleString()}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary"
              onClick={setShowAddCPVModal.bind(this, true)}
            >
              Thêm mới
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      {body}
      <AddCPVModal />
      {CPV !== null && <UpdateCPVModal />}
      {/* After CPV is added, show toast */}
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

export default CPV;
