import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { GuaranteeLetterCostContext } from '../../contexts/GuaranteeLetterCostContext'

const UpdateGuaranteeLetterCostModal = () => {
	// Contexts
	const {
		GuaranteeLetterCostState: { GuaranteeLetterCost },
		showUpdateGuaranteeLetterCostModal,
		setShowUpdateGuaranteeLetterCostModal,
		updateGuaranteeLetterCost,
		setShowToast
	} = useContext(GuaranteeLetterCostContext)

	// State
	const [updatedGuaranteeLetterCost, setUpdatedGuaranteeLetterCost] = useState(GuaranteeLetterCost)

	useEffect(() => setUpdatedGuaranteeLetterCost(GuaranteeLetterCost), [GuaranteeLetterCost])

	const { 
		Content,
		Cost,
		QuantityMonths,
		RatioCost,
		IntoMoney,
		Note
	} = updatedGuaranteeLetterCost

	const onChangeUpdatedGuaranteeLetterCostForm = event =>
		setUpdatedGuaranteeLetterCost({ ...updatedGuaranteeLetterCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedGuaranteeLetterCost(GuaranteeLetterCost)
		setShowUpdateGuaranteeLetterCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateGuaranteeLetterCost(updatedGuaranteeLetterCost)
		setShowUpdateGuaranteeLetterCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateGuaranteeLetterCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí thư bảo lãnh?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
				<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
							onChange={onChangeUpdatedGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Giá trị thư bảo lãnh
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='Cost'
							required
							aria-describedby='gttbl-help'
							value={Cost}
							onChange={onChangeUpdatedGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Số tháng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='QuantityMonths'
							required
							aria-describedby='sothang-help'
							value={QuantityMonths}
							onChange={onChangeUpdatedGuaranteeLetterCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='tilephi-help' muted as='h6'>
							Tỉ lệ phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='0.02'
							name='RatioCost'
							required
							aria-describedby='tilephi-help'
							value={RatioCost}
							onChange={onChangeUpdatedGuaranteeLetterCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Ghi chú'
							name='Note'
							value={Note}
							onChange={onChangeUpdatedGuaranteeLetterCostForm}
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

export default UpdateGuaranteeLetterCostModal
