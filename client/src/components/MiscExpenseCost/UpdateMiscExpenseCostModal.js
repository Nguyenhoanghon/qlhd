import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { MiscExpenseCostContext } from '../../contexts/MiscExpenseContext'

const UpdateMiscExpenseCostModal = () => {
	// Contexts
	const {
		MiscExpenseCostState: { MiscExpenseCost },
		showUpdateMiscExpenseCostModal,
		setShowUpdateMiscExpenseCostModal,
		updateMiscExpenseCost,
		setShowToast
	} = useContext(MiscExpenseCostContext)

	// State
	const [updatedMiscExpenseCost, setUpdatedMiscExpenseCost] = useState(MiscExpenseCost)

	useEffect(() => setUpdatedMiscExpenseCost(MiscExpenseCost), [MiscExpenseCost])

	const { 
		Content, Cost, Note
	 } = updatedMiscExpenseCost //note

	const onChangeUpdatedMiscExpenseCostForm = event =>
		setUpdatedMiscExpenseCost({ ...updatedMiscExpenseCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedMiscExpenseCost(MiscExpenseCost)
		setShowUpdateMiscExpenseCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateMiscExpenseCost(updatedMiscExpenseCost)
		setShowUpdateMiscExpenseCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddMiscExpenseCostData = () => {
	// 	setNewMiscExpenseCost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddMiscExpenseCostModal(false)
	// }

	return (
		<Modal show={showUpdateMiscExpenseCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Chi phí:  {Content}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
			<Modal.Body>
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
							onChange={onChangeUpdatedMiscExpenseCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted  as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập số'
							name='Cost'
							value={Cost} /* tạo ràn buộc số */
							onChange={onChangeUpdatedMiscExpenseCostForm}
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
							onChange={onChangeUpdatedMiscExpenseCostForm}
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

export default UpdateMiscExpenseCostModal
