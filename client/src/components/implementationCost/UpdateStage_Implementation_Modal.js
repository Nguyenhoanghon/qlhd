import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'

const UpdateStage_Implementation_Content_Modal = () => {
	// Contexts
	const {
		Data_StagesImplementation_Content,
		setData_StagesImplementation_Content,
		update_StagesImplementation_Content,
		showUpdate_Stage_StagesImplementation_Modal,
		setshowUpdate_Stage_StagesImplementation_Modal,
		delete_Stage_StageImplementation, 
		setShowToast
	} = useContext(ImplementationCostContext)

	console.log("showUpdate_Stage_StagesImplementation_Modal====",showUpdate_Stage_StagesImplementation_Modal)
	const [dataUpdate, setdataUpdate] = useState(Data_StagesImplementation_Content)
	
	useEffect(() => setdataUpdate(Data_StagesImplementation_Content), [Data_StagesImplementation_Content])

	let { 
		_id,
		StagesImplementation_id,
		StagesImplementation_Content
	 } = dataUpdate
	 
	const onChange_dataUpdateForm = event =>
	setdataUpdate({ ...dataUpdate, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setdataUpdate(dataUpdate)
		setshowUpdate_Stage_StagesImplementation_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_StagesImplementation_Content(dataUpdate,Data_StagesImplementation_Content)
		setshowUpdate_Stage_StagesImplementation_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdate_Stage_StagesImplementation_Modal} onHide={closeDialog}>
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
							name='StagesImplementation_Content'
							required
							aria-describedby='noidung-help'
							value={StagesImplementation_Content}
							onChange={onChange_dataUpdateForm}
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

export default UpdateStage_Implementation_Content_Modal
