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
		ShowAddIncentive_Modal,
		setShowAddIncentive_Modal,
		add_Incentive,
		setShowToast
	} = useContext(ProductCostContext)

	// State
	const [newProductCost, setNewProductCost] = useState({
		Incentive: "",
		contract: ""
	}) //note là các biến trong 

	const {
		Incentive,
		contract
	} = newProductCost //note


	const params = useParams();
	newProductCost.contract = params.idcontract;

	const onChangeNewProductCostForm = event =>
		setNewProductCost({ ...newProductCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddProductCostData()
		
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await add_Incentive(params.idcontract, newProductCost)
		resetAddProductCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddProductCostData = () => {
		setNewProductCost({
			Incentive: ""
		})
		setShowAddIncentive_Modal(false)
	}
	
	return (

		<Modal animation={false}  show={ShowAddIncentive_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Nhập Incentive</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{/* <Form.Group>
						<Form.Text id='contract-help' muted as='h6'>
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Contract_id'
							name='ContractID'
							required
							aria-describedby='contract-help'
							value={contract}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group> */}
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
