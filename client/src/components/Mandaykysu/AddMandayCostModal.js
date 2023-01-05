import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useContext, useState } from 'react'
import { MandayCostContext } from '../../contexts/MandayCostContext'

const AddMandayCostModal = () => {
	// Contexts
	const {
		showAddMandayCostModal,
		setShowAddMandayCostModal,
		addMandayCost,
		setShowToast
	} = useContext(MandayCostContext)

	// State
	const [newMandayCost, setNewMandayCost] = useState({
		RatioUSD:'',
        Department:'',
        Cost:'',
        StaffNumber:'',
        ImplementationDay:'',
        Note:'',

	}) //note là các biến trong 

	const { 
		RatioUSD,
        Department,
        Cost,
        StaffNumber,
        ImplementationDay,
        IntoMoney,
        Note,
		ContractID } = newMandayCost //note

	const onChangeNewMandayCostForm = event =>
		setNewMandayCost({ ...newMandayCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddMandayCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addMandayCost(newMandayCost)
		resetAddMandayCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddMandayCostData = () => {
		setNewMandayCost({ 
			RatioUSD:'',
			Department:'',
			Cost:'',
			StaffNumber:'',
			ImplementationDay:'',
			IntoMoney:'',
			Note:'' }) //note cần sửa
		setShowAddMandayCostModal(false)
	}

	return (
		<Modal show={showAddMandayCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h6'>Bạn muốn thêm Mandaykysu?</Modal.Title>
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
							onChange={onChangeNewMandayCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Tỷ giá USD!
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='22,400'
							name='RatioUSD'
							required
							aria-describedby='title-help'
							value={RatioUSD}
							onChange={onChangeNewMandayCostForm}
						/>
					</Form.Group>
										
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Phòng ban
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Department'
							required
							aria-describedby='title-help'
							value={Department}
							onChange={onChangeNewMandayCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Manday chuẩn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='Cost'
							required
							aria-describedby='Cost-help'
							value={Cost}
							onChange={onChangeNewMandayCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Số người tham gia dự án
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='StaffNumber'
							required
							aria-describedby='songuoi-help'
							value={StaffNumber}
							onChange={onChangeNewMandayCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Nhập số ngày thực hiện
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='ImplementationDay'
							required
							aria-describedby='songaythuchien-help'
							value={ImplementationDay}
							onChange={onChangeNewMandayCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={2}
							placeholder=''
							name='Note'
							aria-describedby='ghichu-help'
							value={Note}
							onChange={onChangeNewMandayCostForm}
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

export default AddMandayCostModal
