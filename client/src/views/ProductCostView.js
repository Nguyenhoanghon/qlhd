import { ProductCostContext } from '../contexts/ProductCostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

/* import { useState } from 'react' */
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import AddProductCostModal from '../components/ProductCost/AddProductModal'//Note
import UpdateProductCostModal from '../components/ProductCost/UpdateProductModal'//Note
import ActionButtons_ProductCost from '../components/ProductCost/ActionButtons_ProductCost'


import Table from 'react-bootstrap/Table'

//View all product cost
export const ProductCost_all = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		ProductCostState: { ProductCost, ProductCosts, ProductCostsLoading },
		getProductCosts,
		setShowAddProductCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ProductCostContext)

	// hàm tính tổng thành tiền
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}

	// Start: Get all ProductCosts
	useEffect(() => getProductCosts(), [])

	const [stateInsurance, setStateInsurance] = useState(false)
	const toggleInsurance = (value) => {
		setStateInsurance(value);
	};

	let body = null
	let stt = 1
	const TotalInputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
	const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note
	if (ProductCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (ProductCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddProductCostModal.bind(this, true)}
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
				<Card className='text-center mx-5 my-5' animation={false}>
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
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
									<th rowSpan="2">Thao tác</th>
								</tr>
								<tr>
									<th width='8%' as='pre'>Đơn giá FOB <br />
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
										<td>{stt++}  </td>
										<td>{ProductCost.ProductName}</td>
										<td>{ProductCost.Quantity.toLocaleString()}</td>
										<td>{ProductCost.FOBCost.toLocaleString()}</td>
										<td>{ProductCost.InputPrice.toLocaleString()}</td>
										<td>{ProductCost.InputIntoMoney.toLocaleString()}</td>
										<td>{ProductCost.OutputPrice.toLocaleString()}</td>
										<td>{ProductCost.OutputIntoMoney.toLocaleString()}</td>
										<td>

											<input
												type='checkbox'
												checked={ProductCost.Insurance}
												onChange={(e) => toggleInsurance((e).target.checked)}
											/>
										</td>
										<td>{ProductCost.Incentive.toLocaleString()} </td>
										<td>{ProductCost.RatioUSD.toLocaleString()}</td>
										<td>{ProductCost.Note}  </td>

										<td>
											<ActionButtons_ProductCost _id={ProductCost._id} />
										</td>

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
									<td></td>
								</tr>
							</tbody>
						</Table>
						<Button
							variant='primary'
							onClick={setShowAddProductCostModal.bind(this, true)}
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
			<AddProductCostModal />
			{ProductCost !== null && <UpdateProductCostModal />}
			{/* After ProductCost is added, show toast */}
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

//View product cost by id
export const ProductCost_idContract = () => {
	const params = useParams();
	// Contexts

	const {
		ProductCostState: { ProductCost, ProductCosts, ProductCostsLoading },
		getProductCost_byidContract,
		setShowAddProductCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ProductCostContext)

	// hàm tính tổng thành tiền
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}

	// Start: Get ProductCosts by id Contract

	useEffect(() => getProductCost_byidContract(params.id), [])
	console.log("Test===>ProductCostView review useEffect: ", ProductCosts)
	console.log("Test===>ProductCostView review useEffect: ", params.id)

	//Ham checkbox Insurance
	const [stateInsurance, setStateInsurance] = useState(false)
	const toggleInsurance = (value) => {
		setStateInsurance(value);
	};
	let body = null
	let stt = 1
	const TotalInputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
	const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note

	if (ProductCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (ProductCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddProductCostModal.bind(this, true)}
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
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
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
									<th rowSpan="2">Thao tác</th>
								</tr>
								<tr>
									<th width='8%' as='pre'>Đơn giá FOB <br />
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
										<td>{stt++}  </td>
										<td>{ProductCost.ProductName}</td>
										<td>{ProductCost.Quantity.toLocaleString()}</td>
										<td>{ProductCost.FOBCost.toLocaleString()}</td>
										<td>{ProductCost.InputPrice.toLocaleString()}</td>
										<td>{ProductCost.InputIntoMoney.toLocaleString()}</td>
										<td>{ProductCost.OutputPrice.toLocaleString()}</td>
										<td>{ProductCost.OutputIntoMoney.toLocaleString()}</td>
										<td> {ProductCost.Insurance}

											<input
												type='checkbox'
												checked={ProductCost.Insurance}
												onChange={(e) => toggleInsurance((e).target.checked)}
											/>


										</td>
										<td>{ProductCost.Incentive.toLocaleString()} </td>
										<td>{ProductCost.RatioUSD.toLocaleString()}</td>
										<td>{ProductCost.Note}
											<input
												type='checkbox'
												checked={ProductCost.EX_W}
												onChange={(e) => toggleInsurance((e).target.checked)}
											/>
										</td>

										<td>
											<ActionButtons_ProductCost _id={ProductCost._id} />
										</td>

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
									<td></td>
								</tr>
								<tr>
									<td colSpan={13}>
										<Button
											variant='primary'
											onClick={setShowAddProductCostModal.bind(this, true)}
										>
											Thêm mới
										</Button>
									</td>
								</tr>
							</tbody>
						</Table>
						<a href={`/summary/${params.id}`}>
							<Button
								variant='primary'
							>
								Xem PTHD
							</Button>
						</a>
						<span> </span>
						<a href={`/inputform/${params.id}`}>
							<Button
								variant='primary'
							>
								Kết thúc
							</Button>
						</a>
					</Card.Body>
				</Card>
			</>
		)
	}

	return (
		<>
			{body}
			<AddProductCostModal />
			{ProductCost !== null && <UpdateProductCostModal />}
			{/* After ProductCost is added, show toast */}
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