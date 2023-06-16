import Modal from "react-modal";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
//redux...............
import { useDispatch, useSelector } from "react-redux";
// import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const AdminProductModal = (props) => {
  Modal.setAppElement(document.getElementById("modal-roott"));

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { categories } = useSelector((state) => state.categories);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productQuantity: "",
  });

  const handleProductImage = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.files[0] });
    console.log("productData", e.target.files[0]);
  };
  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // const [clientSideError, setClientSideError] = useState("");

  const {
    productImage,
    productCategory,
    productName,
    productDescription,
    productPrice,
    productQuantity,
  } = productData;

  const { closeModal, isOpen, clientSideErrorMsg, setClientSideErrorMsg } =
    props;

  // const handleMessages = (e) => {
  //   dispatch(clearMessages());
  // };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productImage === null) {
      setClientSideErrorMsg("Please upload a product image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDescription) ||
      isEmpty(productPrice)
    ) {
      setClientSideErrorMsg("All fields are required");
    } else if (isEmpty(productCategory)) {
      setClientSideErrorMsg("Please select a category");
    } else if (isEmpty(productQuantity)) {
      setClientSideErrorMsg("Please enter a quantity");
    } else {
      // success
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQuantity", productQuantity);

      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
        productQuantity: "",
      });
    }
  };

  return (
    <div>
      <Modal
        id="modal-roott"
        className="modal modal-dialog modal-dialog-centered"
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Food</h5>
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
                  <div className="custom-file lh-1">
                    <input
                      type="file"
                      className="custom-file-input form-control lh-1"
                      name="productImage"
                      onChange={handleProductImage}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="customFile"
                    ></label>
                  </div>

                  <div className="form-group lh-1">
                    <label className="text-secondary pb-2">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="text-secondary pb-2">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="productDescription"
                      value={productDescription}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group mt-2">
                    <label className="text-secondary pb-2">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group row mt-2">
                    <div className="col-md-6">
                      <label className="text-secondary pb-2">Category</label>
                      <select
                        className="form-select mr-sm-2"
                        name="productCategory"
                        onChange={handleProductChange}
                      >
                        <option value={""}>Select Category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="text-secondary pb-2">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        max="10000"
                        name="productQuantity"
                        value={productQuantity}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
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
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProductModal;
