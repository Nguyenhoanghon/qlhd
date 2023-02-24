import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'

const UpdateCost_GeneralExpense_Modal = () => {
	// Contexts
	const {
		update_GeneralExpense_Cost,
		Data_GeneralExpense_Cost,
		showUpdate_GeneralExpense_Cost_Modal,
		setshowUpdate_GeneralExpense_Cost_Modal,
		setShowToast
	} = useContext(ImplementationCostContext)
	
	const [updatedImplementationCost, setupdatedImplementationCost] = useState(Data_GeneralExpense_Cost)
	
	useEffect(() => setupdatedImplementationCost(Data_GeneralExpense_Cost), [Data_GeneralExpense_Cost])

	let { 
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
		setshowUpdate_GeneralExpense_Cost_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_GeneralExpense_Cost(updatedImplementationCost,Data_GeneralExpense_Cost)
		setshowUpdate_GeneralExpense_Cost_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdate_GeneralExpense_Cost_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>

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

export default UpdateCost_GeneralExpense_Modal
