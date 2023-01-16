import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const ImplementationCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				ImplementationCosts: payload,
				ImplementationCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				ImplementationCosts: [],
				ImplementationCostsLoading: false
			}

		case ADD:
			return {
				...state,
				ImplementationCosts: [...state.ImplementationCosts, payload]
			}

		case DELETE:
			return {
				...state,
				ImplementationCosts: state.ImplementationCosts.filter(ImplementationCost => ImplementationCost._id !== payload)
			}

		case FIND:
			return { ...state, ImplementationCost: payload}

		case UPDATE:
			const newImplementationCosts = state.ImplementationCosts.map(ImplementationCost =>
				ImplementationCost._id === payload._id ? payload : ImplementationCost
			)

			return {
				...state,
				ImplementationCosts: newImplementationCosts
			}

		default:
			return state
	}
}
