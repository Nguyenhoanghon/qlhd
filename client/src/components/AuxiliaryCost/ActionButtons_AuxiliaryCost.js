import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_AuxiliaryCost = (_id) => {
	const {
		
		deleteAuxiliaryCost,
		updateAuxiliaryCost,
		setData_AuxiliaryCost_Cost,
		setshowupdate_AuxiliaryCost_Cost_Modal,
	 } = useContext(
		AuxiliaryCostContext
	) 
	
	const chooseAuxiliaryCost = AuxiliaryCostId => {
		setData_AuxiliaryCost_Cost(_id)
		setshowupdate_AuxiliaryCost_Cost_Modal(true)
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
				closeOnClick: true
			}
		  ]
		});
	  };

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
