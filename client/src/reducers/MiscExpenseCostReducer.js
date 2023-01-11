import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const MiscExpenseCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				MiscExpenseCosts: payload,
				MiscExpenseCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				MiscExpenseCosts: [],
				MiscExpenseCostsLoading: false
			}

		case ADD:
			return {
				...state,
				MiscExpenseCosts: [...state.MiscExpenseCosts, payload]
			}

		case DELETE:
			return {
				...state,
				MiscExpenseCosts: state.MiscExpenseCosts.filter(MiscExpenseCost => MiscExpenseCost._id !== payload)
			}

		case FIND:
			return { ...state, MiscExpenseCost: payload }

		case UPDATE:
			const newMiscExpenseCosts = state.MiscExpenseCosts.map(MiscExpenseCost =>
				MiscExpenseCost._id === payload._id ? payload : MiscExpenseCost
			)

			return {
				...state,
				MiscExpenseCosts: newMiscExpenseCosts
			}

		default:
			return state
	}
}
