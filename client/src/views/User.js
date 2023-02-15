import { UserContext } from '../contexts/UserContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'

import ActionButtons_User from '../components/users/ActionButtons_User'
import AddUserModal from '../components/users/AddUserModal'//Note
import UpdateUserModal from '../components/users/UpdateUserModal'//Note

import addIcon from '../assets/plus_circle_fill.svg'
import Table from 'react-bootstrap/Table'

const User = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		UserState: { User, Users, UsersLoading },
		getUsers,
		setShowAddUserModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(UserContext)

	// hàm tính tổng 
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}
	//Định dạng hiển thị số
	function formatCash(str) {
 	return str.split('').reverse().reduce((prev, next, index) => {
 		return ((index % 3) ? next : (next + ',')) + prev
 	})
}

	// Start: Get all Users
	useEffect(() => getUsers(), [])

	let body = null
	let stt = 1
	//const tong =  sumArray(Users.map((User) => User.sotien))
	if (UsersLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (Users.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Thông tin người dùng</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ USER</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddUserModal.bind(this, true)}
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
					<Card.Header as='h2'>Thông tin người dùng </Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Tên Tài Khoản</th>
								<th>Email</th>
								<th>Vai Trò</th>
								</tr>
							</thead>
							<tbody>
								{Users.map(User => ( 
									<tr key={User._id} >
									<td>{stt++}  </td>
									<td>{User.username}</td>
									<td>{User.email}</td>
									<td>{User.roles[0].name}</td>
									<td>
									<ActionButtons_User _id={User._id} />
									</td>
								
								</tr>
								
								))
								}
								
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddUserModal.bind(this, true)}
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
			<AddUserModal />
			{User !== null && <UpdateUserModal />}
			{/* After User is added, show toast */}
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

export default 	User
