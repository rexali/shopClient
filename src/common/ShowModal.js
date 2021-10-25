import React, { useState } from "react";
import { Modal} from "react-bootstrap";

export default function ShowModal({ title, body, setAbout}) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        setAbout(false);
    };

    return (
        <div className="mt-2">
            <Modal
                size='lg'
                fullscreen={false}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                // centered
                dialogClassName='modal-10w'>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {body}</Modal.Body>
            </Modal>
        </div>
    );
};