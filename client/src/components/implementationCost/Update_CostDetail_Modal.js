import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'

const Update_CostDetail_Modal = () => {
	// Contexts
	const {
		setshowUpdate_CostDetail_Modal, //Goi modal Update
		showUpdate_CostDetail_Modal,
		DataUpdate_Click_On_Button,
		setDataUpdate_Click_On_Button,  //Get Params truyen cho Url Add
		update_CostDetail_Function,

		setShowToast
	} = useContext(ImplementationCostContext)

	const [updatedImplementationCost, setupdatedImplementationCost] = useState(DataUpdate_Click_On_Button)

	useEffect(() => setupdatedImplementationCost(DataUpdate_Click_On_Button), [DataUpdate_Click_On_Button])

	let {
		Implementation_Cost_Id,
		ContentCostId,
		idCost,
		NameCost,
		Units,
		UnitPrice,
		Quantity_days,
		Quantity_times,
		IntoMoney,
		Note
	} = updatedImplementationCost

	const onChangeForm = event =>
		setupdatedImplementationCost({ ...updatedImplementationCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdatedImplementationCost(updatedImplementationCost)
		setshowUpdate_CostDetail_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_CostDetail_Function(updatedImplementationCost, DataUpdate_Click_On_Button)
		setshowUpdate_CostDetail_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdate_CostDetail_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
				<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Implementation_Cost_Id
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Implementation_Cost_Id'
							required
							aria-describedby='noidung-help'
							value={Implementation_Cost_Id}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							id ContentCostId
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ContentCostId'
							required
							aria-describedby='noidung-help'
							value={ContentCostId}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							id Cost
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='idCost'
							required
							aria-describedby='noidung-help'
							value={idCost}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Nội dung dự trù
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='NameCost'
							required
							aria-describedby='noidung-help'
							value={NameCost}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Đơn vị
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Units'
							aria-describedby='noidung-help'
							value={Units}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Đơn giá
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='UnitPrice'
							required
							aria-describedby='noidung-help'
							value={UnitPrice}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Ngày/Lượt
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Quantity_times'
							required
							aria-describedby='noidung-help'
							value={Quantity_times}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Số người
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Quantity_days'
							required
							aria-describedby='noidung-help'
							value={Quantity_days}
							onChange={onChangeForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Ghi chú
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Note'
							aria-describedby='noidung-help'
							value={Note}
							onChange={onChangeForm}
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

export default Update_CostDetail_Modal
