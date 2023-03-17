import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'


const Update_Category_Modal = () => {
	// Contexts
	const {
		showUpdate_Category_Modal,
		setshowUpdate_Category_Modal,
		Data_update_Category,
		setData_update_Category,
		update_Category,
		setShowToast
	} = useContext(ImplementationCostContext)

	// State
	const [updatedImplementationCost, setupdatedImplementationCost] = useState(Data_update_Category)
	useEffect(() => setupdatedImplementationCost(Data_update_Category),[Data_update_Category])

	let {
		idImplementation_Cost,
		Category,
	} = updatedImplementationCost

	const onChangeNewImplementationCostForm = event =>
		setupdatedImplementationCost({ ...updatedImplementationCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdatedImplementationCost(updatedImplementationCost)
		setshowUpdate_Category_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await update_Category(updatedImplementationCost,Data_update_Category)
		setshowUpdate_Category_Modal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdate_Category_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>UPDATE CATEGORY</Modal.Title>
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
						<Form.Text id='Category-help' muted as="h6">
							Nhập thông tin hạng mục
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Category'
							required
							aria-describedby='noidung-help'
							value={Category}
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

export default Update_Category_Modal

