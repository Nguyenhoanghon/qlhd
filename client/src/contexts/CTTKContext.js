import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { CTTKReducer } from "../reducers/CTTKReducer"; //Note
import {
  ADD,
  apiUrl,
  DELETE,
  FIND,
  LOADED_FAIL,
  LOADED_SUCCESS,
  UPDATE,
} from "./constants"; //Note

export const CTTKContext = createContext();

const CTTKContextProvider = ({ children }) => {
  // State
  const [CTTKState, dispatch] = useReducer(CTTKReducer, {
    CTTK: null,
    CTTKs: [],
    CTTKsLoading: true,
  });

  const [showAddChiPhiTrienKhaiModal, setShowAddChiPhiTrienKhaiModal] =
    useState(false);
  const [showUpdateChiPhiTrienKhaiModal, setShowUpdateChiPhiTrienKhaiModal] =
    useState(false);

  const [showAddCTTKModal, setShowAddCTTKModal] = useState(false);
  const [showUpdateCTTKModal, setShowUpdateCTTKModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all CTTKs
  const getCTTKs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chitiethanghoa`); //note
      if (response.data.success) {
        dispatch({
          type: LOADED_SUCCESS,
          payload: response.data.ChiTietHangHoas,
        }); //note
      }
    } catch (error) {
      dispatch({ type: LOADED_FAIL });
    }
  };

  // Add CTTK
  const addCTTK = async (newCTTK) => {
    try {
      const response = await axios.post(
        `${apiUrl}/chitiethanghoa/insert`,
        newCTTK
      ); //note mandaykysu
      if (response.data.success) {
        dispatch({ type: ADD, payload: response.data.ChiTietHangHoa }); //note MandayKysu
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete CTTK
  const deleteCTTK = async (CTTKId) => {
    try {
      const response = await axios.delete(`${apiUrl}/chitiethanghoa/${CTTKId}`); //note
      if (response.data.success) dispatch({ type: DELETE, payload: CTTKId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find CTTK when user is updating CTTK
  const findCTTK = (CTTKId) => {
    const CTTK = CTTKState.CTTKs.find((CTTK) => CTTK._id === CTTKId);
    dispatch({ type: FIND, payload: CTTK });
  };

  // Update CTTK
  const updateCTTK = async (updatedCTTK) => {
    try {
      const response = await axios.put(
        `${apiUrl}/chitiethanghoa/${updatedCTTK._id}`, //note xem trong server
        updatedCTTK
      );
      if (response.data.success) {
        dispatch({ type: UPDATE, payload: response.data.ChiTietHangHoa }); //note MandayKysu biến trả về từ server
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // CTTK context data
  const CTTKContextData = {
    CTTKState,
    getCTTKs,
    showAddCTTKModal,
    setShowAddCTTKModal,
    showUpdateCTTKModal,
    setShowUpdateCTTKModal,
    addCTTK,
    showToast,
    setShowToast,
    deleteCTTK,
    findCTTK,
    updateCTTK,
  };

  return (
    <CTTKContext.Provider value={CTTKContextData}>
      {children}
    </CTTKContext.Provider>
  );
};

export default CTTKContextProvider;
