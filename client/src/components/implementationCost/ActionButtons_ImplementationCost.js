import Button from 'react-bootstrap/Button'
import plus_circle_fill from '../../assets/plus_circle_fill.svg'
import editIcon from '../../assets/pencil.svg'

import deleteIcon from '../../assets/trash.svg'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useContext } from 'react'

export const ActionButtons_ImplementationCost = ( _id ) => {
	const { deleteImplementationCost,
		delete_GeneralCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	) 

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={delete_GeneralCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//Nut cap nhat - xoá 1 chi phi trong chi phi chung
export const ActionButtons_Update_Delete_GeneralCostDetail = ( _id ) => {
	const { deleteImplementationCost,
		delete_GeneralCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	)

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={delete_GeneralCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//Nut them chi phi trong chi phi chung
export const ActionButtons_Add_GeneralCostDetail = ( _id ) => {
	const {
		setshowAddCostDetailGeneralModal,
		setdataOn_Click,
	 } = useContext(ImplementationCostContext)

	const Add_GeneralCostDetail = ImplementationCostId => {
		setshowAddCostDetailGeneralModal(true)//note
		setdataOn_Click(_id)
		console.log("ActionButtons_Add_GeneralCostDetail id bat dc", _id)
			
	}
return (
		<>
			<Button className='post-button' onClick={Add_GeneralCostDetail.bind(this, _id)}>
				<img src={plus_circle_fill} alt='edit' width='34' height='34' />
			</Button>
		</>
	)
}

//Nut them chi phi trong chi phi trien khai
export const ActionButtons_Add_StageCostDetail = ( _id ) => {
	const {
		setshowAddCostDetailStageImplementModal,
		setdataOn_Click,
	 } = useContext(ImplementationCostContext)

	const Add_StageCostDetail = ImplementationCostId => {
		setshowAddCostDetailStageImplementModal(true)//note
		setdataOn_Click(_id)
		console.log("ActionButtons_Add_StageCostDetail id bat dc", _id)
			
	}
return (
		<>
			<Button className='post-button' onClick={Add_StageCostDetail.bind(this, _id)}>
				<img src={plus_circle_fill} alt='edit' width='34' height='34' />
			</Button>
		</>
	)
}


//Nut cap nhat - xoá 1 chi phi trong chi phi chung
export const ActionButtons_Update_Delete_StageCostDetail = ( _id ) => {
	const { deleteImplementationCost,
		delete_StageCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	)

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={delete_StageCostDetail.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//export default ActionButtons_ImplementationCost
