
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
import { MandayCostContext } from '../contexts/MandayCostContext'
import { GuaranteeLetterCostContext } from '../contexts/GuaranteeLetterCostContext'
import { MiscExpenseCostContext } from '../contexts/MiscExpenseContext'
import { CapitalExpenditureCostContext } from "../contexts/CapitalExpenditureCostContext"
import { AuxiliaryCostContext } from '../contexts/AuxiliaryCostContext'
import { ImplementationCostContext } from '../contexts/ImplementationCostContext'

//Components
import { ActionButtons_Contract } from '../components/contract/ActionButtons_Contract'
import AddContractModal from '../components/contract/AddContractModal'
import UpdateContractModal from '../components/contract/UpdateContractModal'



//View list các Forms cần nhập
export const InputForm = () => {
	// Contexts
	const params = useParams()
	console.log("Id hop dong dc click", params)
	return (
		<>
			<Card className='text-center mx-5 my-5'>
				<Card.Header as='h2'> NHẬP LIỆU HỢP ĐỒNG</Card.Header>
				<Card.Body>
					<Table striped bordered hover size="sm">
						<thead >
							<tr>
								<th>STT</th>
								<th>Tên Form </th>
								{/* <th>ID Hợp đồng</th> */}
								<th>Thao tác</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td> Chi tiết hàng hoá</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/product-cost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>2</td>
								<td> Chi tiết triển khai</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/implementation-cost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>3</td>
								<td> Chi phí vốn</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/CapitalExpenditureCost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>4</td>
								<td> Manday kỹ sư</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/manday-cost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>5</td>
								<td> Chi phí làm thư bảo lãnh</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/guarantee-letter-cost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>6</td>
								<td> Chi phí khác</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/MiscExpenseCost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>
								<td>7</td>
								<td> Chi phí vật tư phụ</td>
								{/* <td>{params.id}</td> */}
								<td>
									<a href={`/AuxiliaryCost/contract/${params.id}`}>
										<Button
											variant='primary'
										>
											Click Nhập
										</Button>
									</a>
								</td>
							</tr>
							<tr>

								<td colSpan={4}>
									<a href={`/summary/${params.id}`}>
										<Button
											variant='primary'
										>
											Xem PTHD
										</Button>
									</a>
									<span> </span>
									<a href={`/summary`}>
										<Button
											variant='primary'
										>
											Kết thúc
										</Button>
									</a>
								</td>


							</tr>
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</>
	)
}

