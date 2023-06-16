import Modal from "react-modal";
import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { showLoading } from "../helpers/loading";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
// redux //
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../redux/actions/categoryActions";
// import { clearMessages } from "../redux/actions/messageActions";

const AdminCategoryModal = (props) => {
  Modal.setAppElement(document.getElementById("modal-root"));

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState(null);
  // //////////////////////////////////////////////////////////////////////////
  // const handleClearMessages = () => {
  //   dispatch(clearMessages());
  //   setClientSideErrorMsg("");
  // };

  const handleCategoryChange = (e) => {
    // clearMessages();
    setCategory(e.target.value);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (isEmpty(category)) {
      setClientSideErrorMsg("Please enter a category");
    } else {
      const data = { category };
      dispatch(createCategory(data));
      setCategory("");
    }
  };

  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const { closeModal, isOpen, clientSideErrorMsg, setClientSideErrorMsg } =
    props;

  return (
    <div>
      <Modal
        id="modal-root"
        className="modal modal-dialog modal-dialog-centered"
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
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
              {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              {loading ? (
                showLoading()
              ) : (
                <>
                  <label className="text-secondary pb-2">Category</label>
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
              <button type="submit" className="btn btn-info text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default AdminCategoryModal;
