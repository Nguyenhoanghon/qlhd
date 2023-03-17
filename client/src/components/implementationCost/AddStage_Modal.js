import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useParams } from 'react-router-dom'

//Ham them giai doan
const AddStage_Modal = () => {
	//Contexts
	const {
		showAddStage_Modal,
		setshowAddStage_Modal,        //goi modal
		Data_update_Category,         //Get params truyền cho Url
		add_StageImplementation,      //Function them
		setShowToast                  //Show message

	} = useContext(ImplementationCostContext)

	//State luu thong tin 
	const [newStageImplementation, setnewStageImplementation] = useState({
		Content: '',
		idImplementation_Cost: ''
	})
	const { Content, idImplementation_Cost } = newStageImplementation
	//Load StagesImplementation_id
	newStageImplementation.idImplementation_Cost = Data_update_Category.idImplementation_Cost;

	const onChangeNewImplementationCostForm = event =>
		setnewStageImplementation({ ...newStageImplementation, [event.target.name]: event.target.value })

	const resetAddStageImplementationData = () => {
		setnewStageImplementation({ Content: '', idImplementation_Cost: '' })
		setshowAddStage_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await add_StageImplementation(newStageImplementation)//newImplementationCost
		resetAddStageImplementationData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const closeDialog = () => {
		resetAddStageImplementationData()
	}
	return (
		<Modal show={showAddStage_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm giai đoạn</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							StagesImplementation_id
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
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
export default AddStage_Modal