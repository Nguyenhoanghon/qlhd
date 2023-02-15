import { createContext, useReducer, useState } from 'react'
import {apiUrl,LOADED_FAIL,LOADED_SUCCESS,ADD,DELETE,UPDATE,FIND,ADDSTAGE} from './constants'
import { ImplementationCostReducer } from '../reducers/ImplementationCostReducer'
import axios from 'axios'

export const ImplementationCostContext = createContext()
const ImplementationCostContextProvider = ({ children }) => {
	// State
	const [ImplementationCostState, dispatch] = useReducer(ImplementationCostReducer, {
		ImplementationCost: null,
		ImplementationCosts: [],
		StageImplementation: [],
		ImplementationCostsLoading: true
	})
	const [showAddStageImplementationModal, setshowAddStageImplementationModal] = useState(false)
	const [showAddStageGeneralModal, setshowAddStageGeneralModal] = useState(false)
	const [showAddCostDetailGeneralModal, setshowAddCostDetailGeneralModal] = useState(false)
	const [showAddImplementationCostModal, setShowAddImplementationCostModal] = useState(false)

	const [showUpdateImplementationCostModal, setShowUpdateImplementationCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all ImplementationCosts
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
	// Get ImplementationCosts by idContract 
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

	// Add ImplementationCost !!!check ok
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
	const addCostDetailGeneral = async ImplementationCost =>{
		try {
			console.log("ID idImplementationCost", ImplementationCost)
			console.log((`${apiUrl}/api/forms/implementation-cost/general-expense/post`))///${ImplementationCost._id}/${ImplementationCost.GeneralExpense_id}`))
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
	// Delete ImplementationCost ???
	const deleteImplementationCost = async ImplementationCostId => {
		try {
			const response = await axios.delete(`${apiUrl}api/forms/product-Cost/delete/${ImplementationCostId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ImplementationCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Delete 1chi phi trong chi phi Chung 
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

	// Find ImplementationCost when user is updating ImplementationCost
	const findImplementationCost = ImplementationCostId => {
		const ImplementationCost = ImplementationCostState.ImplementationCosts.find(ImplementationCost => ImplementationCost._id === ImplementationCostId)
		dispatch({ type: FIND, payload: ImplementationCost })
	}

	// Update ImplementationCost
	const updateImplementationCost = async updatedImplementationCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/product-Cost/put/${updatedImplementationCost._id}`, //note xem trong server
				updatedImplementationCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updateImplementationCost }) //note updateImplementationCost biến trả về từ server
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

		showAddImplementationCostModal,
		setShowAddImplementationCostModal,
		showUpdateImplementationCostModal,
		setShowUpdateImplementationCostModal,
		addImplementationCost,

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
		updateImplementationCost,
		getImplementationCosts_byidContract,
		delete_GeneralCostDetail,
		delete_StageCostDetail

	}

	return (
		<ImplementationCostContext.Provider value={ImplementationCostContextData}>
			{children}
		</ImplementationCostContext.Provider>
	)
}

export default ImplementationCostContextProvider
