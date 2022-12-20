import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'

const AddUserModal = () => {
	// Contexts
	const {
		showAddUserModal,
		setShowAddUserModal,
		addUser,
		setShowToast
	} = useContext(UserContext)

	// State
	const [newUser, setNewUser] = useState({
		username: '',
		email: '',
		password: '',
		roles: ''
	})

	const { username,email, password,roles } = newUser

	const onChangeNewUserForm = event =>
		setNewUser({ ...newUser, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddUserData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addUser(newUser)
		resetAddUserData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddUserData = () => {
		setNewUser({ username: '', email: '',password: '', roles: '' })
		setShowAddUserModal(false)
	}

	return (
		<Modal show={showAddUserModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn muốn thêm Người dùng mới?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='username-help' muted as="h6">
							Username
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='username'
							required
							aria-describedby='username-help'
							value={username}
							onChange={onChangeNewUserForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Email-help' muted  as="h6">
							Email
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder=''
							name='password'
							value={email} /* tạo ràn buộc số */
							onChange={onChangeNewUserForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Password-help' muted  as="h6">
							Password
						</Form.Text>
						<Form.Control
							tpye='password'
							placeholder=''
							name='password'
							value={password} /* tạo ràn buộc số */
							onChange={onChangeNewUserForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='roleId-help' muted  as="h6">
							RoleID
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder=''
							name='roleId'
							value={roles} /* tạo ràn buộc số */
							onChange={onChangeNewUserForm}
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

export default AddUserModal
