const AdminActionBtns = ({ setShowModal }) => {
  return (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4 my-1 d-flex">
            <button
              className="btn btn-outline-info btn-block flex-fill"
              onClick={() => {
                setShowModal(1);
              }}
            >
              <i className="fas fa-plus"> Add Category </i>
            </button>
          </div>
          <div className="col-md-4 my-1 d-flex">
            <button
              className="btn btn-outline-warning btn-block flex-fill"
              onClick={() => {
                setShowModal(2);
              }}
            >
              <i className="fas fa-plus"> Add Food </i>
            </button>
          </div>
          <div className="col-md-4 my-1 d-flex">
            <button
              className="btn btn-outline-success btn-block flex-fill"
              onClick={() => {
                setShowModal(3);
              }}
            >
              <i className="fas fa-money-check-alt"> View Orders </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminActionBtns;
