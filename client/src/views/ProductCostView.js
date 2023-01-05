import { ProductCostContext } from '../contexts/ProductCostContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
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

const ProductCost = () => {
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
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}

	// Start: Get all ProductCosts
	useEffect(() => getProductCosts(), [])

	let body = null
	let stt = 1
	//const tongthanhtiengiakho =  sumArray(ProductCosts.map((ProductCost) => ProductCost.thanhtiengiakho))//note
	//const tongthanhtiengiaban =  sumArray(ProductCosts.map((ProductCost) => ProductCost.thanhtiengiaban))//note
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
									<th width='8%' as='pre'>Đơn giá FOB <br/>
									(EX-W)</th>
									<th>Đơn giá kho</th>
									<th>Thành tiền</th>
									<th>Đơn giá bán</th>
									<th>Thành tiền</th>
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
									<td><Form.Check 
											type={'checkbox'}
											id={0}
											value={ProductCost.Insurance.toLocaleString()}
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
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
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

export default ProductCost
