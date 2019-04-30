import React from "react";
import Button from "../Button";

type TModal = {
    id?: any,
    modalTitle?: any,
    saveId?: any,
    onClick?: any,
    children?: any,
    delBut?: any,
}

const Modal = ({id, modalTitle, saveId, onClick, children, delBut}: TModal) => (
    <div className="modal fade" tabIndex={-1} role="dialog" id={id}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">

                    {/* MODAL TITLE */}
                    <h5 className="modal-title" id="modal-title">{modalTitle}</h5>

                    {/* X BUTTON SO YOU CAN CLOSE IT */}
                    <Button className="close" dataDismiss="modal" ariaLabel="Close">
                        <span aria-hidden="true" id="x-button">&times;</span>
                    </Button>
                </div>

                {/* MODAL BODY */}
                <div className="modal-body">

                    {children}

                </div>

                {/* BUTTONS AT MODAL BOTTOM */}
                <div className="modal-footer">

                    {/* CLOSE THE MODAL */}
                    <Button className="btn-secondary" dataDismiss="modal" id="close-button">Close</Button>


                    {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                    <Button className="btn-save-modal" id={saveId} onClick={onClick} dataDismiss="modal">{`${delBut ? delBut : "Save"}`}</Button>
                </div>
            </div>
        </div>
    </div>
);

export default Modal;