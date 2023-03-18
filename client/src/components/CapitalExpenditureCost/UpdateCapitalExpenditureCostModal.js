import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CapitalExpenditureCostContext } from '../../contexts/CapitalExpenditureCostContext'

const UpdateCapitalExpenditureCostModal = () => {
	// Contexts
	const {
		CapitalExpenditureCostState: { CapitalExpenditureCost },
		showUpdateCapitalExpenditureCostModal,
		setShowUpdateCapitalExpenditureCostModal,
		updateCapitalExpenditureCost,
		setShowToast
	} = useContext(CapitalExpenditureCostContext)

	// State
	const [updatedCapitalExpenditureCost, setUpdatedCapitalExpenditureCost] = useState(CapitalExpenditureCost)

	useEffect(() => setUpdatedCapitalExpenditureCost(CapitalExpenditureCost), [CapitalExpenditureCost])

	const {
		InventoryDays,
		ImplementationDays,
		BedtDays,
		DebtCollectionDays,
		Note
	} = updatedCapitalExpenditureCost

	//load idcontract
	const params = useParams();
	updatedCapitalExpenditureCost.ContractID = params.id;

	const onChangeUpdatedCapitalExpenditureCostForm = event =>
		setUpdatedCapitalExpenditureCost({ ...updatedCapitalExpenditureCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCapitalExpenditureCost(CapitalExpenditureCost)
		setShowUpdateCapitalExpenditureCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCapitalExpenditureCost(updatedCapitalExpenditureCost)
		setShowUpdateCapitalExpenditureCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}
	
	return (
		<Modal show={showUpdateCapitalExpenditureCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí vốn ?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					
					{/* <Form.Group>
						<Form.Text id='ContractID' muted as='h6'>
							Chọn hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							value={ContractID}
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
						/>						
					</Form.Group> */}
					
					<Form.Group>
						<Form.Text id='InventoryDays' muted as='h6'>
							Số ngày hàng tồn kho
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='InventoryDays'
							name='InventoryDays'
							value={InventoryDays.toLocaleString()}
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
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
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
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
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
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
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
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
							onChange={onChangeUpdatedCapitalExpenditureCostForm}
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

export default UpdateCapitalExpenditureCostModal
