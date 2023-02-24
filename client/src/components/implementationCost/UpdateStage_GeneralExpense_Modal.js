import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'

const UpdateStageGeneralModal = () => {
	// Contexts
	const {
		Data_GeneralExpense_Content,
		update_GeneralExpense_Content,
		showUpdate_Stage_GeneralExpense_Modal,
		setShowUpdate_Stage_GeneralExpense_Modal,
		setShowToast
	} = useContext(ImplementationCostContext)
	
	const [updatedImplementationCost, setupdatedImplementationCost] = useState(Data_GeneralExpense_Content)
	
	useEffect(() => setupdatedImplementationCost(Data_GeneralExpense_Content), [Data_GeneralExpense_Content])

	let { 
		_id,
		GeneralExpense_id,
		GeneralExpense_Content
	 } = updatedImplementationCost

	const onChangeUpdatedMiscExpenseCostForm = event =>
		setupdatedImplementationCost({ ...updatedImplementationCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdatedImplementationCost(updatedImplementationCost)
		setShowUpdate_Stage_GeneralExpense_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_GeneralExpense_Content(updatedImplementationCost,Data_GeneralExpense_Content)
		setShowUpdate_Stage_GeneralExpense_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdate_Stage_GeneralExpense_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật  {}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung giai đoạn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='GeneralExpense_Content'
							required
							aria-describedby='noidung-help'
							value={GeneralExpense_Content}
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

export default UpdateStageGeneralModal
