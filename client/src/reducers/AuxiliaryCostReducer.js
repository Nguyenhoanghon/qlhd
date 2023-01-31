import {
	LOADED_SUCCESS,
	LOADED_SUCCESS_PLAN1,
	LOADED_SUCCESS_PLAN2,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const AuxiliaryCostReducer = (state, action) => {
	const { type, payload, } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				AuxiliaryCosts: payload,
				AuxiliaryCostsLoading: false
			}
		case LOADED_SUCCESS_PLAN1:
			return {
				...state,
				AuxiliaryCostsPlan1: payload,
				AuxiliaryCostsLoading: false
			}
		case LOADED_SUCCESS_PLAN2:
			return {
				...state,
				AuxiliaryCostsPlan2: payload,
				AuxiliaryCostsLoading: false
			}
		case LOADED_FAIL:
			return {
				...state,
				AuxiliaryCosts: [],
				AuxiliaryCostsLoading: false
			}

		case ADD:
			return {
				...state,
				AuxiliaryCosts: [...state.AuxiliaryCosts, payload]
			}

		case DELETE:
			return {
				...state,
				AuxiliaryCosts: state.AuxiliaryCosts.filter(AuxiliaryCost => AuxiliaryCost._id !== payload)
			}

		case FIND:
			return { ...state, AuxiliaryCost: payload }

		case UPDATE:
			const newAuxiliaryCosts = state.AuxiliaryCosts.map(AuxiliaryCost =>
				AuxiliaryCost._id === payload._id ? payload : AuxiliaryCost
			)

			return {
				...state,
				AuxiliaryCosts: newAuxiliaryCosts
			}

		default:
			return state
	}
}
