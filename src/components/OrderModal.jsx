import React from "react";
import Modal from "react-modal";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";

const OrderModal = (props) => {
  Modal.setAppElement(document.getElementById("modal-root2"));
  const {
    // handleMessages,
    closeModal,
    handleCategorySubmit,
    errorMsg,
    successMsg,
    category,
    handleCategoryChange,
    loading,
    isOpen,
  } = props;

  return (
    <div>
      <Modal
        id="modal-root2"
        className="modal modal-dialog modal-dialog-centered"
        isOpen={isOpen}
        onRequestClose={closeModal}
        // ariaHideApp={false}
      >
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">ORDER VIEW</h5>
              <span>
                <i
                  className="fas fa-times"
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={closeModal}
                ></i>
              </span>
            </div>
            <div className="modal-body my-2">
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              {loading ? (
                showLoading()
              ) : (
                <>
                  <label className="text-secondary pb-2">ORDER</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default OrderModal;
