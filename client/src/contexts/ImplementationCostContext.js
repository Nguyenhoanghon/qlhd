import { createContext, useReducer, useState } from 'react'
import { apiUrl, LOADED_FAIL, LOADED_SUCCESS, ADD, DELETE, UPDATE, FIND, ADDSTAGE } from './constants'
import { ImplementationCostReducer } from '../reducers/ImplementationCostReducer'
import axios from 'axios'

export const ImplementationCostContext = createContext()
const ImplementationCostContextProvider = ({ children }) => {
	// State
	const [ImplementationCostState, dispatch] = useReducer(ImplementationCostReducer, {
		ImplementationCost: [],
		ImplementationCosts: [],
		StageImplementation: [],
		ImplementationCostsLoading: true
	})

	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//*** 15-3 Context for Implementation_Cost_byidContract()
	//state gọi modal them Category
	const [showCreate_Implementation_Category_Modal, setshowCreate_Implementation_Category_Modal] = useState(false);
	//state gọi modal cap nhat Category
	const [showUpdate_Category_Modal, setshowUpdate_Category_Modal] = useState(false);
	// data update Implementation_Cost.Category
	const [Data_update_Category, setData_update_Category] = useState({
		idImplementation_Cost: '',
		Category: '',
	});

	// Function them Category Test: ok
	const create_Implementation_Category = async (newImplementationCost) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation_category/post/`, newImplementationCost) //${idContract}
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.Implementation_Cost })
				return response.data
			}
			else
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
	// Function cap nhat Category Test:
	const update_Category = async (updatedImplementationCost, Data_update_Category) => {
		try {
			const response = await axios.put(`${apiUrl}/api/forms/implementation_category/put/${Data_update_Category.idImplementation_Cost}`, updatedImplementationCost) //${idContract}
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.update_Category })
				return response.data
			}
			else
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
	// Delete Category voi idImplementationCost / idContentCost
	const delete_Category = async (Data_update_Category) => {
		try {
			console.log("Show Data_GeneralExpense ===>", Data_update_Category)
			console.log((`${apiUrl}/api/forms/implementation_category/delete/${Data_update_Category.idImplementation_Cost}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation_category/delete/${Data_update_Category.idImplementation_Cost}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: response.data.message })
		} catch (error) {
			console.log(error)
		}
	}

	// Ham them 1 giai doan trien khai - Test: them duoc, nhung khong auto load sau khi them
	const [showAddStage_Modal, setshowAddStage_Modal] = useState(false)
	const add_StageImplementation = async (newImplementationCost, idContract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementations/stages_implementation/post/`, newImplementationCost)
			console.log("StagesImplementation=====;;;;", response.data.StagesImplementation)
			if (response.data.success) {
				dispatch({ type: ADDSTAGE, payload: response.data.StagesImplementation })
				return response.data
			}
			else
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//Cap nhat giai doan
	//state gọi modal cap nhat Category
	const [showUpdateStage_Modal, setshowUpdateStage_Modal] = useState(false);
	// data update Implementation_Cost.Category
	const [Data_update_Stage_Content, setData_update_Stage_Content] = useState({
		idImplementation_Cost: '',
		idContentCost: '',
		Content: '',
	});
	//Function cap nhat ten giai doan
	const update_Stage_Content = async (updateStageImplementation, Data_update_Stage_Content) => {
		console.log("Test URL", `${apiUrl}/api/forms/implementations/stages_implementation/put/${Data_update_Stage_Content.idImplementation_Cost}/${Data_update_Stage_Content.idContentCost}`)
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/implementations/stages_implementation/put/${Data_update_Stage_Content.idImplementation_Cost}/${Data_update_Stage_Content.idContentCost}`, //note xem trong server
				updateStageImplementation
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.StagesImplementation }) //note updateImplementationCost biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
	// Xoa 1 Giai doan chi phi Trien khai voi idImplementationCost / idContentCost
	const delete_Stage = async (Data_update_Stage_Content) => {
		try {
			console.log("ID idImplementationCost", Data_update_Stage_Content)
			console.log((`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${Data_update_Stage_Content._id}/${Data_update_Stage_Content.StagesImplementation_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementations/stages_implementation/delete/${Data_update_Stage_Content.idImplementation_Cost}/${Data_update_Stage_Content.idContentCost}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: response.data.message })
		} catch (error) {
			console.log(error)
		}
	}

	// Get ImplementationCosts by idContract  Test: ok
	const getImplementation_Costs_byidContract = async (idContract) => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/implementations/${idContract}`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Implementation_Cost })//note

			}

		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	//** Context them sua xoa CostDetail
	//State goi Modal Add_CostDetail
	const [showAdd_CostDetail_Modal, setshowAdd_CostDetail_Modal] = useState(false)
	// State lay ID
	const [Data_Click_On_Button, setData_Click_On_Button] = useState({
		Implementation_Cost_Id: '',
		ContentCostId: '',
		ContentCost: ''
	})
	//Ham them 1 chi phi chí cho 1 giai doan trien khai
	const add_CostDetail_Function = async (newStageImplementation) => {
		try {
			//console.log("ID idImplementationCost", ImplementationCost._id, "ImplementationCost.GeneralExpense_id",ImplementationCost.GeneralExpense_id)
			//console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.post(`${apiUrl}/api/forms/implementations/stages_implementation/CostDetail/post`, newStageImplementation)///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`, ImplementationCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.Implementation_Cost })
				return response.data
			}
			else
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//State goi Modal Update_CostDetail
	const [showUpdate_CostDetail_Modal, setshowUpdate_CostDetail_Modal] = useState(false)
	// State lay ID
	const [DataUpdate_Click_On_Button, setDataUpdate_Click_On_Button] = useState({
		Implementation_Cost_Id: '',
		ContentCostId: '',
		idCost: '',
		NameCost: '',
		Units: '',
		UnitPrice: '',
		Quantity_days: '',
		Quantity_times: '',
		IntoMoney: '',
		Note: ''

	})
	// Function Update_CostDetail 
	const update_CostDetail_Function = async (updatedImplementationCost, DataUpdate_Click_On_Button) => {
		console.log("Test URL", `${apiUrl}/api/forms/implementations/stages_implementation/CostDetail/put/${DataUpdate_Click_On_Button.Implementation_Cost_Id}/${DataUpdate_Click_On_Button.ContentCostId}/${DataUpdate_Click_On_Button.idCost}`)
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/implementations/stages_implementation/CostDetail/put/${DataUpdate_Click_On_Button.Implementation_Cost_Id}/${DataUpdate_Click_On_Button.ContentCostId}/${DataUpdate_Click_On_Button.idCost}`,
				updatedImplementationCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.StagesImplementation }) //note updateImplementationCost biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Ham xoa 1 chi phi trong chi phi Giai doan
	const delete_CostDetail_Function = async (DataUpdate_Click_On_Button) => {
		try {
			console.log("ID idImplementationCost", DataUpdate_Click_On_Button)
			console.log((`${apiUrl}/api/forms/implementations/stages_implementation/CostDetail/delete/${DataUpdate_Click_On_Button.Implementation_Cost_Id}/${DataUpdate_Click_On_Button.ContentCostId}/${DataUpdate_Click_On_Button.idCost}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementations/stages_implementation/CostDetail/delete/${DataUpdate_Click_On_Button.Implementation_Cost_Id}/${DataUpdate_Click_On_Button.ContentCostId}/${DataUpdate_Click_On_Button.idCost}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: DataUpdate_Click_On_Button })
		} catch (error) {
			console.log(error)
		}
	}

	//*** End Context for Implementation_Cost_byidContract()

	// ImplementationCost context data
	const ImplementationCostContextData = {
		ImplementationCostState,
		//state gọi modal them Category
		showCreate_Implementation_Category_Modal,
		setshowCreate_Implementation_Category_Modal,
		create_Implementation_Category,

		//state gọi modal cap nhat Category
		showUpdate_Category_Modal,
		setshowUpdate_Category_Modal,
		Data_update_Category,
		setData_update_Category,
		update_Category,
		delete_Category,

		getImplementation_Costs_byidContract,

		//Context them sua xoa Stage
		showAddStage_Modal,
		setshowAddStage_Modal,
		add_StageImplementation,
		showUpdateStage_Modal,
		setshowUpdateStage_Modal,
		Data_update_Stage_Content,
		setData_update_Stage_Content,
		update_Stage_Content,
		delete_Stage,

		//Context them sua xoa CostDetail
		showAdd_CostDetail_Modal,
		setshowAdd_CostDetail_Modal,     //Goi modal Add
		Data_Click_On_Button,
		setData_Click_On_Button,		 //Get Params truyen cho Url Add
		add_CostDetail_Function,         //Hàm thêm

		showUpdate_CostDetail_Modal,
		setshowUpdate_CostDetail_Modal, //Goi modal Update
		DataUpdate_Click_On_Button,
		setDataUpdate_Click_On_Button,  //Get Params truyen cho Url Add
		update_CostDetail_Function,		//Hàm cap nhat
		delete_CostDetail_Function,		//Hàm xoa
		showToast,
		setShowToast,
		//*** end component Implementation_Cost_byidContract()



	}

	return (
		<ImplementationCostContext.Provider value={ImplementationCostContextData}>
			{children}
		</ImplementationCostContext.Provider>
	)
}

export default ImplementationCostContextProvider
