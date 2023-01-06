import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CapitalExpenditureCostContext } from '../../contexts/CapitalExpenditureCostContext'
import { useContext } from 'react'

const ActionButtons_CapitalExpenditureCost = ({ _id }) => {
	const { deleteCapitalExpenditureCost, findCapitalExpenditureCost, setShowUpdateCapitalExpenditureCostModal } = useContext(
		CapitalExpenditureCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseCapitalExpenditureCost = CapitalExpenditureCostId => {
		findCapitalExpenditureCost(CapitalExpenditureCostId)
		setShowUpdateCapitalExpenditureCostModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseCapitalExpenditureCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteCapitalExpenditureCost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_CapitalExpenditureCost
