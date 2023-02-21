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

	// Cap nhat giai doan chi phi CHUNG
	const [Data_GeneralExpense_Content, setData_GeneralExpense_Content] = useState({
		_id: '',
		GeneralExpense_id: '',
		GeneralExpense_Content: ''
	})
	const [showAdd_Stage_GeneralExpense_Modal, setshowAdd_Stage_GeneralExpense_Modal] = useState(false)
	const [showUpdate_Stage_GeneralExpense_Modal, setShowUpdate_Stage_GeneralExpense_Modal] = useState(false)
	// Cap nhat giai doan chi phi TRIEN KHAI
	const [Data_StagesImplementation_Content, setData_StagesImplementation_Content] = useState({
		_id: '',
		StagesImplementation_id: '',
		StagesImplementation_Content: ''
	})
	const [showUpdate_Stage_StagesImplementation_Modal, setshowUpdate_Stage_StagesImplementation_Modal] = useState(false)
	


	const [showAddCostDetailGeneralModal, setshowAddCostDetailGeneralModal] = useState(false)

	const [showAddStageImplementationModal, setshowAddStageImplementationModal] = useState(false)
	const [showAddCostDetailStageImplementModal, setshowAddCostDetailStageImplementModal] = useState(false)

	const [showAddImplementationCostModal, setShowAddImplementationCostModal] = useState(false)

	const [dataOn_Click, setdataOn_Click] = useState([])


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
	const addImplementationCost = async (newImplementationCost, idContract) => {
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
	const addStageImplementation = async (newImplementationCost, idContract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/stages-implementation/post/:idContract`, newImplementationCost)
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
	// Ham them 1 giai doan chi phí chung - Test: them duoc, nhung khong auto load sau khi them
	const add_Stage_GeneralExpense = async newImplementationCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/general-expense/post/:idcontract`, newImplementationCost)
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

	//Ham them 1 chi phi chí cho 1 giai doan chi phi chung 
	const addCostDetailGeneral = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost._id, "ImplementationCost.GeneralExpense_id", ImplementationCost.GeneralExpense_id)
			console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/general-expense/post`, ImplementationCost)///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`, ImplementationCost)
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
	const addCostDetailStageImplement = async (ImplementationCost) => {
		try {
			//console.log("ID idImplementationCost", ImplementationCost._id, "ImplementationCost.GeneralExpense_id",ImplementationCost.GeneralExpense_id)
			//console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post/${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
			const response = await axios.post(`${apiUrl}/api/forms/implementation-cost/stages-implementation/post`, ImplementationCost)///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`, ImplementationCost)
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
	const delete_Stage_GeneralExpense = async (GeneralExpense) => {
		try {
			console.log("Show Data_GeneralExpense ===>", GeneralExpense)
			console.log((`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${GeneralExpense.idImplementationCost}/${GeneralExpense.GeneralExpense_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${GeneralExpense._id}/${GeneralExpense.GeneralExpense_id}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: response })
		} catch (error) {
			console.log(error)
		}
	}

	// Delete 1 Giai doan chi phi Trien khai voi idImplementationCost / idContentCost
	const delete_Stage_StageImplementation = async (ImplementationCost) => {
		try {
			console.log("ID idImplementationCost", ImplementationCost)
			console.log((`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost._id}/${ImplementationCost.StagesImplementation_id}`))
			const response = await axios.delete(`${apiUrl}/api/forms/implementation-cost/content-cost/delete/${ImplementationCost._id}/${ImplementationCost.StagesImplementation_id}`)//note
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
		console.log("GetID == ", ImplementationCostId)
		const ImplementationCost = ImplementationCostState.ImplementationCosts.find(ImplementationCost => ImplementationCost._id === ImplementationCostId.idImplementationCost)
		//test
		console.log("findImplementationCost sddadad== ", ImplementationCost)
		dispatch({ type: FIND, payload: ImplementationCost })
	}

	//!!!!
	// Cap nhat giai doan chi phi chung (ContentCost)
	const update_GeneralExpense_Content = async (updatedImplementationCost, Data_GeneralExpense) => {
		console.log("Test URL", `${apiUrl}/api/forms/implementation-cost/general-expense/put/${Data_GeneralExpense._id}/${Data_GeneralExpense.GeneralExpense_id}`)
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/implementation-cost/general-expense/put/${Data_GeneralExpense._id}/${Data_GeneralExpense.GeneralExpense_id}`, //note xem trong server
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
	//!!!!
	//
	const update_StagesImplementation_Content = async (dataUpdate, Data_StagesImplementation) => {
		console.log("Test URL", `${apiUrl}/api/forms/implementation-cost/stages-implementation/put/${Data_StagesImplementation._id}/${Data_StagesImplementation.StagesImplementation_id}`)
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/implementation-cost/stages-implementation/put/${Data_StagesImplementation._id}/${Data_StagesImplementation.StagesImplementation_id}`, //note xem trong server
				dataUpdate
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

		// !!!! CHI PHI CHUNG
		Data_GeneralExpense_Content, setData_GeneralExpense_Content,
		add_Stage_GeneralExpense,
		showAdd_Stage_GeneralExpense_Modal, setshowAdd_Stage_GeneralExpense_Modal,
		update_GeneralExpense_Content,
		showUpdate_Stage_GeneralExpense_Modal, setShowUpdate_Stage_GeneralExpense_Modal,
		delete_Stage_GeneralExpense,
		// !!!! CHI PHI TRIEN KHAI
		Data_StagesImplementation_Content,
		setData_StagesImplementation_Content,
		update_StagesImplementation_Content,
		showUpdate_Stage_StagesImplementation_Modal,
		setshowUpdate_Stage_StagesImplementation_Modal,
		delete_Stage_StageImplementation, //xoa 1 giai doan chi phi trien khai

		
		
		showAddStageImplementationModal,
		setshowAddStageImplementationModal,
		addStageImplementation,


		addCostDetailGeneral,
		showAddCostDetailGeneralModal,
		setshowAddCostDetailGeneralModal,

		showToast,
		setShowToast,
		deleteImplementationCost,
		findImplementationCost,

		getImplementationCosts_byidContract,


		

		delete_GeneralCostDetail,
		delete_StageCostDetail,
		dataOn_Click, setdataOn_Click,

		addCostDetailStageImplement,
		showAddCostDetailStageImplementModal, setshowAddCostDetailStageImplementModal

	}

	return (
		<ImplementationCostContext.Provider value={ImplementationCostContextData}>
			{children}
		</ImplementationCostContext.Provider>
	)
}

export default ImplementationCostContextProvider
