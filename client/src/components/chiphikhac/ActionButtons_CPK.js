import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CPKContext } from '../../contexts/MiscExpenseContext'
import { useContext } from 'react'

const ActionButtons_CPK = ({ _id }) => {
	const { deleteCPK, findCPK, setShowUpdateCPKModal } = useContext(
		CPKContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseCPK = CPKId => {
		findCPK(CPKId)
		setShowUpdateCPKModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseCPK.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteCPK.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_CPK
