import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const MandayCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				MandayCosts: payload,
				MandayCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				MandayCosts: [],
				MandayCostsLoading: false
			}

		case ADD:
			return {
				...state,
				MandayCosts: [...state.MandayCosts, payload]
			}

		case DELETE:
			return {
				...state,
				MandayCosts: state.MandayCosts.filter(MandayCost => MandayCost._id !== payload)
			}

		case FIND:
			return { ...state, MandayCost: payload }

		case UPDATE:
			const newMandayCosts = state.MandayCosts.map(MandayCost =>
				MandayCost._id === payload._id ? payload : MandayCost
			)

			return {
				...state,
				MandayCosts: newMandayCosts
			}

		default:
			return state
	}
}
