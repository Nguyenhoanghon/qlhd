import { createContext, useReducer, useState } from 'react'
import { CPVReducer } from '../reducers/CPVReducer'
import { ProductCostReducer } from '../reducers/ProductCostReducer'
//import { ProductCostReducer } from '../reducers/ProductCostReducer'//Note
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

export const CPVContext = createContext()

const CPVContextProvider = ({ children }) => {
	// State
	const [CPVState,  dispatch] = useReducer(CPVReducer, {
		CPV: null,
		CPVs: [],
		CPVsLoading: true
	})
	const [ProductCostState, dispatchProductCost] = useReducer(ProductCostReducer, {
		ProductCost: null,
		ProductCosts: [],
		ProductCostsLoading: true
	}) 

	const [showAddCPVModal, setShowAddCPVModal] = useState(false)
	const [showUpdateCPVModal, setShowUpdateCPVModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all CPVs
	const getCPVs = async () => {
		try {
			const response = await axios.get(`${apiUrl}/chiphivon/view`)
			//const response_ProductCost = await axios.get(`${apiUrl}/chitiethanghoa`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ChiPhiVons  })
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}

	}
	/* const getProductCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/chitiethanghoa`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ChiTietHangHoas })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	} */
	// Add CPV
	const addCPV = async newCPV => {
		try {
			const response = await axios.post(`${apiUrl}/chiphivon/insert`, newCPV)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ChiPhiVon })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete CPV
	const deleteCPV = async CPVId => {
		try {
			const response = await axios.delete(`${apiUrl}/chiphivon/delete/${CPVId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: CPVId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find CPV when user is updating CPV
	const findCPV = CPVId => {
		const CPV = CPVState.CPVs.find(CPV => CPV._id === CPVId)
		dispatch({ type: FIND, payload: CPV })
	}

	// Update CPV
	const updateCPV = async updatedCPV => {
		try {
			const response = await axios.put(
				`${apiUrl}/chiphivon/update/${updatedCPV._id}`,
				updatedCPV
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedChiPhiVon })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// CPV context data
	const CPVContextData = {
		CPVState,
		getCPVs,
		showAddCPVModal,
		setShowAddCPVModal,
		showUpdateCPVModal,
		setShowUpdateCPVModal,
		addCPV,
		showToast,
		setShowToast,
		deleteCPV,
		findCPV,
		updateCPV,
	}

	return (
		<CPVContext.Provider value={CPVContextData}>
			{children}
		</CPVContext.Provider>
	)
}

export default CPVContextProvider
