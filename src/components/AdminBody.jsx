import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="container ">
      <div className="row">
        {/* <div className="card-deck row"> */}
        {products &&
          products.map((product) => (
            <Card key={product._id} product={product} adminPage={true} />
          ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminBody;
