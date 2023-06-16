import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  Home,
  Signin,
  NotFound,
  Signup,
  Shop,
  Cart,
  Shipping,
  Product,
  UserDashboard,
  AdminDashboard,
  AdminEditProduct,
  Payment,
  PlaceOrder,
} from "./components";
import "./app.css";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
//redux

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/placeorder" element={<PlaceOrder />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route element={<UserRoute />}>
            <Route exact path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              exact
              path="/admin/edit/product/:productId"
              element={<AdminEditProduct />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
