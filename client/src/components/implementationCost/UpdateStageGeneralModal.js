import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'

const UpdateStageGeneralModal = () => {
	// Contexts
	const {
		ImplementationCostState: { ImplementationCosts },
		update_GeneralExpense_Content,
		showUpdateStageGeneralModal,
		setShowUpdateStageGeneralModal,
		getImplementationCosts_byidContract,
		setShowToast
	} = useContext(ImplementationCostContext)
	// State use load on Form

	const [updatedImplementationCost, setupdatedImplementationCost] = useState(ImplementationCosts)

	useEffect(() => setupdatedImplementationCost(ImplementationCosts), [ImplementationCosts])
	//test data lay dc !!!!
	
	console.log("Get data=====>",updatedImplementationCost)

	//Chuan bi du lieu cap nhat
	const { 
		Content,
	 } = updatedImplementationCost //note
	 

	const onChangeUpdatedMiscExpenseCostForm = event =>
	setupdatedImplementationCost({ ...updatedImplementationCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdatedImplementationCost(updatedImplementationCost)
		setShowUpdateStageGeneralModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_GeneralExpense_Content(updatedImplementationCost)
		setShowUpdateStageGeneralModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateStageGeneralModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật  {Content}</Modal.Title>
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
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
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
