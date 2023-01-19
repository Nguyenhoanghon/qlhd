import { createContext, useReducer, useState } from 'react'
import { GuaranteeLetterCostReducer } from '../reducers/GuaranteeLetterCostReducer'//Note
import {
	apiUrl,
	LOADED_FAIL,
	LOADED_SUCCESS,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from './constants'//Note
import axios from 'axios'

export const GuaranteeLetterCostContext = createContext()

const GuaranteeLetterCostContextProvider = ({ children }) => {
	// State
	const [GuaranteeLetterCostState, dispatch] = useReducer(GuaranteeLetterCostReducer, {
		GuaranteeLetterCost: null,
		GuaranteeLetterCosts: [],
		GuaranteeLetterCostsLoading: true
	})

	const [showAddGuaranteeLetterCostModal, setShowAddGuaranteeLetterCostModal] = useState(false)
	const [showUpdateGuaranteeLetterCostModal, setShowUpdateGuaranteeLetterCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all GuaranteeLetterCosts
	const getGuaranteeLetterCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/Guarantee-letter-cost`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.GuaranteeLetterCost })
				
			}
			console.log(response.data.GuaranteeLetterCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Get  GuaranteeLetterCost by idcontract
	const getGuaranteeLetterCost_byidContract = async (ContractId) => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/Guarantee-letter-cost/contract/${ContractId}`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.GuaranteeLetterCost })
				
			}
			console.log(response.data.GuaranteeLetterCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add GuaranteeLetterCost
	const addGuaranteeLetterCost = async newGuaranteeLetterCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/Guarantee-letter-cost/post`, newGuaranteeLetterCost)
			
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.GuaranteeLetterCost })
				return response.data
			}
			// neu them không thành công
			else {
				return response.data
			} 
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete GuaranteeLetterCost
	
	const deleteGuaranteeLetterCost = async GuaranteeLetterCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/Guarantee-letter-cost/delete/${GuaranteeLetterCostId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: GuaranteeLetterCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find GuaranteeLetterCost when user is updating GuaranteeLetterCost
	const findGuaranteeLetterCost = GuaranteeLetterCostId => {
		const GuaranteeLetterCost = GuaranteeLetterCostState.GuaranteeLetterCosts.find(GuaranteeLetterCost => GuaranteeLetterCost._id === GuaranteeLetterCostId)
		dispatch({ type: FIND, payload: GuaranteeLetterCost })
	}

	// Update GuaranteeLetterCost
	const updateGuaranteeLetterCost = async updatedGuaranteeLetterCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/Guarantee-letter-cost/put/${updatedGuaranteeLetterCost._id}`,
				updatedGuaranteeLetterCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedGuaranteeLetterCost })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// GuaranteeLetterCost context data
	const GuaranteeLetterCostContextData = {
		GuaranteeLetterCostState,
		getGuaranteeLetterCosts,
		showAddGuaranteeLetterCostModal,
		setShowAddGuaranteeLetterCostModal,
		showUpdateGuaranteeLetterCostModal,
		setShowUpdateGuaranteeLetterCostModal,
		addGuaranteeLetterCost,
		showToast,
		setShowToast,
		deleteGuaranteeLetterCost,
		findGuaranteeLetterCost,
		updateGuaranteeLetterCost,
		getGuaranteeLetterCost_byidContract
	}

	return (
		<GuaranteeLetterCostContext.Provider value={GuaranteeLetterCostContextData}>
			{children}
		</GuaranteeLetterCostContext.Provider>
	)
}

export default GuaranteeLetterCostContextProvider
