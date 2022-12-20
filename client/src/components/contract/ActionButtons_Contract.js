
import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { ContractContext } from '../../contexts/ContractContext'
import { useContext } from 'react'

const ActionButtons_Contract = ({ _id }) => {
	const { deleteContract, findContract, setShowUpdateContractModal } = useContext(
		ContractContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseContract = ContractId => {
		findContract(ContractId)
		setShowUpdateContractModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseContract.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteContract.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_Contract