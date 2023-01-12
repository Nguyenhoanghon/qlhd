import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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

	// const resetAddProductCostData = () => {
	// 	setNewProductCost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddProductCostModal(false)
	// }

	return (
		<Modal show={showUpdateProductCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Hàng Hóa ?</Modal.Title>
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
							onChange={onChangeUpdatedProductCostForm}
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
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='xuatxu-help' muted as='h6'>
							Hàng hoá nhập từ nước ngoài
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='1 nếu nhập từ nước ngoại, 0 nhập trong nước'
							name='EX_W'
							required
							aria-describedby='tenhang-help'
							value={EX_W}
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
							onChange={onChangeUpdatedProductCostForm}
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
							required
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
						<Form.Text id='Insurance-help' muted as='h6'>
							Hàng hoá có tính chi phí bảo hiểm không?
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Có bảo hiển nhâpj 1'
							name='Insurance'
							value={Insurance}
							onChange={onChangeUpdatedProductCostForm}
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
