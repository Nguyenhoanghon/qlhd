import { createContext, useReducer, useState } from 'react'
import { MandayCostReducer } from '../reducers/MandayCostReducer'//Note
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

export const MandayCostContext = createContext()

const MandayCostContextProvider = ({ children }) => {
	// State
	const [MandayCostState, dispatch] = useReducer(MandayCostReducer, {
		MandayCost: null,
		MandayCosts: [],
		MandayCostsLoading: true
	})

	const [showAddMandayCostModal, setShowAddMandayCostModal] = useState(false)
	const [showUpdateMandayCostModal, setShowUpdateMandayCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all MandayCosts
	const getMandayCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/manday-cost`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.MandayCost })
				
			}
			console.log(response.data.MandayCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
		// Get  MandayCost by idcontract
		const getMandayCost_byidContract = async (ContractId) => {
			try {
				const response = await axios.get(`${apiUrl}/api/forms/manday-cost/contract/${ContractId}`)
				if (response.data.success) {
					dispatch({ type: LOADED_SUCCESS, payload: response.data.MandayCost })
					
				}
				//console.log(response.data.MandayCost);
			} catch (error) {
				dispatch({ type: LOADED_FAIL })
			}
		}

	// Add MandayCost
	const addMandayCost = async newMandayCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/manday-cost/post`, newMandayCost)
			
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.MandayCost })
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

	// Delete MandayCost
	
	const deleteMandayCost = async MandayCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/manday-cost/delete/${MandayCostId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: MandayCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find MandayCost when user is updating MandayCost
	const findMandayCost = MandayCostId => {
		const MandayCost = MandayCostState.MandayCosts.find(MandayCost => MandayCost._id === MandayCostId)
		dispatch({ type: FIND, payload: MandayCost })
	}

	// Update MandayCost
	const updateMandayCost = async updatedMandayCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/manday-cost/put/${updatedMandayCost._id}`,
				updatedMandayCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedMandayCost })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// MandayCost context data
	const MandayCostContextData = {
		MandayCostState,
		getMandayCosts,
		showAddMandayCostModal,
		setShowAddMandayCostModal,
		showUpdateMandayCostModal,
		setShowUpdateMandayCostModal,
		addMandayCost,
		showToast,
		setShowToast,
		deleteMandayCost,
		findMandayCost,
		updateMandayCost,
		getMandayCost_byidContract
	}

	return (
		<MandayCostContext.Provider value={MandayCostContextData}>
			{children}
		</MandayCostContext.Provider>
	)
}

export default MandayCostContextProvider
