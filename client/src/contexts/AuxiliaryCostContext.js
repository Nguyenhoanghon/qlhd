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
		AuxiliaryCost: [],
		AuxiliaryCosts: [],
		Contracts:[],
		AuxiliaryCostsLoading: true
	})
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})
	const [showcreate_AuxiliaryCost_Modal, setshowcreate_AuxiliaryCost_Modal] = useState(false)

	const [showadd_AuxiliaryCost_Cost_Modal, setshowadd_AuxiliaryCost_Cost_Modal] = useState(false)

	const [Data_AuxiliaryCost_Cost, setData_AuxiliaryCost_Cost] = useState([])
	const [showupdate_AuxiliaryCost_Cost_Modal, setshowupdate_AuxiliaryCost_Cost_Modal] = useState(false)

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

	// Get all AuxiliaryCosts
	const getContract_All= async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/contract/`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Contracts })

			}
			console.log(response.data.Contracts);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Get AuxiliaryCosts by idContract
	//Execute: running
	const getAuxiliaryCosts_byidContract = async (idcontract) => {
		console.log("trong getAuxiliaryCosts_byidContract", idcontract)
		try {
			const response = await axios.get(`${apiUrl}/api/forms/auxiliary-cost/contract/${idcontract}`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.AuxiliaryCost })

			}
			//console.log(response.data.AuxiliaryCost);
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// create_AuxiliaryCost
	//Execute: running
	const create_AuxiliaryCost = async (newAuxiliaryCost, idcontract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/auxiliary-cost/post/${idcontract}`, newAuxiliaryCost)

			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.newAuxiliaryCost })
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

	//add_AuxiliaryCost_Cost
	//Execute: running
	const add_AuxiliaryCost_Cost = async (newAuxiliaryCost, idcontract) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/auxiliary-cost/post/cost/${idcontract}`, newAuxiliaryCost)

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
	// //Execute: running
	const deleteAuxiliaryCost = async (IDs) => {
		try {
			console.log("IDs======:", IDs)
			console.log("Url", `${apiUrl}/api/forms/auxiliary-cost/delete/contract/${IDs.idcontract}/${IDs.idCost}`)
			const response = await axios.delete(`${apiUrl}/api/forms/auxiliary-cost/delete/contract/${IDs.idcontract}/${IDs.idCost}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: response })
		} catch (error) {
			console.log(error)
		}
	}

	// Find AuxiliaryCost when user is updating AuxiliaryCost
	//Execute: No
	const findAuxiliaryCost = AuxiliaryCostId => {
		const AuxiliaryCost = AuxiliaryCostState.AuxiliaryCosts.find(AuxiliaryCost => AuxiliaryCost._id === AuxiliaryCostId)
		dispatch({ type: FIND, payload: AuxiliaryCost })
	}

	// Update AuxiliaryCost
	//Execute: running
	const updateAuxiliary_Cost = async (Data_AuxiliaryCost_Cost, IDs) => {
		console.log("IDs===>", IDs)
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/auxiliary-cost/put/cost/${IDs.idcontract}/${IDs.idCost}`,
				Data_AuxiliaryCost_Cost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updateAuxiliaryCost })
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
		getAuxiliaryCosts_byidContract,

		create_AuxiliaryCost,
		showcreate_AuxiliaryCost_Modal,
		setshowcreate_AuxiliaryCost_Modal,

		add_AuxiliaryCost_Cost,
		showadd_AuxiliaryCost_Cost_Modal, setshowadd_AuxiliaryCost_Cost_Modal,

		deleteAuxiliaryCost,


		updateAuxiliary_Cost,
		Data_AuxiliaryCost_Cost, setData_AuxiliaryCost_Cost,
		showupdate_AuxiliaryCost_Cost_Modal, setshowupdate_AuxiliaryCost_Cost_Modal,

		getAuxiliaryCosts,
		getContract_All, //not run

		showToast,
		setShowToast,
	}

	return (
		<AuxiliaryCostContext.Provider value={AuxiliaryCostContextData}>
			{children}
		</AuxiliaryCostContext.Provider>
	)
}

export default AuxiliaryCostContextProvider
