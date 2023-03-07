import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../App.css'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuxiliaryCostContext } from '../../contexts/AuxiliaryCostContext'

const Create_AuxiliaryCost_Modal = () => {
	// Contexts
	const {
		AuxiliaryCostState: { AuxiliaryCosts, AuxiliaryCostsLoading },
		create_AuxiliaryCost,
		showcreate_AuxiliaryCost_Modal,
		setshowcreate_AuxiliaryCost_Modal,
		setShowToast
	} = useContext(AuxiliaryCostContext);

	// State
	const [newAuxiliaryCost, setnewAuxiliaryCost] = useState({
		Renevue: 0,
		Plan: 0,
		ListCosts: [],
		idcontract: ""
	})

	const {
		Renevue,
		Plan,
		ListCosts,
		idcontract

	} = newAuxiliaryCost

	//load idcontract
	const params = useParams();
	newAuxiliaryCost.idcontract = params.id;

	const [framework, setPlan] = useState(1);

	const Set_Plan = e => {
		setPlan(e.target.value);
	}
	newAuxiliaryCost.Plan = framework;
	
	const onChangeNewAuxiliaryCostForm = event =>
		setnewAuxiliaryCost({ ...newAuxiliaryCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddAuxiliaryCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await create_AuxiliaryCost(newAuxiliaryCost, newAuxiliaryCost.idcontract)//newAuxiliaryCost
		resetAddAuxiliaryCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddAuxiliaryCostData = () => {
		setnewAuxiliaryCost({
			Renevue: 0,
			Plan: 0,
			ListCosts: [],
			idcontract: ""
		})
		setshowcreate_AuxiliaryCost_Modal(false)
	}

	return (
		<Modal show={showcreate_AuxiliaryCost_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>KHỞI TẠO</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{/* <Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='idcontract'
							aria-describedby='noidung-help'
							value={idcontract}
							onChange={onChangeNewAuxiliaryCostForm}
						/>
					</Form.Group> */}

					<Form.Group>
						<Form.Text id='Plan-help' muted as="h3">
							Chọn phương án chi
						</Form.Text>
						<Form.Check
							id="radio1"
							label= "Phương án 1"
							type="radio"
							value="1"
							checked={framework == 1 ? true : false}
							onChange={Set_Plan}
						/>
						<Form.Check
							id="radio2"
							label= "Phương án 2"
							type="radio"
							value="2"
							checked={framework == 2 ? true : false}
							onChange={Set_Plan}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Khởi tạo!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default Create_AuxiliaryCost_Modal
