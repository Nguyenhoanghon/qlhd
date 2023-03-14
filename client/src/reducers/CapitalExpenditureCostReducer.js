import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const CapitalExpenditureCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				CapitalExpenditureCosts: payload,
				CapitalExpenditureCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				CapitalExpenditureCosts: [],
				CapitalExpenditureCostsLoading: false
			}

		case ADD:
			return {
				...state,
				CapitalExpenditureCosts: [...state.CapitalExpenditureCosts, payload]
			}

		case DELETE:
			return {
				...state,
				CapitalExpenditureCosts: state.CapitalExpenditureCosts.filter(CapitalExpenditureCost => CapitalExpenditureCost._id !== payload)
			}

		case FIND:
			return { ...state, CapitalExpenditureCost: payload }

		case UPDATE:
			
			const newCapitalExpenditureCosts = state.CapitalExpenditureCosts.map(CapitalExpenditureCost =>
				CapitalExpenditureCost._id === payload._id ? payload : CapitalExpenditureCost
			)

			return {
				...state,
				CapitalExpenditureCosts: newCapitalExpenditureCosts
			}

		default:
			return state
	}
}
