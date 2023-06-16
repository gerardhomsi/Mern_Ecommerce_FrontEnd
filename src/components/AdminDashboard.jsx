import { useState, useEffect } from "react";
import OrderModal from "./OrderModal";
import AdminHeader from "./AdminHeader";
import AdminActionBtns from "./AdminActionbtns";
import AdminProductModal from "./AdminProductModal";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminBody from "./AdminBody";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
// redux ...... //
import { getCategories } from "../redux/actions/categoryActions";
import { getProducts } from "../redux/actions/productActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(0);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");

  const handleClearMessages = () => {
    dispatch(clearMessages());
    setClientSideErrorMsg("");
  };
  /*********************/
  //EVENT HANDLERS//
  /*********************/
  const showOrderModal = () => (
    <OrderModal isOpen={showModal === 3} closeModal={() => setShowModal(0)} />
  );
  const adminProductModalProps = {
    isOpen: showModal === 2,
    closeModal: () => setShowModal(0),
    errorMsg,
    successMsg,
    clientSideErrorMsg,
    setClientSideErrorMsg,
  };
  const adminCategoryModalProps = {
    closeModal: () => setShowModal(0),
    isOpen: showModal === 1,
    clientSideErrorMsg,
    setClientSideErrorMsg,
  };

  return (
    <section id="modal-root" onClick={handleClearMessages}>
      <AdminHeader />
      <AdminActionBtns setShowModal={setShowModal} />
      <AdminCategoryModal {...adminCategoryModalProps} />
      <AdminProductModal {...adminProductModalProps} />
      {showOrderModal()}
      <AdminBody />
    </section>
  );
};
export default AdminDashboard;
