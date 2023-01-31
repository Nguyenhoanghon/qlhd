import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GuaranteeLetterCostContext } from '../../contexts/GuaranteeLetterCostContext'

const AddGuaranteeLetterCostModal = () => {
	// Contexts
	const {
		showAddGuaranteeLetterCostModal,
		setShowAddGuaranteeLetterCostModal,
		addGuaranteeLetterCost,
		setShowToast
	} = useContext(GuaranteeLetterCostContext)

	// State
	const [newGuaranteeLetterCost, setNewGuaranteeLetterCost] = useState({
		Content: '',
		Cost:'',
		QuantityMonths: '',
		RatioCost:'',
		IntoMoney:'',
		Note: '',
		Contract: ''
	})

	const { 
		Content,
		Cost,
		QuantityMonths,
		RatioCost,
		IntoMoney,
		Note,
		ContractID
	} = newGuaranteeLetterCost

	//load idcontract
	const params = useParams();
	newGuaranteeLetterCost.ContractID = params.id;

	const onChangeNewGuaranteeLetterCostForm = event =>
		setNewGuaranteeLetterCost({ ...newGuaranteeLetterCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddGuaranteeLetterCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addGuaranteeLetterCost(newGuaranteeLetterCost)
		resetAddGuaranteeLetterCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddGuaranteeLetterCostData = () => {
		setNewGuaranteeLetterCost({
			Content: '',
			Cost:'',
			QuantityMonths: '',
			RatioCost:'',
			IntoMoney:'',
			Note: '',
			ContractID: ''
		 })
		setShowAddGuaranteeLetterCostModal(false)
	}

	return (
		<Modal show={showAddGuaranteeLetterCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h5'>Bạn muốn thêm chi phí thư bảo lãnh?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Chọn số Hợp đồng.
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							required
							aria-describedby='noidung-help'
							value={ContractID}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Giá trị thư bảo lãnh
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='Cost'
							required
							aria-describedby='gttbl-help'
							value={Cost}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Số tháng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='QuantityMonths'
							required
							aria-describedby='sothang-help'
							value={QuantityMonths}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='tilephi-help' muted as='h6'>
							Tỉ lệ phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='0.02'
							name='RatioCost'
							required
							aria-describedby='tilephi-help'
							value={RatioCost}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Ghi chú'
							name='Note'
							value={Note}
							onChange={onChangeNewGuaranteeLetterCostForm}
						/>						
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddGuaranteeLetterCostModal
