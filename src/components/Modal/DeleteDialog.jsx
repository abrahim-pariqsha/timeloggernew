/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { Modal } from "bootstrap";
import { forwardRef, useImperativeHandle, useState } from "react";

const DeleteDialog = forwardRef(({ handleConfirm, ...props }, ref) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    show() {
      setOpen(true);
    },
    hide() {
      handleClose();
    },
  }));

  return (
    <Modal show={isOpen} onHide={() => setOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete?
        <button onClick={handleClose}>No</button>
        <button
          onClick={handleConfirm}
          style={{ textAlign: "right" }}
          className="btn btn-primary"
        >
          Yes
        </button>
      </Modal.Body>
    </Modal>
  );
});

export default DeleteDialog;
