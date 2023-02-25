import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'

const Add_AuxiliaryCost_Cost_Modal = () => {
	// Contexts
	const {
		AuxiliaryCostState: { AuxiliaryCosts, AuxiliaryCostsLoading },

		add_AuxiliaryCost_Cost,
		showadd_AuxiliaryCost_Cost_Modal,
		setshowadd_AuxiliaryCost_Cost_Modal,
		setShowToast
	} = useContext(AuxiliaryCostContext);

	// State
	const [newAuxiliaryCost, setNewAuxiliaryCost] = useState({
		idcontract:"",
		Content: "",
		Cost: 0,
		Note: ""
	})

	const {
		idcontract,
		Content,
		Cost,
		Note
	} = newAuxiliaryCost

	//load idcontract
	const params = useParams();
	newAuxiliaryCost.idcontract = params.id;
	
	const onChangeNewAuxiliaryCostForm = event =>
		setNewAuxiliaryCost({ ...newAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddAuxiliaryCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await add_AuxiliaryCost_Cost(newAuxiliaryCost, newAuxiliaryCost.idcontract)//newAuxiliaryCost
		resetAddAuxiliaryCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddAuxiliaryCostData = () => {
		setNewAuxiliaryCost({
			idcontract:"",
			Content: "",
			Cost: 0,
			Note: ""
		})
		setshowadd_AuxiliaryCost_Cost_Modal(false)
	}

	return (
		<Modal show={showadd_AuxiliaryCost_Cost_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>THÊM CHI PHÍ</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Id Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='idcontract'
							value={idcontract}
							onChange={onChangeNewAuxiliaryCostForm}
						/>						
					</Form.Group> 
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập tỉ lệ % hoặc số tiền tuyệt đối'
							name='Cost'
							value={Cost}
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as="h6">
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Nhập chuỗi'
							name='Note'
							value={Note}
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default Add_AuxiliaryCost_Cost_Modal
