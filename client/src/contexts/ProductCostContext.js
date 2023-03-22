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
		ProductCost: [],
		ProductCosts: [],
		ProductCostsLoading: true
	})
	const [showAddProductCostModal, setShowAddProductCostModal] = useState(false)
	const [showUpdateProductCostModal, setshowUpdateProductCostModal] = useState(false)
	const [ShowAddIncentive_Modal,setShowAddIncentive_Modal] = useState(false) //state Incentive
	const [Data_update, setData_update] = useState([])
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//12-3
	//Function add_Incentive
	const add_Incentive = async (idcontract, newProductCost) => {
		try {
			const response = await axios.post(`${apiUrl}/api/forms/products/post/${idcontract}`, newProductCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.newProducts })
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
	// Get all ProductCosts by id_Contract 
	const getProductCost_idContract = async ContractId => {
		console.log("test====> Get all ProductCosts by id_Contract : ", ContractId)
		try {

			const response = await axios.get(`${apiUrl}/api/forms/products/${ContractId}`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Products })//note

			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}
	//
	// Add ProductCost
	const addProducts = async (idcontract, newProductCost) => {
		try {
			console.log("Url: ", `${apiUrl}/api/forms/detailproduct/post/${idcontract}`)
			const response = await axios.post(`${apiUrl}/api/forms/detailproduct/post/${idcontract}`, newProductCost)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.newProducts })
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
	const delete_ProductCost = async ProductCostId => {
		try {
			const response = await axios.delete(`${apiUrl}/api/forms/detailproduct/delete/${ProductCostId.idProduct}`)//note
			if (response.data.success){
				dispatch({ type: DELETE, payload: response.data.deletedProducts })
				return response.data
			}
		} catch (error) {
			console.log(error)
		}
	}
	// Update ProductCost
	const update_ProductCost = async ProductCosts => {
		try {
			const response = await axios.put(
				`${apiUrl}/api/forms/detailproduct/put/`, //note xem trong server
				ProductCosts
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updateProduct }) //note MandayKysu biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_InputIntoMoney(ProductsCost) {
		let Total_InputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_InputIntoMoney += ListProduct.InputIntoMoney
			)))

		return Total_InputIntoMoney;
	}
	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_OutputIntoMoney(ProductsCost) {
		let Total_OutputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_OutputIntoMoney += ListProduct.OutputIntoMoney
			)))

		return Total_OutputIntoMoney;
	}

	// ProductCost context data
	const ProductCostContextData = {
		ProductCostState,
		showAddProductCostModal,
		setShowAddProductCostModal,
		showToast,
		setShowToast,

		//Modal khoi tao Incentive 
		ShowAddIncentive_Modal,
		setShowAddIncentive_Modal,
		add_Incentive,

		getProductCost_idContract,
		addProducts,
		delete_ProductCost,

		Data_update, setData_update,
		update_ProductCost,
		showUpdateProductCostModal,
		setshowUpdateProductCostModal,
		Sum_InputIntoMoney, //function
		Sum_OutputIntoMoney, //function



	}

	return (
		<ProductCostContext.Provider value={ProductCostContextData}>
			{children}
		</ProductCostContext.Provider>
	)
}

export default ProductCostContextProvider
