import { ProductCostContext } from '../contexts/ProductCostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import AddProductCostModal from '../components/ProductCost/AddProductModal'//Note
import UpdateProductCostModal from '../components/ProductCost/UpdateProductModal'//Note
import ActionButtons_ProductCost from '../components/ProductCost/ActionButtons_ProductCost'
import Table from 'react-bootstrap/Table'
//button add Incentive
import Add_Incentive from '../components/ProductCost/Add_Incentive'

//Export excel
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


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
						{/* <Button
							variant='primary'
							onClick={setShowAddProductCostModal.bind(this, true)}
						>
							Thêm!
						</Button> */}
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

							</tbody>
						</Table>
						{/* <Button
							variant='primary'
							onClick={setShowAddProductCostModal.bind(this, true)}
						>
							Thêm mới
						</Button> */}
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

//View product cost by id
export const Products_idContract = () => {
	const params = useParams();
	// Contexts

	const {
		ProductCostState: { ProductCosts, ProductCostsLoading },
		getProductCost_idContract,

		setShowAddProductCostModal,
		showToast: { show, message, type },
		setShowToast,
		showToast,
		setShowAddIncentive_Modal,

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

	useEffect(() => getProductCost_idContract(params.idcontract), [showToast])//, [showToast])
	console.log("Export ==================== ", ProductCosts)

	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_InputIntoMoney(ProductsCost) {
		let Total_InputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_InputIntoMoney += ListProduct.InputIntoMoney
			)))

		return Total_InputIntoMoney;
	}
	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_OutputIntoMoney(ProductsCost) {
		let Total_OutputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_OutputIntoMoney += ListProduct.OutputIntoMoney
			)))

		return Total_OutputIntoMoney;
	}

	//Ham checkbox Insurance
	const [stateInsurance, setStateInsurance] = useState(false)
	const toggleInsurance = (value) => {
		setStateInsurance(value);
	};

	//*** Export excel
	let stt = 1;
	const title = [
		{ title: "STT", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
		{ title: "contract", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
		{ title: "Incentive", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wch: 30 } }, // width in characters
		{ title: "_id", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels

	]
	const Datarows = ProductCosts.map((element) => [
		{ value: stt++, style: { font: { sz: "14" } } },
		{ value: element.contract, style: { font: { sz: "14" } } },
		{ value: element.Incentive, style: { font: { sz: "14" } } },
		{ value: element._id, style: { font: { sz: "14" } } },

	])
	const RowTongchiphi = [
		{ value: "", style: { font: { sz: "14" } } },
		{ value: "TỔNG", style: { font: { sz: "14" } } },
		{ value: "Tong", style: { font: { sz: "14" } } },
		{ value: "", style: { font: { sz: "14" } } },

	]
	Datarows.push(RowTongchiphi)
	//console.log("RowTongchiphiRowTongchiphi", Datarows)
	const DataSetExport = [
		{
			columns: title,
			data: Datarows
		}
	]
	//*** end Export excel

	let body = null
	stt = 1

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
							Thêm
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
							{ProductCosts.map(ProductCost => (
								<>
									<thead>
										<tr key={ProductCost._id}>
											<th rowSpan="2">STT</th>
											<th rowSpan="2" width="15%">Tên hàng</th>
											<th rowSpan="2" width="5%">Số lượng </th>
											<th colSpan="3">Giá vốn hàng bán Giá kho</th>
											<th colSpan="2 ">Doanh số Giá bán</th>
											<th rowSpan="2 " width="8%">Có tính Chi Phí Bảo Hiểm  </th>

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
										{ProductCost.ListProducts.map(ListProduct => (
											<tr key={ListProduct._id} >
												<td>{stt++}  </td>
												<td>{ListProduct.ProductName}</td>
												<td>{ListProduct.Quantity.toLocaleString()}</td>
												<td>{ListProduct.FOBCost.toLocaleString()}</td>
												<td>{ListProduct.InputPrice.toLocaleString()}</td>
												<td>{ListProduct.InputIntoMoney.toLocaleString()}</td>
												<td>{ListProduct.OutputPrice.toLocaleString()}</td>
												<td>{ListProduct.OutputIntoMoney.toLocaleString()}</td>
												<td>{ListProduct.Insurance}
													<input
														type='checkbox'
														checked={ListProduct.Insurance}
														onChange={(e) => toggleInsurance((e).target.checked)}
													/>
												</td>

												<td>{ListProduct.RatioUSD.toLocaleString()}</td>
												<td>{ListProduct.Note}
													<input
														type='checkbox'
														checked={ListProduct.EX_W}
														onChange={(e) => toggleInsurance((e).target.checked)}
													/>
												</td>

												<td>
													<ActionButtons_ProductCost
														contract={ProductCost.contract}
														idProduct={ListProduct._id}
														ProductName={ListProduct.ProductName}
														Quantity={ListProduct.Quantity}
														FOBCost={ListProduct.FOBCost}
														InputPrice={ListProduct.InputPrice}
														InputIntoMoney={ListProduct.InputIntoMoney}
														OutputPrice={ListProduct.OutputPrice}
														OutputIntoMoney={ListProduct.OutputIntoMoney}
														Insurance={ListProduct.Insurance}
														RatioUSD={ListProduct.RatioUSD}
														Note={ListProduct.Note}
														EX_W={ListProduct.EX_W}
													/>
												</td>

											</tr>

										))
										}
										<tr>
											<td colSpan={5} >Tổng</td>
											<td>{Sum_InputIntoMoney(ProductCosts).toLocaleString()}</td>
											<td></td>
											<td>{Sum_OutputIntoMoney(ProductCosts).toLocaleString()}</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td colSpan={7} > Incentive (nếu có)</td>
											<td>{ProductCost.Incentive == null ? 0 : ProductCost.Incentive.toLocaleString()}</td>
											<td></td>
											<td></td>
											<td colSpan={2}>
												<Button
													variant='primary'
													onClick={setShowAddIncentive_Modal.bind(this, true)}
												>
													Nhập Incentive
												</Button></td>
										</tr>
										<tr>
											<td colSpan={13}>
												<Button
													variant='primary'
													onClick={setShowAddProductCostModal.bind(this, true)}
												>
													Thêm hàng hoá
												</Button>
												{ProductCosts.length !== 0 ? (
											<ExcelFile
												filename="ProductCosts"
												element={<button type="button" className="btn btn-success float-right m-3">Export Data</button>}>
												<ExcelSheet dataSet={DataSetExport} name="ProductCosts" />
											</ExcelFile>
										) : null}
											</td>
										</tr>
									</tbody>
								</>
							))}
						</Table>
						<a href={`/summary/${params.idcontract}`}>
							<Button
								variant='primary'
							>
								Xem PTHD
							</Button>
						</a>
						<span> </span>
						<a href={`/inputform/${params.idcontract}`}>
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
			<Add_Incentive />
			<UpdateProductCostModal />
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