import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css'
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
	const [newAuxiliaryCost, setNewAuxiliaryCost] = useState({
		Revenue: '', // Load form 1
        Plan: false, // Lua chon gia tri
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
		Plan1,
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL,
        CPgross,
        Note,
        ContractID
	 } = newAuxiliaryCost
	 //load idcontract
	const params = useParams();
	newAuxiliaryCost.ContractID = params.id;

	//Checkbox Phuong an
	const togglePlan = event => {
		setNewAuxiliaryCost({ ...newAuxiliaryCost, Plan: event })
		
	};
//Checkbox nguon nhap
/* const toggleEX_W = event => {
	setNewProductCost({ ...newProductCost, EX_W: event })
	
}; */
	const onChangeNewAuxiliaryCostForm = event =>
		setNewAuxiliaryCost({ ...newAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddAuxiliaryCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addAuxiliaryCost(newAuxiliaryCost)//newAuxiliaryCost
		resetAddAuxiliaryCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddAuxiliaryCostData = () => {
		setNewAuxiliaryCost({
			Revenue: '', // Load form 1
			Plan: false, // Lua chon gia tri
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
					{/* <Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							value={ContractID}
							onChange={onChangeNewAuxiliaryCostForm}
						/>						
					</Form.Group> */}
					<Form.Group>
						<Form.Text id='Plan-help' muted as="h6">
							Chọn phương án chi
						</Form.Text>
						<Form.Control className='switch'
								type='radio'//checkbox
								checked={true}
								value={Plan1}
								name='Plan'
								onChange={(e) => togglePlan(e.target.checked)}
							/>
							<span>Phuong an 1</span>
						<Form.Control className='switch'
								type='radio'//checkbox
								checked={Plan}
								value={Plan}
								name = 'Plan'
								onChange={(e) => togglePlan(e.target.checked)}
							/>
							<span>Phuong an 2</span>
						{/* <Form.Control
							type='text'
							placeholder='Nhập 1 Hoặc 2'
							name='Plan'
							required
							aria-describedby='Plan-help'
							value={Plan}
							onChange={onChangeNewAuxiliaryCostForm}
						/>		 */}				
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
							onChange={onChangeNewAuxiliaryCostForm}
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
							onChange={onChangeNewAuxiliaryCostForm}
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
							onChange={onChangeNewAuxiliaryCostForm}
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
