import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ProductCostContext } from '../../contexts/ProductCostContext'
import { useParams } from 'react-router-dom'
import '../App.css'
const Add_Incentive = () => {

	// Contexts 
	const {
		ShowAdd_Incentive,
		setShowAdd_Incentive,
		setShowAddProductCostModal,
		addProductCost,
		setShowToast
	} = useContext(ProductCostContext)

	// State
	const [newProductCost, setNewProductCost] = useState({
		Incentive: 0,
		Note: '',
		ContractID: ''
	}) //note là các biến trong 

	const {
		Incentive,
		Note,
		ContractID
	} = newProductCost //note


	const params = useParams();
	newProductCost.ContractID = params.id;
	
	//Checkbox nguon nhap
	const toggleEX_W = event => {
		setNewProductCost({ ...newProductCost, EX_W: event })
		
	};

	//Ham checkbox Insurance
	const toggleInsurance = event => {
		setNewProductCost({ ...newProductCost, Insurance: event })
	};

	const onChangeNewProductCostForm = event =>
		setNewProductCost({ ...newProductCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddProductCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addProductCost(params.id, newProductCost)
		resetAddProductCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddProductCostData = () => {
		setNewProductCost({
			Incentive: 0,
			Note: '',
			ContractID: ''
		}) //note cần sửa
		setShowAdd_Incentive(false)
	}
	
	return (

		<Modal animation={false}  show={ShowAdd_Incentive} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm Hàng Hóa</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='contract-help' muted as='h6'>
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Contract_id'
							name='ContractID'
							required
							aria-describedby='contract-help'
							value={ContractID}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Incentive-help' muted as='h6'>
							Tiền thưởng từ đối tác
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Incentive'
							required
							aria-describedby='Incentive-help'
							value={Incentive}
							onChange={onChangeNewProductCostForm}
						/>

					</Form.Group>
					<Form.Group>
						<Form.Text id='Note-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Ghi chú'
							name='Note'
							aria-describedby='Note-help'
							value={Note}
							onChange={onChangeNewProductCostForm}
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

export default Add_Incentive
