import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const GuaranteeLetterCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				GuaranteeLetterCosts: payload,
				GuaranteeLetterCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				GuaranteeLetterCosts: [],
				GuaranteeLetterCostsLoading: false
			}

		case ADD:
			return {
				...state,
				GuaranteeLetterCosts: [...state.GuaranteeLetterCosts, payload]
			}

		case DELETE:
			return {
				...state,
				GuaranteeLetterCosts: state.GuaranteeLetterCosts.filter(GuaranteeLetterCost => GuaranteeLetterCost._id !== payload)
			}

		case FIND:
			return { ...state, GuaranteeLetterCost: payload }

		case UPDATE:
			const newGuaranteeLetterCosts = state.GuaranteeLetterCosts.map(GuaranteeLetterCost =>
				GuaranteeLetterCost._id === payload._id ? payload : GuaranteeLetterCost
			)

			return {
				...state,
				GuaranteeLetterCosts: newGuaranteeLetterCosts
			}

		default:
			return state
	}
}
