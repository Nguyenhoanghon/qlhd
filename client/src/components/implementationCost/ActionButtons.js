import Button from 'react-bootstrap/Button'
import plus_circle_fill from '../../assets/plus_circle_fill.svg'
import editIcon from '../../assets/pencil.svg'

import deleteIcon from '../../assets/trash.svg'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//Ok
//Nut cap nhat - xoá 1 Category!!!
export const Button_Update_Delete_Category = (Category) => {
	const {
		setData_update_Category,
		setshowUpdate_Category_Modal,
		delete_Category
	} = useContext(ImplementationCostContext)
	
	const click_Button_Update = (Category) => {
		setData_update_Category(Category)
		setshowUpdate_Category_Modal(true)
	}

	function submit() {
		confirmAlert({
			title: '',
			message: 'Xoá hạng mục chi phí',
			buttons: [
				{
					label: 'Có',
					onClick: () => delete_Category(Category)
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
			<Button className='post-button' onClick={click_Button_Update.bind(this, Category)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//Ok
//Nut Them Giai doan trong Category
export const Button_AddStage = (Category) => {
	const {
		setData_update_Category,
		setshowAddStage_Modal
	} = useContext(ImplementationCostContext)
	
	const click_Button_AddStage = (Category) => {
		setData_update_Category(Category)
		setshowAddStage_Modal(true)
	}
	return (
		<>
			<Button onClick={click_Button_AddStage.bind(this, Category)}>
				{/* <img src={plus_circle_fill} alt='edit' width='24' height='24' /> */}
				Thêm giai đoạn
			</Button>
		</>
	)
}

//Ok
//Nut cap nhat - xoá 1 giai doan chi phi !!!
export const Button_Update_Delete_Stage_Content = (Stage_Content) => {
	const {
		setshowUpdateStage_Modal,
		setData_update_Stage_Content,
		delete_Stage

	} = useContext(ImplementationCostContext)
	
	const click_Button_Update_Stage_Content = (Stage_Content) => {
		setData_update_Stage_Content(Stage_Content)
		setshowUpdateStage_Modal(true)
	}

	function submit() {
		confirmAlert({
			title: '',
			message: 'Xoá giai đoạn chi phí',
			buttons: [
				{
					label: 'Có',
					onClick: () => delete_Stage(Stage_Content)
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
			<Button className='post-button' onClick={click_Button_Update_Stage_Content.bind(this, Stage_Content)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}
//Ok
//Nut them chi phi trong giai doan chi phi
export const Button_Add_CostDetail = (_id) => {
	const {
		setshowAdd_CostDetail_Modal,     //Goi modal         
		setData_Click_On_Button			 //Get Params truyen cho Url
	} = useContext(ImplementationCostContext)

	const Add_StageCostDetail = ImplementationCostId => {
		setshowAdd_CostDetail_Modal(true)//note
		setData_Click_On_Button(_id)
		console.log("Button_Add_CostDetail id bat dc", _id)

	}
	return (
		<>
			<Button onClick={Add_StageCostDetail.bind(this, _id)}>
				{/* <img src={plus_circle_fill} alt='edit' width='34' height='34' /> */}
				Thêm chi phí
			</Button>
		</>
	)
}

//Nut cap nhat - xoá 1 chi phi trong chi phi trien khai
export const Button_Update_Delete_CostDetail = (_id) => {
	const {
		setshowUpdate_CostDetail_Modal,
		setDataUpdate_Click_On_Button,
		delete_CostDetail_Function

		
	} = useContext(ImplementationCostContext)

	const click_Button_Update = (_id) => {
		setDataUpdate_Click_On_Button(_id)
		setshowUpdate_CostDetail_Modal(true)
	}


	function submit() {
		confirmAlert({
			title: '',
			message: 'Xoá chi phí',
			buttons: [
				{
					label: 'Có',
					onClick: () => delete_CostDetail_Function(_id)
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
			<Button className='post-button' onClick={click_Button_Update.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

