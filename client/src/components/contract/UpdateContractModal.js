import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ContractContext } from '../../contexts/ContractContext'

const UpdateContractModal = () => {
	// Contexts
	const {
		ContractState: { Contract },
		showUpdateContractModal,
		setShowUpdateContractModal,
		updateContract,
		setShowToast
	} = useContext(ContractContext)

	// State
	const [updatedContract, setUpdatedContract] = useState(Contract)

	useEffect(() => setUpdatedContract(Contract), [Contract])

	const { Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
	 } = updatedContract //note

	const onChangeUpdatedContractForm = event =>
		setUpdatedContract({ ...updatedContract, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedContract(Contract)
		setShowUpdateContractModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateContract(updatedContract)
		setShowUpdateContractModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddContractData = () => {
	// 	setNewContract({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddContractModal(false)
	// }

	return (
		<Modal show={showUpdateContractModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Contract ?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
			<Modal.Body>
					<Form.Group>
						<Form.Text id='Center-help' muted as="h6">
						Center
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Center'
							required
							aria-describedby='Center-help'
							value={Center}
							onChange={onChangeUpdatedContractForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Deparment-help' muted  as="h6">
						Deparment
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Deparment'
							value={Deparment}
							onChange={onChangeUpdatedContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='CustomerID-help' muted  as="h6">
						CustomerID
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='CustomerID'
							value={CustomerID}
							onChange={onChangeUpdatedContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ContractID-help' muted  as="h6">
							ContractID
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ContractID'
							value={ContractID}
							onChange={onChangeUpdatedContractForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Date-help' muted  as="h6">
							Date
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Date'
							value={Date}
							onChange={onChangeUpdatedContractForm}
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

export default UpdateContractModal
