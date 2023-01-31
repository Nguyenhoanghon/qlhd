import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'

const AddAuxiliaryCostModal = () => {
	// Contexts
	const {
		showAddAuxiliaryCostModal,
		setShowAddAuxiliaryCostModal,
		addAuxiliaryCost,
		setShowToast
	} = useContext(AuxiliaryCostContext)

	// State
	const [updatedAuxiliaryCost, setupdatedAuxiliaryCost] = useState({
		Revenue: '', // Load form 1
        Plan:'', // Lua chon gia tri
        Content:'',
        Cost:'', // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL:'',
        CPgross:'',
        Note:'',
        ContractID:''
	})

	const { 
		Revenue, // Load từ form 1
        Plan, // Lua chon gia tri
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL,
        CPgross,
        Note,
        ContractID
	 } = updatedAuxiliaryCost
	 //load idcontract
	const params = useParams();
	updatedAuxiliaryCost.ContractID = params.id;

	const onChangeupdatedAuxiliaryCostForm = event =>
		setupdatedAuxiliaryCost({ ...updatedAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddAuxiliaryCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addAuxiliaryCost(updatedAuxiliaryCost)//updatedAuxiliaryCost
		resetAddAuxiliaryCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddAuxiliaryCostData = () => {
		setupdatedAuxiliaryCost({
			Revenue: '', // Load form 1
			Plan:'', // Lua chon gia tri
			Content:'',
			Cost:'', // = if(Cost<1; Cost*CapitalCost ; Cost)
			CPXL:'',
			CPgross:'',
			Note:'',
			ContractID:''
		})
		setShowAddAuxiliaryCostModal(false)
	}

	return (
		<Modal show={showAddAuxiliaryCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm Chi phí vật tư phụ</Modal.Title>
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
							onChange={onChangeupdatedAuxiliaryCostForm}
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
							onChange={onChangeupdatedAuxiliaryCostForm}
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
							onChange={onChangeupdatedAuxiliaryCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted  as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập tỉ lệ % hoặc số tiền tuyệt đối'
							name='Cost'
							value={Cost} /* tạo ràn buộc số */
							onChange={onChangeupdatedAuxiliaryCostForm}
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
							onChange={onChangeupdatedAuxiliaryCostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddAuxiliaryCostModal
