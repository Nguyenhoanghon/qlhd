
import { useContext, useEffect } from 'react'

import { ContractContext } from '../contexts/ContractContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//import Row from 'react-bootstrap/Row'
//import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
//import Tooltip from 'react-bootstrap/Tooltip'
//import Col from 'react-bootstrap/Col'
//import { useState } from 'react'

import {ActionButtons_Contract,ActionButtons_Update_Delete} from '../components/contract/ActionButtons_Contract'
import AddContractModal from '../components/contract/AddContractModal'//Note
import UpdateContractModal from '../components/contract/UpdateContractModal'//Note

//import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
//View tất cả dữ liệu có trong Contract
export const ContractView = () => {
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
					<Card.Header as='h2'>DANH SÁCH HỢP ĐỒNG</Card.Header>
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
					<Card.Header as='h2'>DANH SÁCH HỢP ĐỒNG </Card.Header>
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
									<ActionButtons_Update_Delete _id={Contract._id} />
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
//View list các Forms cần nhập
export const Inputforms = () => {
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
					<Card.Header as='h2'>DANH SÁCH HỢP ĐỒNG</Card.Header>
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
					<Card.Header as='h2'>DANH SÁCH HỢP ĐỒNG </Card.Header>
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
									<ActionButtons_Contract _id={Contract._id} />
									</td>
								
								</tr>
								
								))
								}
								
							</tbody>
    					</Table>
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
/*
export default 	{
	ContractView,
	ContractView2
}
*/
