import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CTHHContext } from "../contexts/CTHHContext"; //Có sử dụng dữ liệu CTHH

/* import { useState } from 'react' */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import AddCTHHModal from "../components/chitiethanghoa/AddCTHHModal"; //Note
import UpdateCTHHModal from "../components/chitiethanghoa/UpdateCTHHModal"; //Note

import Table from "react-bootstrap/Table";

const CPTK = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    CTHHState: { CTHH, CTHHs, CTHHsLoading },
    getCTHHs,
    setShowAddCTHHModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CTHHContext);

  // hàm tính tổng thành tiền
  function sumArray(mang) {
    let sum = 0;
    mang.map(function (value) {
      sum += value;
    });
    return sum;
  }

  // Start: Get all CTHHs
  useEffect(() => getCTHHs(), []);

  let body = null;
  let stt = 1;
  const tongthanhtiengiakho = sumArray(
    CTHHs.map((CTHH) => CTHH.thanhtiengiakho)
  ); //note
  const tongthanhtiengiaban = sumArray(
    CTHHs.map((CTHH) => CTHH.thanhtiengiaban)
  ); //note
  if (CTHHsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (CTHHs.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">CHI TIẾT HÀNG HÓA</Card.Header>
          <Card.Body>
            <Card.Title>Chưa có dữ liệu</Card.Title>
            <Button
              variant="primary"
              onClick={setShowAddCTHHModal.bind(this, true)}
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
          <Card.Header as="h1">DỰ TRÙ CHI PHÍ TRIỂN KHAI</Card.Header>
          <Card.Header as="h2">CÔNG TY .......HĐ SỐ :........</Card.Header>
          <Card.Body>
            <Table responsive="sm" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th rowspan="2">TT</th>
                  <th rowspan="2" width="25%">
                    Nội dung dự trù
                  </th>
                  <th rowspan="2" width="5%">
                    {" "}
                    Đơn vị
                  </th>
                  <th rowspan="2" width="5%">
                    {" "}
                    Đơn giá
                  </th>
                  <th colspan="2">Số lượng </th>
                  <th rowspan="2 " width="15%">
                    Thành tiền
                  </th>
                  <th rowspan="2 " width="15%">
                    Ghi chú
                  </th>
                  <th rowspan="2 " width="15%">
                    Nhóm / cá nhân dự trù và tạm ứng
                  </th>
                </tr>
                <tr>
                  <th width="8%" as="pre">
                    Ngày/lượt
                  </th>
                  <th>Người</th>
                </tr>
              </thead>
              <tr>
                <th colSpan={9} className="text-left">
                  A. CHI PHÍ CHUNG
                </th>
              </tr>
              <tr>
                <th>I</th>
                <th colSpan={8} className="text-left">
                  Chi phí tiếp khách
                </th>
              </tr>
              {/* {CTHHs.map((CTHH) => (
                <tr key={CTHH._id}>
                  <td>{stt++} </td>
                  <td>{CTHH.tenhang}</td>
                  <td>{CTHH.soluong.toLocaleString()}</td>
                  <td>{CTHH.dongiaFOB.toLocaleString()}</td>
                  <td>{CTHH.dongiakho.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
                  <td>{CTHH.dongiaban.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
                  <td>{CTHH.ghichu} </td>
                </tr>
              ))}
              <tr>
                <th colSpan={2}>Cộng I</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{tongthanhtiengiakho.toLocaleString()}</th>
                <th></th>
                <th>{tongthanhtiengiaban.toLocaleString()}</th>
                <th></th>
              </tr> */}
              <tr>
                <td colSpan={8}>
                  <Button>Thêm</Button>
                </td>
              </tr>
              <tr>
                <th>II</th>
                <th colSpan={8} className="text-left">
                  Chi phí hỗ trợ toàn dự án
                </th>
              </tr>
              {CTHHs.map((CTHH) => (
                <tr key={CTHH._id}>
                  <td>{stt++} </td>
                  <td>{CTHH.tenhang}</td>
                  <td>{CTHH.soluong.toLocaleString()}</td>
                  <td>{CTHH.dongiaFOB.toLocaleString()}</td>
                  <td>{CTHH.dongiakho.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
                  <td>{CTHH.dongiaban.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
                  <td>{CTHH.ghichu} </td>
                </tr>
              ))}
              <tr>
                <th colSpan={2}>Cộng II</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{tongthanhtiengiakho.toLocaleString()}</th>
                <th></th>
                <th>{tongthanhtiengiaban.toLocaleString()}</th>
                <th></th>
              </tr>
              <tr>
                <td colSpan={8}>
                  <Button>Thêm</Button>
                </td>
              </tr>
              <tr>
                <th colSpan={9} className="text-left">
                  CỘNG A:{" "}
                </th>
              </tr>
              <tr>
                <th colSpan={9} className="text-left">
                  B. CHI PHÍ TRIỂN KHAI
                </th>
              </tr>

              <tr>
                <th>I</th>
                <th colSpan={8} className="text-left">
                  Giai đoạn I
                </th>
              </tr>
              {CTHHs.map((CTHH) => (
                <tr key={CTHH._id}>
                  <td>{stt++} </td>
                  <td>{CTHH.tenhang}</td>
                  <td>{CTHH.soluong.toLocaleString()}</td>
                  <td>{CTHH.dongiaFOB.toLocaleString()}</td>
                  <td>{CTHH.dongiakho.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
                  <td>{CTHH.dongiaban.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
                  <td>{CTHH.ghichu} </td>
                </tr>
              ))}
              <tr>
                <th colSpan={2}>Cộng I</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{tongthanhtiengiakho.toLocaleString()}</th>
                <th></th>
                <th>{tongthanhtiengiaban.toLocaleString()}</th>
                <th></th>
              </tr>
              <tr>
                <th>II</th>
                <th colSpan={8} className="text-left">
                  Giai đoạn
                </th>
              </tr>
              {CTHHs.map((CTHH) => (
                <tr key={CTHH._id}>
                  <td>{stt++} </td>
                  <td>{CTHH.tenhang}</td>
                  <td>{CTHH.soluong.toLocaleString()}</td>
                  <td>{CTHH.dongiaFOB.toLocaleString()}</td>
                  <td>{CTHH.dongiakho.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
                  <td>{CTHH.dongiaban.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
                  <td>{CTHH.ghichu} </td>
                </tr>
              ))}
              <tr>
                <th colSpan={2}>Cộng II</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{tongthanhtiengiakho.toLocaleString()}</th>
                <th></th>
                <th>{tongthanhtiengiaban.toLocaleString()}</th>
                <th></th>
              </tr>
              <tr>
                <th>III</th>
                <th colSpan={8} className="text-left">
                  Giai đoạn
                </th>
              </tr>
              {CTHHs.map((CTHH) => (
                <tr key={CTHH._id}>
                  <td>{stt++} </td>
                  <td>{CTHH.tenhang}</td>
                  <td>{CTHH.soluong.toLocaleString()}</td>
                  <td>{CTHH.dongiaFOB.toLocaleString()}</td>
                  <td>{CTHH.dongiakho.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
                  <td>{CTHH.dongiaban.toLocaleString()}</td>
                  <td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
                  <td>{CTHH.ghichu} </td>
                </tr>
              ))}
              <tr>
                <th colSpan={2}>Cộng III</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{tongthanhtiengiakho.toLocaleString()}</th>
                <th></th>
                <th>{tongthanhtiengiaban.toLocaleString()}</th>
                <th></th>
              </tr>
              <tr>
                <th colSpan={9} className="text-left">
                  CỘNG B:{" "}
                </th>
              </tr>
              <tr>
                <th colSpan={9} className="text-left">
                  TỔNG CHI PHÍ TOÀN DỰ ÁN : A + B{" "}
                </th>
              </tr>
              <tr>
                <td colSpan={8}>
                  <Button>Thêm</Button>
                </td>
              </tr>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      {body}
      <AddCTHHModal />
      {CTHH !== null && <UpdateCTHHModal />}
      {/* After CTHH is added, show toast */}
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

export default CPTK;
