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
        Note: ''
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
        Note
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
				<Modal.Title as='h5'>Bạn muốn thêm chi phí vốn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='CapitalCost' muted as='h6'>
							Giá vốn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='CapitalCost'
							value={CapitalCost}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='giaban' muted as='h6'>
							Doanh thu
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='load form 1'
							name='Revenue'
							value={Revenue.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='CapitalExpense' muted as='h6'>
							Chi phí vốn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='load form 1'
							name='CapitalExpense'
							value={CapitalExpense.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='InventoryDays' muted as='h6'>
							Số ngày hàng tồn kho
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
						Số ngày triển khai
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
						Số ngày công nợ nhà cung cấp
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
							Số ngày thu nợ
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
						<Form.Text id='Deposits' muted as='h6'>
							Khách hàng trả trước (đặt cọc)
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Deposits'
							name='Deposits'
							value={Deposits.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='DepositsNTP' muted as='h6'>
							Đặt cọc cho NTP
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='DepositsNTP'
							name='DepositsNTP'
							value={DepositsNTP.toLocaleString()}
							onChange={onChangeNewCapitalExpenditureCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Note' muted as='h6'>
							Ghi chú
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
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddCapitalExpenditureCostModal
