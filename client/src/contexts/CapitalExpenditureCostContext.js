import { createContext, useReducer, useState } from 'react'
import { CapitalExpenditureCostReducer } from '../reducers/CapitalExpenditureCostReducer'
import { ProductCostReducer } from '../reducers/ProductCostReducer'
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

export const CapitalExpenditureCostContext = createContext()

const CapitalExpenditureCostContextProvider = ({ children }) => {
	// State
	const [CapitalExpenditureCostState,  dispatch] = useReducer(CapitalExpenditureCostReducer, {
		CapitalExpenditureCost: null,
		CapitalExpenditureCosts: [],
		CapitalExpenditureCostsLoading: true
	})
	const [ProductCostState, dispatchProductCost] = useReducer(ProductCostReducer, {
		ProductCost: null,
		ProductCosts: [],
		ProductCostsLoading: true
	}) 

	const [showAddCapitalExpenditureCostModal, setShowAddCapitalExpenditureCostModal] = useState(false)
	const [showUpdateCapitalExpenditureCostModal, setShowUpdateCapitalExpenditureCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all CapitalExpenditureCosts
	const getCapitalExpenditureCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/capital-expenditure-cost`)
			console.log("test",response)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.CapitalExpenditureCost  })
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}

	}

	// Get CapitalExpenditureCosts by idContract
	const getCapitalExpenditureCosts_byidContract = async (idContract) => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/capital-expenditure-cost/contract/${idContract}`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.CapitalExpenditureCost  })
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}

	}
	
	// Add CapitalExpenditureCost
	const addCapitalExpenditureCost = async newCapitalExpenditureCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/capital-expenditure-cost/post`, newCapitalExpenditureCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.CapitalExpenditureCost })
				return response.data 
			}
			else
				return response.data //Message hop dong kg ton tai
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete CapitalExpenditureCost
	const deleteCapitalExpenditureCost = async CapitalExpenditureCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/capital-expenditure-cost/delete/${CapitalExpenditureCostId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: CapitalExpenditureCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find CapitalExpenditureCost when user is updating CapitalExpenditureCost
	const findCapitalExpenditureCost = CapitalExpenditureCostId => {
		const CapitalExpenditureCost = CapitalExpenditureCostState.CapitalExpenditureCosts.find(CapitalExpenditureCost => CapitalExpenditureCost._id === CapitalExpenditureCostId)
		dispatch({ type: FIND, payload: CapitalExpenditureCost })
	}

	// Update CapitalExpenditureCost
	const updateCapitalExpenditureCost = async updatedCapitalExpenditureCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/capital-expenditure-cost/put/${updatedCapitalExpenditureCost._id}`,
				updatedCapitalExpenditureCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedCapitalExpenditureCost })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// CapitalExpenditureCost context data
	const CapitalExpenditureCostContextData = {
		CapitalExpenditureCostState,
		getCapitalExpenditureCosts,
		showAddCapitalExpenditureCostModal,
		setShowAddCapitalExpenditureCostModal,
		showUpdateCapitalExpenditureCostModal,
		setShowUpdateCapitalExpenditureCostModal,
		addCapitalExpenditureCost,
		showToast,
		setShowToast,
		deleteCapitalExpenditureCost,
		findCapitalExpenditureCost,
		updateCapitalExpenditureCost,
		getCapitalExpenditureCosts_byidContract
	}

	return (
		<CapitalExpenditureCostContext.Provider value={CapitalExpenditureCostContextData}>
			{children}
		</CapitalExpenditureCostContext.Provider>
	)
}

export default CapitalExpenditureCostContextProvider
