import { createContext, useReducer, useState } from 'react'
import { ContractReducer } from '../reducers/ContractReducer'//Note
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

export const ContractContext = createContext()

export const ContractContextProvider = ({ children }) => {
	// State
	const [ContractState, dispatch] = useReducer(ContractReducer, {
		Contract: null,
		Contracts: [],
		ContractsLoading: true
	})

	const [showAddContractModal, setShowAddContractModal] = useState(false)
	const [showUpdateContractModal, setShowUpdateContractModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all Contracts
	const getContracts = async () => {
		try {
					const response = await axios.get(`${apiUrl}/api/forms/contract`)//note
					if (response.data.success) {
						dispatch({ type: LOADED_SUCCESS, payload: response.data.Contracts })//note
					}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	// Get Contract by id
	const getContract_byid = async ContractId  => {
		try {
					const response = await axios.get(`${apiUrl}/api/forms/contract/${ContractId}`)//note
					if (response.data.success) {
						dispatch({ type: LOADED_SUCCESS, payload: response.data.Contracts })//note
					}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	
	// insert Contract
	const addContract = async Contract => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/contract/post`, Contract)//note Users
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.Contract }) //note Users
				return response.data
			}

		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete Contract
	const deleteContract = async ContractId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/contract/delete/${ContractId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ContractId })
				console.log(ContractId)
		} catch (error) {
			console.log(error)
		}
	}

	// Find ContractId when ContractId is updating ContractId
	const findContract = async ContractId => {
		const Contract = ContractState.Contracts.find(Contract => Contract._id === ContractId)
		dispatch({ type: FIND, payload: Contract })
	}
	//View summary
	const Find_Contract_id = async id_contract => {
		try {
			const response = await axios.get(
				`${apiUrl}/api/forms/contract/${id_contract._id}`,
				id_contract
			)
			if (response.data.success) {
				dispatch({ type: FIND, payload: response.data.Contract })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
	// Update Contract
	const updateContract = async updateContract => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/contract/put/${updateContract._id}`,
				updateContract
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedContract })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Contract context data
	const ContractContextData = {
		ContractState,
		showAddContractModal,
		setShowAddContractModal,
		showUpdateContractModal,
		setShowUpdateContractModal,
		showToast,
		setShowToast,

		getContracts,
		addContract,
		deleteContract,
		findContract,
		updateContract,
		getContract_byid,
		Find_Contract_id

	}

	return (
		<ContractContext.Provider value={ContractContextData}>
			{children}
		</ContractContext.Provider>
	)
}


export default ContractContextProvider
