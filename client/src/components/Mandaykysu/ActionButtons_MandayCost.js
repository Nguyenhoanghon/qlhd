import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { MandayCostContext } from '../../contexts/MandayCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_MandayCost = ({ _id }) => {
	const { deleteMandayCost, findMandayCost, setShowUpdateMandayCostModal } = useContext(
		MandayCostContext
	) 

	const chooseMandayCost = MandayCostId => {
		findMandayCost(MandayCostId)
		setShowUpdateMandayCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá Manday Kỹ sư',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteMandayCost(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateMandayCostModal(false)
	}
	return (
		<>
			
			<Button className='post-button' onClick={chooseMandayCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_MandayCost
