import React, {useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ShowToast({ title, body}) {
  const [show, setShow] = useState(true);

  return (
    <div style={{zIndex:'999999'}}>
    <ToastContainer position={"middle-center"} >
    <Toast onClose={()=>setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className='bg-dark text-white'>{body}</Toast.Body>
    </Toast>
    </ToastContainer>
    </div>
  );
}