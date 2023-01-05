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

	const {  tenhang, soluong, dongiaFOB, dongiakho, thanhtiengiakho, dongiaban, thanhtiengiaban,  ghichu } = updatedProductCost //note

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
						<Form.Text id='tenhang-help' muted as='h6'>
							Tên hàng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='tenhang'
							name='tenhang'
							required
							aria-describedby='tenhang-help'
							value={tenhang}
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
							name='soluong'
							required
							aria-describedby='soluong-help'
							value={soluong}
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
							name='dongiaFOB'
							required
							aria-describedby='dongiaFOB-help'
							value={dongiaFOB}
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
							name='dongiakho'
							required
							aria-describedby='dongiakho-help'
							value={dongiakho}
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
							name='dongiaban'
							required
							aria-describedby='dongiaban-help'
							value={dongiaban}
							onChange={onChangeUpdatedProductCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Ghichu-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Ghi chú'
							name='ghichu'
							required
							aria-describedby='ghichu-help'
							value={ghichu}
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
