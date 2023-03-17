import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useParams } from 'react-router-dom'

//Ham them giai doan
const UpdateStage_Modal = () => {
	//Contexts
	const {
		showUpdateStage_Modal,
		setshowUpdateStage_Modal,
		Data_update_Stage_Content,
		update_Stage_Content,
		setShowToast

	} = useContext(ImplementationCostContext)

	// State
	const [updateStageImplementation, setupdateStageImplementation] = useState(Data_update_Stage_Content)
	useEffect(() => setupdateStageImplementation(Data_update_Stage_Content),[Data_update_Stage_Content])

	let {
		idImplementation_Cost,
		idContentCost,
		Content,
	} = updateStageImplementation


	const onChangeNewImplementationCostForm = event =>
	setupdateStageImplementation({ ...updateStageImplementation, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdateStageImplementation(updateStageImplementation)
		setshowUpdateStage_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_Stage_Content(updateStageImplementation,Data_update_Stage_Content)
		setshowUpdateStage_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateStage_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật nội dung giai đoạn</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
						idImplementation_Cost
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='idImplementation_Cost'
							required
							aria-describedby='noidung-help'
							value={idImplementation_Cost}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='idContentCost-help' muted as="h6">
						idContentCost
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='idContentCost'
							required
							aria-describedby='idContentCost-help'
							value={idContentCost}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
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
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Cập nhật!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
export default UpdateStage_Modal