import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'

const UpdateAuxiliaryCostModal = () => {
	// Contexts
	const {
		AuxiliaryCostState: { AuxiliaryCost },
		showUpdateAuxiliaryCostModal,
		setShowUpdateAuxiliaryCostModal,
		updateAuxiliaryCost,
		setShowToast
	} = useContext(AuxiliaryCostContext)

	// State
	const [updatedAuxiliaryCost, setUpdatedAuxiliaryCost] = useState(AuxiliaryCost)

	useEffect(() => setUpdatedAuxiliaryCost(AuxiliaryCost), [AuxiliaryCost])

	const { 
		Revenue, // Load từ form 1
        Plan, // Lua chon gia tri
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL,
        CPgross,
        Note,
        ContractID
	 } = updatedAuxiliaryCost //note

	const onChangeUpdatedAuxiliaryCostForm = event =>
		setUpdatedAuxiliaryCost({ ...updatedAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedAuxiliaryCost(AuxiliaryCost)
		setShowUpdateAuxiliaryCostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateAuxiliaryCost(updatedAuxiliaryCost)
		setShowUpdateAuxiliaryCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddAuxiliaryCostData = () => {
	// 	setNewAuxiliaryCost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddAuxiliaryCostModal(false)
	// }

	return (
		<Modal show={showUpdateAuxiliaryCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật: {ContractID}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
			<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							value={ContractID}
							onChange={onChangeUpdatedAuxiliaryCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Plan-help' muted as="h6">
							Chọn phương án
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập 1 Hoặc 2'
							name='Plan'
							required
							aria-describedby='Plan-help'
							value={Plan}
							onChange={onChangeUpdatedAuxiliaryCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
							onChange={onChangeUpdatedAuxiliaryCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted  as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập số'
							name='Cost'
							value={Cost} /* tạo ràn buộc số */
							onChange={onChangeUpdatedAuxiliaryCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as="h6">
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Nhập chuỗi'
							name='Note'
							value={Note}
							onChange={onChangeUpdatedAuxiliaryCostForm}
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

export default UpdateAuxiliaryCostModal
