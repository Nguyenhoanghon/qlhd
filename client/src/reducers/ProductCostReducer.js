import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const ProductCostReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				ProductCosts: payload,
				ProductCostsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				ProductCosts: [],
				ProductCostsLoading: false
			}

		case ADD:
			return {
				...state,
				ProductCosts: [...state.ProductCosts, payload]
			}

		case DELETE:
			return {
				...state,
				ProductCosts: state.ProductCosts.filter(ProductCost => ProductCost._id !== payload)
			}

		case FIND:
			return { ...state, ProductCost: payload }

		case UPDATE:
			const newProductCosts = state.ProductCosts.map(ProductCost =>
				ProductCost._id === payload._id ? payload : ProductCost
			)

			return {
				...state,
				ProductCosts: newProductCosts
			}

		default:
			return state
	}
}
