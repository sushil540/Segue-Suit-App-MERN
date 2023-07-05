import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import EditProduct from './EditProduct'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../actions/productActions'

const ModelComponent = (props) =>{

    const dispatch = useDispatch()

    const modal = useSelector((state)=>{
        return state.product.modal
    })

    const toggle = () =>dispatch(setModal(!modal))
  
    return(
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} className="bg-primary-subtle"></ModalHeader>
                <ModalBody>
                    <EditProduct/>
                </ModalBody>
            </Modal>
        </div>
    )
} 

export default ModelComponent