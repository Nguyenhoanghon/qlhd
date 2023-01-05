import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { GuaranteeLetterCostContext } from '../../contexts/GuaranteeLetterCostContext'
import { useContext } from 'react'

const ActionButtons_GuaranteeLetterCost = ({ _id }) => {
	const { deleteGuaranteeLetterCost, findGuaranteeLetterCost, setShowUpdateGuaranteeLetterCostModal } = useContext(
		GuaranteeLetterCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseGuaranteeLetterCost = GuaranteeLetterCostId => {
		findGuaranteeLetterCost(GuaranteeLetterCostId)
		setShowUpdateGuaranteeLetterCostModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseGuaranteeLetterCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteGuaranteeLetterCost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_GuaranteeLetterCost
