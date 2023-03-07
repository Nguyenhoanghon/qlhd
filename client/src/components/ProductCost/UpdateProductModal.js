import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ProductCostContext } from '../../contexts/ProductCostContext'

const UpdateProductCostModal = () => {
	// Contexts
	const {
		ProductCostState: { ProductCost },
		showUpdateProductCostModal,
		setShowUpdateProductCostModal,
		updateProductCost,
		setShowToast
	} = useContext(ProductCostContext)

	// State
	const [updatedProductCost, setUpdatedProductCost] = useState(ProductCost)

	useEffect(() => setUpdatedProductCost(ProductCost), [ProductCost])

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
		} = updatedProductCost //note

	const params = useParams();
	//Ham Load id contract
	updatedProductCost.ContractID = params.id
	
	//Checkbox nguon nhap
	const toggleEX_W = event => {
		setUpdatedProductCost({ ...updatedProductCost, EX_W: event })
		
	};

	//Ham checkbox Insurance
	const toggleInsurance = event => {
		setUpdatedProductCost({ ...updatedProductCost, Insurance: event })
	};

	setUpdatedProductCost.ContractID = params.id;

	const onChangeUpdatedProductCostForm = event =>
		setUpdatedProductCost({ ...updatedProductCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedProductCost(ProductCost)
		setShowUpdateProductCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateProductCost(updatedProductCost)
		setShowUpdateProductCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateProductCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Hàng Hóa ?</Modal.Title>
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
							value={ContractID}
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group> */}
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
							onChange={onChangeUpdatedProductCostForm}
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
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='xuatxu-help' muted as='h6'>
							Nguồn nhập hàng
						</Form.Text>
						<Form.Check
								type='checkbox'
								checked={EX_W}
								value={EX_W}
								onChange={(e) => toggleEX_W(e.target.checked)}
								label={'Nhập từ nước ngoài'}
							/>
					</Form.Group>
					
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Đơn giá FOB
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='FOBCost'
							readOnly={!EX_W}
							aria-describedby='dongiaFOB-help'
							value={FOBCost}
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='RatioUSD-help' muted as='h6'>
							Tỷ giá USD
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='RatioUSD'
							readOnly={!EX_W}
							value={RatioUSD}
							onChange={onChangeUpdatedProductCostForm}
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
							readOnly={EX_W}
							value={InputPrice}
							onChange={onChangeUpdatedProductCostForm}
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
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							type='checkbox'
							checked={Insurance}
							value={Insurance}
							onChange={(e) => toggleInsurance(e.target.checked)}
							label={'Hàng hoá có tính chi phí bảo hiểm'}
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
							onChange={onChangeUpdatedProductCostForm}
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
							onChange={onChangeUpdatedProductCostForm}
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

export default UpdateProductCostModal
