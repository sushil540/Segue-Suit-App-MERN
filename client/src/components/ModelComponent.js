import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../actions/userActions'


const ModelComponent = ({Component}) =>{

    const dispatch = useDispatch()

    const modal = useSelector((state)=>{
        return state.user.modal
    })

    const toggle = () =>dispatch(setModal(!modal))
  
    return(
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} className="bg-primary-subtle"></ModalHeader>
                <ModalBody>
                    <Component/>
                </ModalBody>
            </Modal>
        </div>
    )
} 

export default ModelComponent