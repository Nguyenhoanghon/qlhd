import { createContext, useReducer, useState } from 'react'
import { MiscExpenseCostReducer } from '../reducers/MiscExpenseCostReducer'//Note
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

export const MiscExpenseCostContext = createContext()

const MiscExpenseCostContextProvider = ({ children }) => {
	// State
	const [MiscExpenseCostState, dispatch] = useReducer(MiscExpenseCostReducer, {
		MiscExpenseCost: null,
		MiscExpenseCosts: [],
		MiscExpenseCostsLoading: true
	})

	const [showAddMiscExpenseCostModal, setShowAddMiscExpenseCostModal] = useState(false)
	const [showUpdateMiscExpenseCostModal, setShowUpdateMiscExpenseCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all MiscExpenseCosts
	const getMiscExpenseCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/misc-expense`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.MiscExpense })
				
			}
			console.log(response.data.MiscExpense);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	
	// Add MiscExpenseCost
	const addMiscExpenseCost = async newMiscExpenseCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/misc-expense/post`, newMiscExpenseCost)
			
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.MiscExpense })
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

	// Delete MiscExpenseCost
	
	const deleteMiscExpenseCost = async MiscExpenseCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/misc-expense/delete/${MiscExpenseCostId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: MiscExpenseCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find MiscExpenseCost when user is updating MiscExpenseCost
	const findMiscExpenseCost = MiscExpenseCostId => {
		const MiscExpenseCost = MiscExpenseCostState.MiscExpenseCosts.find(MiscExpenseCost => MiscExpenseCost._id === MiscExpenseCostId)
		dispatch({ type: FIND, payload: MiscExpenseCost })
	}

	// Update MiscExpenseCost
	const updateMiscExpenseCost = async updatedMiscExpenseCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/misc-expense/put/${updatedMiscExpenseCost._id}`,
				updatedMiscExpenseCost
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

	// MiscExpenseCost context data
	const MiscExpenseCostContextData = {
		MiscExpenseCostState,
		getMiscExpenseCosts,
		showAddMiscExpenseCostModal,
		setShowAddMiscExpenseCostModal,
		showUpdateMiscExpenseCostModal,
		setShowUpdateMiscExpenseCostModal,
		addMiscExpenseCost,
		showToast,
		setShowToast,
		deleteMiscExpenseCost,
		findMiscExpenseCost,
		updateMiscExpenseCost
	}

	return (
		<MiscExpenseCostContext.Provider value={MiscExpenseCostContextData}>
			{children}
		</MiscExpenseCostContext.Provider>
	)
}

export default MiscExpenseCostContextProvider
