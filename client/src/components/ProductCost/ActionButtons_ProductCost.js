
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ProductCostContext } from '../../contexts/ProductCostContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ActionButtons_ProductCost = ({ _id }) => {
	const { deleteProductCost, findProductCost, setShowUpdateProductCostModal } = useContext(
		ProductCostContext
	) 

	const chooseProductCost = ProductCostId => {
		findProductCost(ProductCostId)
		setShowUpdateProductCostModal(true)
	}
	function submit () {
		confirmAlert({
		  title: 'Xoá hàng hoá',
		  message: '',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteProductCost(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateProductCostModal(false)
	}
	return (
		<>
			
			<Button className='post-button' onClick={chooseProductCost.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={submit}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_ProductCost
