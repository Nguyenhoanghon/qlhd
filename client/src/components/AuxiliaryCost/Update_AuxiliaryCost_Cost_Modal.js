import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css'
import { useContext, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'

const Update_AuxiliaryCost_Cost_Modal = () => {
	// Contexts
	const {
		
		updateAuxiliary_Cost,
		Data_AuxiliaryCost_Cost,
		showupdate_AuxiliaryCost_Cost_Modal, setshowupdate_AuxiliaryCost_Cost_Modal,
		setShowToast
		
	} = useContext(AuxiliaryCostContext);

	const [updateAuxiliaryCost_Cost, setupdateAuxiliaryCost_Cost] = useState(Data_AuxiliaryCost_Cost)
	
	useEffect(() => setupdateAuxiliaryCost_Cost(Data_AuxiliaryCost_Cost), [Data_AuxiliaryCost_Cost])


	let {
		idcontract,
		Content,
		Cost,
		Note
	} = updateAuxiliaryCost_Cost

	//load idcontract
	const params = useParams();
	setupdateAuxiliaryCost_Cost.idcontract = params.id;

	
	const onChangeNewAuxiliaryCostForm = event =>
		setupdateAuxiliaryCost_Cost({ ...updateAuxiliaryCost_Cost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdateAuxiliaryCost_Cost(updateAuxiliaryCost_Cost)
		setshowupdate_AuxiliaryCost_Cost_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateAuxiliary_Cost(updateAuxiliaryCost_Cost, Data_AuxiliaryCost_Cost)//newAuxiliaryCost
		setshowupdate_AuxiliaryCost_Cost_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}


	return (
		<Modal show={showupdate_AuxiliaryCost_Cost_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Id Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='idcontract'
							value={idcontract}
							onChange={onChangeNewAuxiliaryCostForm}
						/>						
					</Form.Group> 
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
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập tỉ lệ % hoặc số tiền tuyệt đối'
							name='Cost'
							value={Cost}
							onChange={onChangeNewAuxiliaryCostForm}
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
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Cập nhật
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default Update_AuxiliaryCost_Cost_Modal
