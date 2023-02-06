import { createContext, useReducer, useState } from 'react'
import { AuxiliaryCostReducer } from '../reducers/AuxiliaryCostReducer'//Note
import {
	apiUrl,
	LOADED_FAIL,
	LOADED_SUCCESS,
	LOADED_SUCCESS_PLAN1,
	LOADED_SUCCESS_PLAN2,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from './constants'//Note
import axios from 'axios'

export const AuxiliaryCostContext = createContext()

const AuxiliaryCostContextProvider = ({ children }) => {
	// State
	const [AuxiliaryCostState, dispatch] = useReducer(AuxiliaryCostReducer, {
		AuxiliaryCostsPlan1: [],
		AuxiliaryCostsPlan2: [],
		AuxiliaryCost: [],
		AuxiliaryCosts: [],
		AuxiliaryCostsLoading: true
	})

	const [showAddAuxiliaryCostModal, setShowAddAuxiliaryCostModal] = useState(false)
	const [showUpdateAuxiliaryCostModal, setShowUpdateAuxiliaryCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all AuxiliaryCosts
	const getAuxiliaryCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/auxiliary-cost`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.AuxiliaryCost })
				
			}
			console.log(response.data.AuxiliaryCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Get AuxiliaryCosts by idContract
	const getAuxiliaryCosts_byidContract = async (idcontract) => {
		console.log("trong getAuxiliaryCosts_byidContract",idcontract)
		try {
			const response = await axios.get(`${apiUrl}/api/forms/auxiliary-cost/contract/${idcontract}`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.AuxiliaryCost })
				
			}
			console.log(response.data.AuxiliaryCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	// Get AuxiliaryCosts by idContract and Plan
	const getAuxiliaryCosts_byidContract_Plan1 = async (idContract,Plan) => {
		try {
				const response = await axios.get(`${apiUrl}/api/forms/auxiliary-cost/contract/${idContract}/${Plan}`)
				if (response.data.success) {
					dispatch({ type: LOADED_SUCCESS_PLAN1, payload: response.data.AuxiliaryCost_data })
				}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	// Get AuxiliaryCosts by idContract and Plan
	const getAuxiliaryCosts_byidContract_Plan2 = async (idContract,Plan) => {
		try {
				const response = await axios.get(`${apiUrl}/api/forms/auxiliary-cost/contract/${idContract}/${Plan}`)
				if (response.data.success) {
					dispatch({ type: LOADED_SUCCESS_PLAN2, payload: response.data.AuxiliaryCost_data })
				}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	
	// Add AuxiliaryCost
	const addAuxiliaryCost = async newAuxiliaryCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/auxiliary-cost/post`, newAuxiliaryCost)
			
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.AuxiliaryCost })
				return response.data
			}
			else
				return response.data //Hợp đồng không tồn tại
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete AuxiliaryCost
	
	const deleteAuxiliaryCost = async AuxiliaryCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/auxiliary-cost/delete/${AuxiliaryCostId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: AuxiliaryCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find AuxiliaryCost when user is updating AuxiliaryCost
	const findAuxiliaryCost = AuxiliaryCostId => {
		const AuxiliaryCost = AuxiliaryCostState.AuxiliaryCosts.find(AuxiliaryCost => AuxiliaryCost._id === AuxiliaryCostId)
		dispatch({ type: FIND, payload: AuxiliaryCost })
	}

	// Update AuxiliaryCost
	const updateAuxiliaryCost = async updatedAuxiliaryCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/auxiliary-cost/put/${updatedAuxiliaryCost._id}`,
				updatedAuxiliaryCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedMiscExpense })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// AuxiliaryCost context data
	const AuxiliaryCostContextData = {
		AuxiliaryCostState,
		getAuxiliaryCosts,
		showAddAuxiliaryCostModal,
		setShowAddAuxiliaryCostModal,
		showUpdateAuxiliaryCostModal,
		setShowUpdateAuxiliaryCostModal,
		addAuxiliaryCost,
		showToast,
		setShowToast,
		deleteAuxiliaryCost,
		findAuxiliaryCost,
		updateAuxiliaryCost,
		getAuxiliaryCosts_byidContract,
		getAuxiliaryCosts_byidContract_Plan1,
		getAuxiliaryCosts_byidContract_Plan2
	}

	return (
		<AuxiliaryCostContext.Provider value={AuxiliaryCostContextData}>
			{children}
		</AuxiliaryCostContext.Provider>
	)
}

export default AuxiliaryCostContextProvider
