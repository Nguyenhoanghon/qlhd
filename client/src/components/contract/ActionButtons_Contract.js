
import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import listIcon from '../../assets/list.svg'
import { ContractContext } from '../../contexts/ContractContext'
import { useContext } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const ActionButtons_Contract = ({ _id }) => {
	const { deleteContract, findContract, setShowUpdateContractModal,setShowAddContractModal } = useContext(
		ContractContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseContract = ContractId => {
		findContract(ContractId)
		setShowUpdateContractModal(true)
	}
	const chooseListForm = ContractId => {
		findContract(ContractId)
		setShowAddContractModal(true)
	}
	return (
		<>
			<OverlayTrigger
				overlay={
					<Tooltip>
					Xem tổng thể Hơp đồng 
					</Tooltip>
				}
			>
				<Button className='post-button'  onClick={chooseContract.bind(this, _id)}>
					<img src={editIcon} alt='edit' width='24' height='24' /> 
				</Button>
        	</OverlayTrigger>

			<OverlayTrigger
				overlay={
					<Tooltip>
					 Nhập thông tin hợp đồng
					</Tooltip>
				}
			>
				<Button className='post-button' onClick={chooseListForm.bind(this, _id)}>
					<img src={listIcon} alt='delete' width='24' height='24' />
				</Button>
			</OverlayTrigger>
		</>
	)
}

export const ActionButtons_Update_Delete = ({ _id }) => {
	const { deleteContract, findContract, setShowUpdateContractModal } = useContext(
		ContractContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseContract = ContractId => {
		findContract(ContractId)
		setShowUpdateContractModal(true)
	}

	return (
		<>
			<OverlayTrigger
				overlay={
					<Tooltip>
					 Cập nhật
					</Tooltip>
				}
			>
				<Button className='post-button'  onClick={chooseContract.bind(this, _id)}>
					<img src={editIcon} alt='edit' width='24' height='24' /> 
				</Button>
        	</OverlayTrigger>

			<OverlayTrigger
				overlay={
					<Tooltip>
					Xoá hợp đồng
					</Tooltip>
				}
			>
				<Button className='post-button' onClick={deleteContract.bind(this, _id)}>
					<img src={deleteIcon} alt='delete' width='24' height='24' />
				</Button>
			</OverlayTrigger>
		</>
	)
}
