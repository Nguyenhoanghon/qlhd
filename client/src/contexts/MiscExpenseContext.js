import { createContext, useReducer, useState } from 'react'
import { CPKReducer } from '../reducers/CPKReducer'//Note
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

export const CPKContext = createContext()

const CPKContextProvider = ({ children }) => {
	// State
	const [CPKState, dispatch] = useReducer(CPKReducer, {
		CPK: null,
		CPKs: [],
		CPKsLoading: true
	})

	const [showAddCPKModal, setShowAddCPKModal] = useState(false)
	const [showUpdateCPKModal, setShowUpdateCPKModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all CPKs
	const getCPKs = async () => {
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
	
	// Add CPK
	const addCPK = async newCPK => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/misc-expense/post`, newCPK)
			
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

	// Delete CPK
	
	const deleteCPK = async CPKId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/misc-expense/delete/${CPKId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: CPKId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find CPK when user is updating CPK
	const findCPK = CPKId => {
		const CPK = CPKState.CPKs.find(CPK => CPK._id === CPKId)
		dispatch({ type: FIND, payload: CPK })
	}

	// Update CPK
	const updateCPK = async updatedCPK => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/misc-expense/put/${updatedCPK._id}`,
				updatedCPK
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

	// CPK context data
	const CPKContextData = {
		CPKState,
		getCPKs,
		showAddCPKModal,
		setShowAddCPKModal,
		showUpdateCPKModal,
		setShowUpdateCPKModal,
		addCPK,
		showToast,
		setShowToast,
		deleteCPK,
		findCPK,
		updateCPK
	}

	return (
		<CPKContext.Provider value={CPKContextData}>
			{children}
		</CPKContext.Provider>
	)
}

export default CPKContextProvider
