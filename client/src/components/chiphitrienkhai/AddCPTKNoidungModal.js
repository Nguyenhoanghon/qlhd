import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { CPTKContext } from "../../contexts/CPTKContext";

const AddCPTKNoidungModal = () => {
  // Contexts
  const {
    showAddCPTKNoidungModal,
    setShowAddCPTKNoidungModal,
    addCTHH,
    setShowToast,
  } = useContext(CPTKContext);

  // State
  const [newCTHH, setNewCTHH] = useState({
    tenhang: "",
    soluong: "",
    dongiaFOB: "",
    dongiakho: "",
    thanhtiengiakho: "", //tinh toan bên server
    dongiaban: "",
    thanhtiengiaban: "", //tinh toan bên server
    ghichu: "",
  }); //note là các biến trong

  const {
    tenhang,
    soluong,
    dongiaFOB,
    dongiakho,
    thanhtiengiakho,
    dongiaban,
    thanhtiengiaban,
    ghichu,
  } = newCTHH; //note

  const onChangeNewCTHHForm = (event) =>
    setNewCTHH({ ...newCTHH, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddCTHHData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addCTHH(newCTHH);
    resetAddCTHHData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddCTHHData = () => {
    setNewCTHH({
      tenhang: "",
      soluong: "",
      dongiaFOB: "",
      dongiakho: "",
      thanhtiengiakho: "", //tinh toan bên server
      dongiaban: "",
      thanhtiengiaban: "", //tinh toan bên server
      ghichu: " ",
    }); //note cần sửa
    setShowAddCPTKNoidungModal(false);
  };

  return (
    <Modal show={showAddCPTKNoidungModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn thêm Hàng Hóa?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Text id="tenhang-help" muted as="h6">
              Tên hàng
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Tên hàng"
              name="tenhang"
              required
              aria-describedby="tenhang-help"
              value={tenhang}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="soluong-help" muted as="h6">
              Số lượng
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Số lượng"
              name="soluong"
              required
              aria-describedby="soluong-help"
              value={soluong}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" muted as="h6">
              Đơn giá FOB
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Đơn giá FOB"
              name="dongiaFOB"
              required
              aria-describedby="dongiaFOB-help"
              value={dongiaFOB}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="dongiakho-help" muted as="h6">
              Đơn giá kho
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Đơn giá kho"
              name="dongiakho"
              required
              aria-describedby="dongiakho-help"
              value={dongiakho}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="dongiaban-help" muted as="h6">
              Đơn giá bán
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Đơn giá bán"
              name="dongiaban"
              required
              aria-describedby="dongiaban-help"
              value={dongiaban}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="Ghichu-help" muted as="h6">
              Ghi chú
            </Form.Text>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ghi chú"
              name="ghichu"
              aria-describedby="ghichu-help"
              value={ghichu}
              onChange={onChangeNewCTHHForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Thêm!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCPTKNoidungModal;
