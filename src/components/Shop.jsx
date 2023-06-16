import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";
import { getProductsByFilter } from "../redux/actions/filterActions";
import Card from "./Card";

const Shop = () => {
  const [text, setText] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const handleSearch = (e) => {
    resetState();
    setText(e.target.value);

    dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
  };

  const handleCategory = (e) => {
    resetState();

    const currentCategoryChecked = e.target.value;
    const allCategoriesChecked = [...categoryIds];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategoryIds;
    if (indexFound === -1) {
      //add
      updatedCategoryIds = [...categoryIds, currentCategoryChecked];
      setCategoryIds(updatedCategoryIds);
    } else {
      // remove
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
    }

    dispatch(
      getProductsByFilter({ type: "category", query: updatedCategoryIds })
    );
  };

  const resetState = () => {
    setText("");
    setCategoryIds([]);
  };

  return (
    <section className="shop-page m-3 ">
      <div className="p-5 bg-secondary text-white text-center rounded">
        <h1 className="display-4">Welcome to the Shop</h1>
      </div>
      <div className="row">
        <div className="col-md-3 border-end mt-4">
          <div className="text-muted">
            Filters <span className="fas fa-sliders-h"></span>
          </div>
          <nav className="navbar navbar-expand-lg bg-light border-top">
            <form className="form-inline my-2 my-lg-0 d-flex px-2 m-auto w-100">
              <input
                className="form-control mr-sm-2 m-auto"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={text}
                onChange={handleSearch}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 mx-2"
                type="submit"
                disabled={true}
              >
                Search
              </button>
            </form>
          </nav>
          <div className="border-top border-bottom bg-light p-3">
            {categories &&
              categories.map((c) => (
                <div className="form-group form-check" key={c._id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="category"
                    value={c._id}
                    checked={categoryIds.includes(c._id)}
                    onChange={handleCategory}
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    {c.category}
                    {/* {JSON.stringify(c.category)} */}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-9 mt-4">
          <div className="row">
            {products &&
              products.map((product) => (
                <Card key={product._id} product={product} homePage={true} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
