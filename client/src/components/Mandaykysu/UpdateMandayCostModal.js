import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { MandayCostContext } from '../../contexts/MandayCostContext'

const UpdateMandayCostModal = () => {
	// Contexts
	const {
		MandayCostState: { MandayCost },
		showUpdateMandayCostModal,
		setShowUpdateMandayCostModal,
		updateMandayCost,
		setShowToast
	} = useContext(MandayCostContext)

	// State
	const [updatedMandayCost, setUpdatedMandayCost] = useState(MandayCost)

	useEffect(() => setUpdatedMandayCost(MandayCost), [MandayCost])

	const { RatioUSD,
        Department,
        Cost,
        StaffNumber,
        ImplementationDay,
        Note
	 } = updatedMandayCost //note

	const onChangeUpdatedMandayCostForm = event =>
		setUpdatedMandayCost({ ...updatedMandayCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedMandayCost(MandayCost)
		setShowUpdateMandayCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateMandayCost(updatedMandayCost)
		setShowUpdateMandayCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddMandayCostData = () => {
	// 	setNewMandayCost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddMandayCostModal(false)
	// }

	return (
		<Modal show={showUpdateMandayCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Manday kỹ sư?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
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
							onChange={onChangeUpdatedMandayCostForm}
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
							onChange={onChangeUpdatedMandayCostForm}
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
							onChange={onChangeUpdatedMandayCostForm}
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
							onChange={onChangeUpdatedMandayCostForm}
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
							onChange={onChangeUpdatedMandayCostForm}
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
							onChange={onChangeUpdatedMandayCostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdateMandayCostModal
