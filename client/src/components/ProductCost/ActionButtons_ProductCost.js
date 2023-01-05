
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ProductCostContext } from '../../contexts/ProductCostContext'
import { useContext } from 'react'

const ActionButtons_ProductCost = ({ _id }) => {
	const { deleteProductCost, findProductCost, setShowUpdateProductCostModal } = useContext(
		ProductCostContext
	) 

	const chooseProductCost = ProductCostId => {
		findProductCost(ProductCostId)
		setShowUpdateProductCostModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseProductCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteProductCost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_ProductCost
