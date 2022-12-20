import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const ContractReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				Contracts: payload,
				ContractsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				Contracts: [],
				ContractsLoading: false
			}

		case ADD:
			return {
				...state,
				Contracts: [...state.Contracts, payload]
			}

		case DELETE:
			return {
				...state,
				Contracts: state.Contracts.filter(Contract => Contract._id !== payload)
			}

		case FIND:
			return { ...state, Contract: payload }

		case UPDATE:
			const newContracts = state.Contracts.map(Contract =>
				Contract._id === payload._id ? payload : Contract
			)

			return {
				...state,
				Contracts: newContracts
			}

		default:
			return state
	}
}
