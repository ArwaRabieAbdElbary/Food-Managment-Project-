import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChangePass = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
    <Button variant="primary" onClick={handleShow}>
    Launch demo modal
  </Button>

    
    </div>

  );
}

export default ChangePass