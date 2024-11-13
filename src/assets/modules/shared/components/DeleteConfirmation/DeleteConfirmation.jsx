import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import confirmationLogo from '../../../../../assets/images/confirmdelete.svg'

const DeleteConfirmation = ({deleteItem , deleteFun , show , handleClose}) => {
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            <div className='text-center'>
                <img src={confirmationLogo} />
                <h4 className='mt-3'>Delete This {deleteItem} ?</h4>
                <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>

            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="" className='border border-danger text-danger' onClick={deleteFun}>
                Delete this item
            </Button>
            </Modal.Footer>
        </Modal>

  )
}

export default DeleteConfirmation