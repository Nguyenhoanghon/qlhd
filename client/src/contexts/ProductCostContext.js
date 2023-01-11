import { createContext, useReducer, useState } from 'react'
import { ProductCostReducer } from '../reducers/ProductCostReducer'//Note
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

export const ProductCostContext = createContext()

const ProductCostContextProvider = ({ children }) => {
	// State
	const [ProductCostState, dispatch] = useReducer(ProductCostReducer, {
		ProductCost: null,
		ProductCosts: [],
		ProductCostsLoading: true
	})

	const [showAddProductCostModal, setShowAddProductCostModal] = useState(false)
	const [showUpdateProductCostModal, setShowUpdateProductCostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all ProductCosts
	const getProductCosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/api/forms/product-Cost`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ProductCost })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add ProductCost
	const addProductCost = async newProductCost => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/product-cost/post`, newProductCost)//note mandaykysu
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ProductCost }) //note MandayKysu
				return response.data
			}
			else
				return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete ProductCost
	const deleteProductCost = async ProductCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/product-Cost/delete/${ProductCostId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: ProductCostId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find ProductCost when user is updating ProductCost
	const findProductCost = ProductCostId => {
		const ProductCost = ProductCostState.ProductCosts.find(ProductCost => ProductCost._id === ProductCostId)
		dispatch({ type: FIND, payload: ProductCost })
	}

	// Update ProductCost
	const updateProductCost = async updatedProductCost => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/product-Cost/put/${updatedProductCost._id}`, //note xem trong server
				updatedProductCost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.ChiTietHangHoa }) //note MandayKysu biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// ProductCost context data
	const ProductCostContextData = {
		ProductCostState,
		getProductCosts,
		showAddProductCostModal,
		setShowAddProductCostModal,
		showUpdateProductCostModal,
		setShowUpdateProductCostModal,
		addProductCost,
		showToast,
		setShowToast,
		deleteProductCost,
		findProductCost,
		updateProductCost
	}

	return (
		<ProductCostContext.Provider value={ProductCostContextData}>
			{children}
		</ProductCostContext.Provider>
	)
}

export default ProductCostContextProvider
