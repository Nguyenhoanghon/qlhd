import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ContractContext } from '../../contexts/ContractContext'

const AddContractModal = () => {
	// Contexts
	const {
		showAddContractModal,
		setShowAddContractModal,
		addContract,
		setShowToast
	} = useContext(ContractContext)

	// State
	const [newContract, setNewContract] = useState({
		Center: '',
		Deparment: '',
		CustomerID: '',
		ContractID: '',
		Date: ''
	})

	const { 
		Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
	} = newContract

	const onChangeNewContractForm = event =>
		setNewContract({ ...newContract, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddContractData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addContract(newContract) 
		resetAddContractData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddContractData = () => {
		setNewContract({ 
			Center: '',
			Deparment: '',
			CustomerID: '',
			ContractID: '',
			Date: ''
	 	})
		setShowAddContractModal(false)
	}

	return (
		<Modal show={showAddContractModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn muốn thêm Hợp đồng?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='Center-help' muted as="h6">
						 Trung tâm phụ trách hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Center'
							required
							aria-describedby='Center-help'
							value={Center}
							onChange={onChangeNewContractForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Deparment-help' muted  as="h6">
						Phòng ban phụ trách hợp đồng 
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Deparment'
							value={Deparment}
							onChange={onChangeNewContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='CustomerID-help' muted  as="h6">
						 Thông tin khách hàng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='CustomerID'
							value={CustomerID}
							onChange={onChangeNewContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ContractID-help' muted  as="h6">
							Số hợp đồng/PO 
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ContractID'
							value={ContractID}
							onChange={onChangeNewContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Date-help' muted  as="h6">
						Ngày… Tháng… Năm…  của hợp đồng 
						</Form.Text>
						<Form.Control
							type='date'
							placeholder=''
							name='Date'
							value={Date}
							onChange={onChangeNewContractForm}
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

export default AddContractModal
