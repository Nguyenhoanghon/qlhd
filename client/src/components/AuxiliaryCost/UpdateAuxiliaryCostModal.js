import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'
import { ProductCostContext } from '../../contexts/ProductCostContext'


const UpdateAuxiliaryCostModal = () => {
	// hàm tính tổng 
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}
	// Contexts
	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCostsLoading },
		showUpdateAuxiliaryCostModal,
		setShowUpdateAuxiliaryCostModal,
		updateAuxiliaryCost,
		getAuxiliaryCosts_byidContract,
		setShowToast
	} = useContext(AuxiliaryCostContext)
	const {
		ProductCostState: { ProductCosts },
		getProductCost_byidContract
	} = useContext(ProductCostContext)
	const params = useParams();
	// State get data AuxiliaryCost
	const [updatedAuxiliaryCost, setupdatedAuxiliaryCost] = useState(AuxiliaryCost)
	useEffect(() => setupdatedAuxiliaryCost(AuxiliaryCost), [AuxiliaryCost])
	//State get data Tong Doanh thu
	console.log("=====> id",params.id)
	useEffect(() => getProductCost_byidContract(params.id), [])
	console.log("=====> ProductCosts",ProductCosts)
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney));//note
	
	const {
		Revenue, // Load từ form 1
		Plan, // Lua chon gia tri
		Plan1,
		Content,
		Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
		Note,
		ContractID
	} = updatedAuxiliaryCost
	//load idcontract
	
	updatedAuxiliaryCost.ContractID = params.id;
	updatedAuxiliaryCost.Revenue = TotalOutputIntoMoney;
	//Checkbox Phuong an
	const togglePlan = event => {
		setupdatedAuxiliaryCost({ ...updatedAuxiliaryCost, Plan: event })

	};

	const onChangeupdatedAuxiliaryCostForm = event =>
		setupdatedAuxiliaryCost({ ...updatedAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setupdatedAuxiliaryCost(AuxiliaryCost)
		setShowUpdateAuxiliaryCostModal(false)

	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateAuxiliaryCost(updatedAuxiliaryCost)//updatedAuxiliaryCost
		setShowUpdateAuxiliaryCostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateAuxiliaryCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm Chi phí vật tư phụ</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Tong doanh thu
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							value={Revenue}
							onChange={onChangeupdatedAuxiliaryCostForm}
						/>						
					</Form.Group>
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
							name='Plan'
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
							onChange={onChangeupdatedAuxiliaryCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted as="h6">
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

export default UpdateAuxiliaryCostModal
