
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
import Table from 'react-bootstrap/Table'

//Contexts
import { AuthContext } from '../contexts/AuthContext'
import { ContractContext } from '../contexts/ContractContext'
import { ProductCostContext } from '../contexts/ProductCostContext'

//Components
import {ActionButtons_Contract} from '../components/contract/ActionButtons_Contract'
import AddContractModal from '../components/contract/AddContractModal'
import UpdateContractModal from '../components/contract/UpdateContractModal'
import ActionButtons_ProductCost from '../components/ProductCost/ActionButtons_ProductCost'



//View list các Forms cần nhập
export const Summary = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		ContractState: { Contract, Contracts, ContractsLoading },
		getContracts,
		setShowAddContractModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ContractContext)

	// Start: Get all Contracts
	useEffect(() => getContracts(), [])

	let body = null
	let stt = 1
	//const tong =  sumArray(Contracts.map((Contract) => Contract.sotien))
	if (ContractsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (Contracts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'> QUẢN LÝ HỢP ĐỒNG</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ HỢP ĐỒNG</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddContractModal.bind(this, true)}
						>
							Thêm!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'> QUẢN LÝ HỢP ĐỒNG</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Số hợp đồng/PO</th>
								<th>Trung tâm</th>
								<th>Phòng</th>
								<th>Khách Hàng</th>
								<th>Ngày</th>
								<th>ID</th>
								</tr>
							</thead>
							<tbody>
								{Contracts.map(Contract => ( 
									<tr key={Contract._id} >
									<td>{stt++}  </td>
									<td>{Contract.ContractID}</td>
									<td>{Contract.Center}</td>
									<td>{Contract.Deparment}</td>
									<td>{Contract.CustomerID}</td>
									<td>{Contract.Date}</td>
									<td>{Contract._id}</td>
									<td>
									<a href={`/summary/${Contract._id}`}>Xem PTHD</a>
									<ActionButtons_Contract _id={Contract._id} />
									</td>
								
								</tr>
								
								))
								}
								
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddContractModal.bind(this, true)}
						>
							Thêm mới
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	}

	return (
		<>
			{body}
			<AddContractModal />

			{Contract !== null && <UpdateContractModal />}
			{/* After Contract is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

//View Contract_id Phân tích hợp đồng tổng thể
export const Summary_id = () => {
	const params = useParams();
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)
	//===Get data Contract with idContract
	const {
		ContractState: { Contracts },
		getContract_byid,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ContractContext)
	// Start: Get  Contracts by ID
	useEffect(() => getContract_byid(params.id),[])

	//console.log("Contract",Contracts)
	//===End Get data Contract with idContract

	//=== Get productcosts with idcontract
	const {
		ProductCostState: { ProductCost, ProductCosts, ProductCostsLoading },
		getProductCost_byidContract,
		setShowAddProductCostModal
	} = useContext(ProductCostContext)
	// hàm tính tổng thành tiền
	function sumArray(mang){
		let sum = 0;
		mang.map(function(value){
			sum += value;
		});
		return sum;
		}
	
		// Start: Get ProductCosts by id Contract
		useEffect(() => getProductCost_byidContract(params.id), [])

		const TotalInputIntoMoney =  sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
		const TotalOutputIntoMoney =  sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
		const TotalIncentive =  sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note
		

	//=== End Get productcosts with idcontract
	

	let body = null
	let stt = 1
	let TT = 1

	return (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>BẢNG PHÂN TÍCH HIỆU QUẢ HỢP ĐỒNG - DỰ ÁN </Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Số hợp đồng/PO</th>
								<th>Trung tâm</th>
								<th>Phòng</th>
								<th>Khách Hàng</th>
								<th>Ngày</th>
								<th>ID</th>
								</tr>
							</thead>
							<tbody>
								{Contracts.map(Contract => ( 
									<tr key={Contract._id}>
									<td>{stt++}  </td>
									<td>{Contract.ContractID}</td>
									<td>{Contract.Center}</td>
									<td>{Contract.Deparment}</td>
									<td>{Contract.CustomerID}</td>
									<td>{Contract.Date}</td>
									<td>{Contract._id}</td>
									<td>
									
									</td>
								
								</tr>
								
								))
								}
								
							</tbody>
    					</Table>
						<Table responsive="sm" striped bordered hover size="sm" >
							<thead>
								 <tr>
									<th rowSpan="2">STT</th>
									<th rowSpan="2" width="15%">Tên hàng</th>
									<th rowSpan="2" width="5%">Số lượng </th>
									<th colSpan="3">Giá vốn hàng bán Giá kho</th>
									<th colSpan="2 ">Doanh số Giá bán</th>
									<th rowSpan="2 " width="8%">Có tính Chi Phí Bảo Hiểm  </th>
									<th rowSpan="2">Incentive</th>
									<th rowSpan="2">Tỷ giá USD</th>
									<th rowSpan="2">Ghi chú</th>
									{/*<th rowSpan="2">Thao tác</th>*/}
                   				 </tr>
								<tr>
									<th width='8%' as='pre'>Đơn giá FOB <br/>
									(EX-W)</th>
									<th>Đơn giá kho</th>
									<th>Thành tiền giá kho</th>
									<th>Đơn giá bán</th>
									<th>Thành tiền giá bán</th>
								</tr>
							</thead>
							<tbody>
								{ProductCosts.map(ProductCost => ( 
								<tr key={ProductCost._id} >
									<td>{TT++}  </td>
									<td>{ProductCost.ProductName}</td>
									<td>{ProductCost.Quantity.toLocaleString()}</td>
									<td>{ProductCost.FOBCost.toLocaleString()}</td>
									<td>{ProductCost.InputPrice.toLocaleString()}</td>
									<td>{ProductCost.InputIntoMoney.toLocaleString()}</td>
									<td>{ProductCost.OutputPrice.toLocaleString()}</td>
									<td>{ProductCost.OutputIntoMoney.toLocaleString()}</td>
									<td>  
											 {ProductCost.Insurance.toLocaleString()
												}
									</td>
									<td>{ProductCost.Incentive.toLocaleString()} </td>
									<td>{ProductCost.RatioUSD.toLocaleString()}</td>
									<td>{ProductCost.Note}  </td>
									{/*
									<td>
									<ActionButtons_ProductCost _id={ProductCost._id} />
									</td>
									*/}
								</tr>
								
								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td>{TotalInputIntoMoney.toLocaleString()}</td> 
									<td></td>
									<td>{TotalOutputIntoMoney.toLocaleString()}</td>
									<td></td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
									
								</tr>
							</tbody>
								<tr>
									<td>1</td>
									<td colSpan={6} >Chi phí phát sinh khi thực hiện Dự Án </td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr >
									<td>1.1</td>
									<td colSpan={6} >Chi phí triển khai hợp đồng </td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Chi phí bảo hành phần cứng trích cho TT HSC 0.65%</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Chi phí Tiếp Khách</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Chi phí vận chuyển</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} > + Chi phí triển khai</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr >
									<td>1.2</td>
									<td colSpan={6} > Chi phí vốn</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày hàng tồn kho</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày triển khai</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày công nợ nhà cung cấp</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} > + Số ngày thu nợ </td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Khách hàng trả trước (đặt cọc)</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Đặt cọc cho NTP </td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr >
									<td>1.3</td>
									<td colSpan={6} >Manday thực hiện của kỹ sư HPT tham gia</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr >
									<td>1.4</td>
									<td colSpan={6} >Chi phí làm thư bảo lãnh (BL dự thầu, BL thực hiện HĐ, BL BH)</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr >
									<td>1.5</td>
									<td colSpan={6} > Chi phí vốn</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>2</td>
									<td colSpan={6} >Chi phí mua vật tư phụ (dự kiến) </td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>3</td>
									<td colSpan={6} >Hiệu quả dự án (giá trị tuyệt đối)</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>4</td>
									<td colSpan={6} >Hiệu quả dự án (tỉ lệ trên doanh thu)</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} >Hiệu quả dự án (chưa trừ  Manday của kỹ sư HPT)</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} >Incentive :</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} >Hiệu quả dự án (có Incentive):</td>
									<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
									<td>{TotalIncentive.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>

    					</Table>
					</Card.Body>
				</Card>
			</>
	
	)
}




