import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./ProductList.css";
import Navbar from "../Common/Navbar/Navbar";
import SpinnerComp from "../Common/Spinner/Spinner";
import ProductDetail from "../ProductDetail/ProductDetail";

var allProducts = [];

function ProductList(props) {
  const [productData, setProductData] = useState(null); // we are setting state value to null as no data to be shown before API call just show spinner component
  const [searchValue, setSearchValue] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //ComponentDidMount() -> After component mounted for the first time
  //ComponentDidUpdate() -> After the component's state is changed
  //useEffect will have array of dependencies of states, which executes whenever there is change is dependency state and if no dependency passed then executes only once
  //Here we are using with empty array as we want API call to be done only once
  try {
    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((productData) => {
          allProducts = productData;
          setProductData(productData);
        });
    }, []);
  } catch (error) {
    console.log(error);
  }

  const openModal = (id) => {
    setShowDetailModal(true);
    setSelectedProduct(id);
  };

  const closeModal = () => {
    setShowDetailModal(false);
  };

  function renderAllProducts() {
    return productData.map((product) => {
      return (
        <Product
          productDetails={product}
          onDelete={onProductDelete}
          openModal={openModal}
        />
      );
    });
  }

  const onProductDelete = (id) => {
    const updatedData = productData.filter((product) => {
      return product.id !== id;
    });
    setProductData(updatedData);
  };

  // Every eventListener will have event e which contains details of the event
  const onSearchValueChange = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);

    const updatedData = allProducts.filter((product) => {
      return product.title.toLowerCase().startsWith(searchValue.toLowerCase());
    }); // Here we are using productsData(original data) instead of recently updated data(productData) because if we clear search again original data should be displayed on UI
    setProductData(updatedData);
  };
  return (
    <div>
      <Navbar onLogout={props.onLogout} />
      <div className="searchBox">
        <input
          onChange={onSearchValueChange}
          value={searchValue}
          type="text"
          placeholder="Search Item"
        />
      </div>
      {productData === null ? (
        <SpinnerComp />
      ) : (
        <div className="productList">{renderAllProducts()}</div>
      )}

      <ProductDetail
        show={showDetailModal}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}

export default ProductList;
