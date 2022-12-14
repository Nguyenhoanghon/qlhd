import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { CapitalExpenditureCostContext } from '../../contexts/CapitalExpenditureCostContext'

const AddCapitalExpenditureCostModal = () => {
	// Contexts
	const {
		showAddCapitalExpenditureCostModal,
		setShowAddCapitalExpenditureCostModal,
		addCapitalExpenditureCost,
		setShowToast
	} = useContext(CapitalExpenditureCostContext)

	// State
	const [newCapitalExpenditureCost, setNewCapitalExpenditureCost] = useState({
		CapitalCost: '', 
        Revenue: '',
        CapitalExpense: '',
        InventoryDays: '',
        ImplementationDays: '',
        BedtDays: '',
        DebtCollectionDays: '',
        Deposits: '',
        DepositsNTP: '',
        Note: '',
		ContractID:''
	})

	const { 
		CapitalCost, 
        Revenue,
        CapitalExpense,
        InventoryDays,
        ImplementationDays,
        BedtDays,
        DebtCollectionDays,
        Deposits,
        DepositsNTP,
        Note,
		ContractID
	} = newCapitalExpenditureCost

	const onChangeNewCapitalExpenditureCostForm = event =>
		setNewCapitalExpenditureCost({ ...newCapitalExpenditureCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddCapitalExpenditureCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCapitalExpenditureCost(newCapitalExpenditureCost)
		resetAddCapitalExpenditureCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddCapitalExpenditureCostData = () => {
		setNewCapitalExpenditureCost({ 
			CapitalCost: '', 
			Revenue: '',
			CapitalExpense: '',
			InventoryDays: '',
			ImplementationDays: '',
			BedtDays: '',
			DebtCollectionDays: '',
			Deposits: '',
			DepositsNTP: '',
			Note: ''
		 })
		setShowAddCapitalExpenditureCostModal(false)
	}

	return (
		<Modal show={showAddCapitalExpenditureCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h5'>B???n mu???n th??m chi ph?? v???n?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='ContractID' muted as='h6'>
							Ch???n h???p ?????ng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nh???p chu???i'
							name='ContractID'
							value={ContractID}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='InventoryDays' muted as='h6'>
							S??? ng??y h??ng t???n kho
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='InventoryDays'
							name='InventoryDays'
							value={InventoryDays.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='ImplementationDays' muted as='h6'>
						S??? ng??y tri???n khai
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='ImplementationDays'
							name='ImplementationDays'
							value={ImplementationDays.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='BedtDays' muted as='h6'>
						S??? ng??y c??ng n??? nh?? cung c???p
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='BedtDays'
							name='BedtDays'
							value={BedtDays.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='DebtCollectionDays' muted as='h6'>
							S??? ng??y thu n???
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='DebtCollectionDays'
							name='DebtCollectionDays'
							value={DebtCollectionDays.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Note' muted as='h6'>
							Ghi ch??
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Note'
							name='Note'
							value={Note}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						H???y
					</Button>
					<Button variant='primary' type='submit'>
						Th??m!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddCapitalExpenditureCostModal
