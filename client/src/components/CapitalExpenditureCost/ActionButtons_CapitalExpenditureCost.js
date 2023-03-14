import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CapitalExpenditureCostContext } from '../../contexts/CapitalExpenditureCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_CapitalExpenditureCost = ({ _id }) => {
	const { deleteCapitalExpenditureCost, findCapitalExpenditureCost, setShowUpdateCapitalExpenditureCostModal } = useContext(
		CapitalExpenditureCostContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseCapitalExpenditureCost = CapitalExpenditureCostId => {
		findCapitalExpenditureCost(CapitalExpenditureCostId)
		setShowUpdateCapitalExpenditureCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: 'Xoá chi phí vốn',
		  message: '',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteCapitalExpenditureCost(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateCapitalExpenditureCostModal(false)
	}
	
	return (
		<>
			
			<Button variant="primary" onClick={chooseCapitalExpenditureCost.bind(this, _id)}>
				{/* <img src={editIcon} alt='edit' width='24' height='24' /> */}
				Cập nhật
			</Button>
			<span> </span>
			<Button variant="primary" onClick={submit}>
				{/* <img src={deleteIcon} alt='delete' width='24' height='24' /> */}
				Xoá
			</Button>
		</>
	)
}

export default ActionButtons_CapitalExpenditureCost
