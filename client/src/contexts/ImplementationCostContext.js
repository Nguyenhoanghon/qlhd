import { createContext, useReducer, useState } from 'react'
import {apiUrl,LOADED_FAIL,LOADED_SUCCESS,ADD,DELETE,UPDATE,FIND,ADDSTAGE} from './constants'
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
	

	
	const [showAddStageGeneralModal, setshowAddStageGeneralModal] = useState(false)
//!!!!
	const [showUpdateStageGeneralModal, setShowUpdateStageGeneralModal,] = useState(false)

	const [showAddCostDetailGeneralModal, setshowAddCostDetailGeneralModal] = useState(false)
	
	const [showAddStageImplementationModal, setshowAddStageImplementationModal] = useState(false)
	const [showAddCostDetailStageImplementModal,setshowAddCostDetailStageImplementModal] = useState(false)

	const [showAddImplementationCostModal, setShowAddImplementationCostModal] = useState(false)
	
	const [dataOn_Click, setdataOn_Click] = useState([])//xu ly nut them
	
	
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all ImplementationCosts chua su dung
	const find_ImplementationCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/implementation-cost/`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ImplementationCost })//note

			}

		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	// Get ImplementationCosts by idContract  Test:ok
	const getImplementationCosts_byidContract = async (idContract) => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/implementation-cost/${idContract}`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ImplementationCost })//note

			}

		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add ImplementationCost Test: ok
	const addImplementationCost = async (newImplementationCost,idContract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/post/${idContract}`, newImplementationCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ImplementationCost })
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
	// Ham them 1 giai doan trien khai - Test: them duoc, nhung khong auto load sau khi them
	const addStageImplementation = async (newImplementationCost,idContract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/stages-implementation/post/:idContract`, newImplementationCost)
			console.log("StagesImplementation=====;;;;",response.data.StagesImplementation)
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
	// Ham them 1 giai doan chi phí chung - Test: them duoc, nhung khong auto load sau khi them
	const addStageGeneral = async newImplementationCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/general-expense/post/:idcontract`, newImplementationCost)
			if (response.data.success) {
				dispatch({ type: ADDSTAGE, payload: response.data.StagesImplementation})
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
	
	//Ham them 1 chi phi chí cho 1 giai doan chi phi chung 
	const addCostDetailGeneral = async (ImplementationCost) =>{
		try {
			console.log("ID idImplementationCost", ImplementationCost._id, "ImplementationCost.GeneralExpense_id",ImplementationCost.GeneralExpense_id)
			console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/general-expense/post`,ImplementationCost)///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`, ImplementationCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ImplementationCost })
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
	//Ham them 1 chi phi chí cho 1 giai doan trien khai
	const addCostDetailStageImplement = async (ImplementationCost) =>{
		try {
			//console.log("ID idImplementationCost", ImplementationCost._id, "ImplementationCost.GeneralExpense_id",ImplementationCost.GeneralExpense_id)
			//console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/stages-implementation/post`,ImplementationCost)///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`, ImplementationCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ImplementationCost })
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
	// Delete ImplementationCost ??? Chua test
	const deleteImplementationCost = async ImplementationCostId => {
		try {
			const response = await axios.delete(`${apiUrl}api/forms/product-Cost/delete/${ImplementationCostId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCostId })
		} catch (error) {
			console.log(error)
		}
	}
	// Delete 1 Giai doan chi phi chung voi idImplementationCost / idContentCost
	const delete_StageGeneral_Expense = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost)
			console.log((`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost.idImplementationCost}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost.idImplementationCost}/${ImplementationCost.GeneralExpense_id}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCost })
		} catch (error) {
			console.log(error)
		}
	}
	// Delete 1 Giai doan chi phi Trien khai voi idImplementationCost / idContentCost
	const delete_StageImplementation = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost)
			console.log((`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost.idImplementationCost}/${ImplementationCost.StagesImplementation_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost.idImplementationCost}/${ImplementationCost.StagesImplementation_id}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCost })
		} catch (error) {
			console.log(error)
		}
	}

	// Delete 1chi phi trong chi phi Chung  Test: ok
	const delete_GeneralCostDetail = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost)

			console.log((`${apiUrl}api/forms/implementation-cost/general-cost-detail/delete/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}/${ImplementationCost.Costs_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/general-cost-detail/delete/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}/${ImplementationCost.Costs_id}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCost })
		} catch (error) {
			console.log(error)
		}
	}
	// Delete 1chi phi trong chi phi Giai doan
	const delete_StageCostDetail = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost)
			console.log((`${apiUrl}api/forms/implementation-cost/stage-cost-detail/delete/${ImplementationCost._id}/${ImplementationCost.StagesImplementation_id}/${ImplementationCost.Costs_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/stage-cost-detail/delete/${ImplementationCost._id}/${ImplementationCost.StagesImplementation_id}/${ImplementationCost.Costs_id}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCost })
		} catch (error) {
			console.log(error)
		}
	}

	// Find ImplementationCost when user is updating ImplementationCost ??? Chua test
	const findImplementationCost = ImplementationCostId => {
		const ImplementationCost = ImplementationCostState.ImplementationCosts.find(ImplementationCost => ImplementationCost._id === ImplementationCostId)
		//test
		console.log("findImplementationCost===",ImplementationCost)
		
		dispatch({ type: FIND, payload: ImplementationCost })
	}
//!!!!
	// Cap nhat giai doan chi phi chung (ContentCost) - cung ten phia backend
	const update_GeneralExpense_Content = async ImplementationCost => {
		console.log("${ImplementationCosts.idImplementationCost}", `${ImplementationCost.idImplementationCost}`)
		try {
			const response = await axios.put(
				console.log("Test URL",`${apiUrl}/api/forms/implementation-cost/general-expense/put/${ImplementationCost.idImplementationCost}/${ImplementationCost.GeneralExpense_id}`)
				`${apiUrl}/api/forms/implementation-cost/general-expense/put/${ImplementationCost.idImplementationCost}/${ImplementationCost.GeneralExpense_id}`, //note xem trong server
				
				ImplementationCost
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

	// ImplementationCost context data
	const ImplementationCostContextData = {
		ImplementationCostState,
		find_ImplementationCosts,

		addImplementationCost,
		showAddImplementationCostModal,
		setShowAddImplementationCostModal,

		// !!!!
		update_GeneralExpense_Content,
		showUpdateStageGeneralModal,
		setShowUpdateStageGeneralModal,
		

		showAddStageImplementationModal,
		setshowAddStageImplementationModal,
		addStageImplementation,

		showAddStageGeneralModal,
		setshowAddStageGeneralModal,
		addStageGeneral,

		
		addCostDetailGeneral,
		showAddCostDetailGeneralModal,
		setshowAddCostDetailGeneralModal,

		showToast,
		setShowToast,
		deleteImplementationCost,
		findImplementationCost,

		getImplementationCosts_byidContract,

		delete_StageGeneral_Expense, //xoa 1 giai doan chung
		delete_StageImplementation, //xoa 1 giai doan chi phi trien khai

		delete_GeneralCostDetail, 
		delete_StageCostDetail,
		dataOn_Click, setdataOn_Click,

		addCostDetailStageImplement,
		showAddCostDetailStageImplementModal,setshowAddCostDetailStageImplementModal

	}

	return (
		<ImplementationCostContext.Provider value={ImplementationCostContextData}>
			{children}
		</ImplementationCostContext.Provider>
	)
}

export default ImplementationCostContextProvider
