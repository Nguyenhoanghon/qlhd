import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'
import { useContext } from 'react'
import { View, StyleSheet, Alert } from "react-native";


const ActionButtons_AuxiliaryCost = ({ _id }) => {
	const { deleteAuxiliaryCost, findAuxiliaryCost, setShowUpdateAuxiliaryCostModal } = useContext(
		AuxiliaryCostContext
	) 
	
	const chooseAuxiliaryCost = AuxiliaryCostId => {
		findAuxiliaryCost(AuxiliaryCostId)
		setShowUpdateAuxiliaryCostModal(true)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseAuxiliaryCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteAuxiliaryCost.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_AuxiliaryCost
