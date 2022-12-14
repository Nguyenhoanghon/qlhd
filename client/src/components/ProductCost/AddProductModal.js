import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ProductCostContext } from '../../contexts/ProductCostContext'

const AddProductCostModal = () => {
	// Contexts
	const {
		showAddProductCostModal,
		setShowAddProductCostModal,
		addProductCost,
		setShowToast
	} = useContext(ProductCostContext)

	// State
	const [newProductCost, setNewProductCost] = useState({
		ProductName: '',
        Quantity: '',
        EX_W: '', // nhap tu nuoc ngoai = true
        FOBCost: '', //if(EX_W = =true, req.body.FOBCost, 0)
        RatioUSD: '', //if(EX_W = =true, req.body.RatioUSD, 0)
        InputPrice: '', // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
        OutputPrice: '', // Nhap
        InputIntoMoney: '', // Can tinh  = Quantity * InputPrice
        OutputIntoMoney: '', //Can tinh =  Quantity * OutputPrice
        Insurance: '',
        Incentive: '',
        Note: '',
        ContractID:''
	}) //note là các biến trong 
	
	const { 
		ProductName,
		Quantity,
		EX_W,
		FOBCost,
		RatioUSD,
		InputPrice,
		OutputPrice,
		InputIntoMoney,
		OutputIntoMoney,
		Insurance,
		Incentive,
		Note,
		ContractID
	} = newProductCost //note

	const onChangeNewProductCostForm = event =>
		setNewProductCost({ ...newProductCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddProductCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addProductCost(newProductCost)
		resetAddProductCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddProductCostData = () => {
		setNewProductCost({ 
			ProductName: '',
			Quantity: '',
			EX_W: '', // nhap tu nuoc ngoai = true
			FOBCost: '', //if(EX_W = =true, req.body.FOBCost, 0)
			RatioUSD: '', //if(EX_W = =true, req.body.RatioUSD, 0)
			InputPrice: '', // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
			OutputPrice: '', // Nhap
			InputIntoMoney: '', // Can tinh  = Quantity * InputPrice
			OutputIntoMoney: '', //Can tinh =  Quantity * OutputPrice
			Insurance: '',
			Incentive: '',
			Note: '',
			ContractID
		}) //note cần sửa
		setShowAddProductCostModal(false)
	}

	return (
		<Modal show={showAddProductCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn muốn thêm Hàng Hóa?</Modal.Title>
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
						<Form.Text id='tenhang-help' muted as='h6'>
							Nhập tên hàng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Tên hàng'
							name='ProductName'
							required
							aria-describedby='tenhang-help'
							value={ProductName}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='xuatxu-help' muted as='h6'>
							Hàng được nhập từ Việt Nam hay nước ngoài?
						</Form.Text>
						<Form.Check 
							type={'radio'}
							id={0}
							value={EX_W}
							label = "Trong nước"
							name = 'EX_W'
							inline
						/>
						<Form.Check 
							type={'radio'}
							id={0}
							value={EX_W}
							label = "Nước ngoài"
							name = 'EX_W'
							inline
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='soluong-help' muted as='h6'>
							Số lượng
						</Form.Text>						
						<Form.Control
							type='text'
							placeholder='Số lượng'
							name='Quantity'
							required
							aria-describedby='soluong-help'
							value={Quantity}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Đơn giá FOB
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá FOB'
							name='FOBCost'
							required
							aria-describedby='dongiaFOB-help'
							value={FOBCost}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='RatioUSD-help' muted as='h6'>
							Tỷ giá USD
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='22400'
							name='RatioUSD'
							required
							value={RatioUSD}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='dongiakho-help' muted as='h6'>
							Đơn giá kho
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá kho'
							name='InputPrice'
							required
							value={InputPrice}
							onChange={onChangeNewProductCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='dongiaban-help' muted as='h6'>
							Đơn giá bán
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá bán'
							name='OutputPrice'
							required
							aria-describedby='dongiaban-help'
							value={OutputPrice}
							onChange={onChangeNewProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='xuatxu-help' muted as='h6'>
							Hàng hoá có tính chi phí bảo hiểm không?
						</Form.Text>
						<Form.Check 
							type={'checkbox'}
							id={0}
							value={Insurance}
							checked
							label = "Có tính chi phí bảo hiểm"
							name = 'Insurance'
							inline
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Incentive-help' muted as='h6'>
							Tiền thưởng từ đối tác
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Tiền thưởng từ đối tác'
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

export default AddProductCostModal
