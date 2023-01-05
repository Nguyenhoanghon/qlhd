import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { MandayCostContext } from '../../contexts/MandayCostContext'
import { useContext } from 'react'

const ActionButtons_MandayCost = ({ _id }) => {
	const { deleteMandayCost, findMandayCost, setShowUpdateMandayCostModal } = useContext(
		MandayCostContext
	) 

	const chooseMandayCost = MandayCostId => {
		findMandayCost(MandayCostId)
		setShowUpdateMandayCostModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseMandayCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteMandayCost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_MandayCost
