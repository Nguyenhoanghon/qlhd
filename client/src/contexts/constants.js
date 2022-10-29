export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://103.88.121.45:5000/api'
		: 'http://103.88.121.45:5000/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'

export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAIL = 'LOADED_FAIL'
export const ADD = 'ADD'
export const DELETE = 'DELETE'
export const UPDATE = 'UPDATE'
export const FIND = 'FIND'
