import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useContext } from 'react'

export const ActionButtons_ImplementationCost = ( _id ) => {
	const { deleteImplementationCost,
		deleteImplementationCost_GeneralCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteImplementationCost_GeneralCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export const ActionButtons_GeneralCostDetail = ( _id ) => {
	const { deleteImplementationCost,
		deleteImplementationCost_GeneralCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteImplementationCost_GeneralCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
export const ActionButtons_StageCostDetail = ( _id ) => {
	const {deleteImplementationCost_StageCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteImplementationCost_StageCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//export default ActionButtons_ImplementationCost
