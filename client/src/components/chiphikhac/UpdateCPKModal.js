import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CPKContext } from '../../contexts/MiscExpenseContext'

const UpdateCPKModal = () => {
	// Contexts
	const {
		CPKState: { CPK },
		showUpdateCPKModal,
		setShowUpdateCPKModal,
		updateCPK,
		setShowToast
	} = useContext(CPKContext)

	// State
	const [updatedCPK, setUpdatedCPK] = useState(CPK)

	useEffect(() => setUpdatedCPK(CPK), [CPK])

	const { 
		Content, Cost, Note
	 } = updatedCPK //note

	const onChangeUpdatedCPKForm = event =>
		setUpdatedCPK({ ...updatedCPK, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCPK(CPK)
		setShowUpdateCPKModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCPK(updatedCPK)
		setShowUpdateCPKModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddCPKData = () => {
	// 	setNewCPK({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddCPKModal(false)
	// }

	return (
		<Modal show={showUpdateCPKModal} onHide={closeDialog}>
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
							onChange={onChangeUpdatedCPKForm}
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
							onChange={onChangeUpdatedCPKForm}
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
							onChange={onChangeUpdatedCPKForm}
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

export default UpdateCPKModal
