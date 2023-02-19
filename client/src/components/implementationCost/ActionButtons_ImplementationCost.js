import Button from 'react-bootstrap/Button'
import plus_circle_fill from '../../assets/plus_circle_fill.svg'
import editIcon from '../../assets/pencil.svg'

import deleteIcon from '../../assets/trash.svg'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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
//Nut cap nhat - xoá 1 giai doan chi phi chung
export const ActionButtons_Update_Delete_StageGeneral_Expense = ( _id ) => {
	const { delete_StageGeneral_Expense,
		findImplementationCost,
		
		setShowUpdateStageGeneralModal } = useContext(
		ImplementationCostContext
	)

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateStageGeneralModal(true)
	}
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá giai đoạn chi phí chung',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => delete_StageGeneral_Expense(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateStageGeneralModal(false)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//Nut cap nhat - xoá 1 giai doan chi phi Trien khai
export const ActionButtons_Update_Delete_StageImplementation = ( _id ) => {
	const { delete_StageImplementation,
		findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	)

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá giai đoạn chi phí triển khai',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => delete_StageImplementation(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateImplementationCostModal(false)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
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
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá chi phí triển khai',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => delete_GeneralCostDetail(_id)
			},
			{
			  label: 'Không',
			  closeOnClick: true
			}
		  ]
		});
	  };
	  
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
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


//Nut cap nhat - xoá 1 chi phi trong chi phi trien khai
export const ActionButtons_Update_Delete_StageCostDetail = ( _id ) => {
	const { deleteImplementationCost,
		delete_StageCostDetail, findImplementationCost, setShowUpdateImplementationCostModal } = useContext(
		ImplementationCostContext
	)

	const chooseImplementationCost = ImplementationCostId => {
		findImplementationCost(ImplementationCostId)
		setShowUpdateImplementationCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá chi phí triển khai',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => delete_StageCostDetail(_id)
			},
			{
			  label: 'Không',
			  closeOnClick: true
			}
		  ]
		});
	  };
	return (
		<>
			<Button className='post-button' onClick={chooseImplementationCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//export default ActionButtons_ImplementationCost
