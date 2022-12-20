import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const ActionButtons_User = ({ _id }) => {
	const { deleteUser, findUser, setShowUpdateUserModal } = useContext(
		UserContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseUser = UserId => {
		findUser(UserId)
		setShowUpdateUserModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseUser.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteUser.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_User
