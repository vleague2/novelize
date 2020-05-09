import React from "react";
import Button from "../Button";

type TModal = {
  id?: any;
  modalTitle?: any;
  saveId?: any;
  onClick?: any;
  children?: any;
  delBut?: any;
  canClose?: boolean;
};

const Modal = ({
  id,
  modalTitle,
  saveId,
  onClick,
  children,
  delBut,
  canClose = true
}: TModal) => (
  <div
    className="modal fade"
    tabIndex={-1}
    role="dialog"
    id={id}
    data-keyboard={canClose}
    data-backdrop={canClose ? canClose : 'static'}
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          {/* MODAL TITLE */}
          <h5 className="modal-title" id="modal-title">
            {modalTitle}
          </h5>

          {canClose && (
            <Button className="close" dataDismiss="modal" ariaLabel="Close">
              <span aria-hidden="true" id="x-button">
                &times;
              </span>
            </Button>
          )}
        </div>

        {/* MODAL BODY */}
        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          {canClose && (
            <Button
              className="btn-secondary"
              dataDismiss="modal"
              id="close-button"
            >
              Close
            </Button>
          )} 

          {/* TODO: disabled states */}
          <Button
            className="btn-save-modal"
            id={saveId}
            onClick={onClick}
            dataDismiss="modal"
          >{`${delBut ? delBut : "Save"}`}</Button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
