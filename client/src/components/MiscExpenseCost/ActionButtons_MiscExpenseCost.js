import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { MiscExpenseCostContext } from '../../contexts/MiscExpenseContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_MiscExpenseCost = ({ _id }) => {
	const { deleteMiscExpenseCost, findMiscExpenseCost, setShowUpdateMiscExpenseCostModal } = useContext(
		MiscExpenseCostContext
	)
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá chi phí khác',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteMiscExpenseCost(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateMiscExpenseCostModal(false)
	}

	const chooseMiscExpenseCost = MiscExpenseCostId => {
		findMiscExpenseCost(MiscExpenseCostId)
		setShowUpdateMiscExpenseCostModal(true)
	}

	return (
		<>
			<Button className='post-button' onClick={chooseMiscExpenseCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_MiscExpenseCost
