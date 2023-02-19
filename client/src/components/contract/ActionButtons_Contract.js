
import * as React from 'react';
import { BrowserRouter as Routes, Route, useParams } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import listIcon from '../../assets/list.svg'
import { ContractContext } from '../../contexts/ContractContext'
import { useContext } from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const ActionButtons_Contract = ({ _id }) => {
	const { deleteContract, findContract, setShowUpdateContractModal, setShowAddContractModal } = useContext(
		ContractContext
	)

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
						Cập nhật thông tin hơp đồng
					</Tooltip>
				}
			>
				<Button className='post-button' onClick={chooseContract.bind(this, _id)}>
					<img src={editIcon} alt='edit' width='24' height='24' />
				</Button>
			</OverlayTrigger>

			<OverlayTrigger
				overlay={
					<Tooltip>
						Nhập dữ liệu hợp đồng
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
	function submit () {
		confirmAlert({
		  title: '',
		  message: 'Xoá hợp đồng',
		  buttons: [
			{
			  label: 'Có',
			  onClick: () => deleteContract(_id)
			},
			{
			  label: 'Không',
			  onClick: () => closeDialog()
			}
		  ]
		});
	  };
	  const closeDialog = () => {
		setShowUpdateContractModal(false)
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
				<Button className='post-button' onClick={chooseContract.bind(this, _id)}>
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
				<Button className='post-button' onClick={submit}>
					<img src={deleteIcon} alt='delete' width='24' height='24' />
				</Button>
			</OverlayTrigger>
		</>
	)
}
