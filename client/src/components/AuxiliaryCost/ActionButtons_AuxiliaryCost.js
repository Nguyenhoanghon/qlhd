import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_AuxiliaryCost = ({ _id }) => {
	const { deleteAuxiliaryCost, findAuxiliaryCost, setShowUpdateAuxiliaryCostModal } = useContext(
		AuxiliaryCostContext
	) 
	
	const chooseAuxiliaryCost = AuxiliaryCostId => {
		findAuxiliaryCost(AuxiliaryCostId)
		setShowUpdateAuxiliaryCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá chi phí',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteAuxiliaryCost(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateAuxiliaryCostModal(false)
	}
	return (
		<>
			<Button className='post-button' onClick={chooseAuxiliaryCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_AuxiliaryCost
