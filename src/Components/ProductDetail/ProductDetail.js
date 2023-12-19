import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SpinnerComp from "../Common/Spinner/Spinner";
import "./ProductDetail.css";

function ProductDetail({ show, closeModal, selectedProduct }) {
  const [productItem, setProductItem] = useState(null);

  useEffect(() => {
    if (show === false || selectedProduct === null) {
      return;
    } //This is just negative condition, we need to write this else we get error
    setProductItem(null); // This sets previous data to null so that performance increase or previous product data is not shown before rendering latest product data
    fetch(`https://fakestoreapi.com/products/${selectedProduct}`)
      .then((res) => res.json())
      .then((product) => {
        setProductItem(product);
      });
  }, [selectedProduct]);

  //Makes API call each time selectedProduct is changed
  return (
    <Modal
      size="lg"
      show={show}
      onHide={closeModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Product : {selectedProduct}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {productItem === null ? (
          <SpinnerComp />
        ) : (
          <div className="bg-dark text-left text-white d-flex flex-column justify-content-center align-items-center gap-3">
            <div>
              <h5>Product ID : </h5>
              {productItem.id}
            </div>
            <div>
              <h5>Product Title : </h5>
              {productItem.title}
            </div>
            <div>
              <h5>Product Price : </h5>
              {productItem.price}
            </div>
            <div>
              <h5>Product Description : </h5>
              {productItem.description}
            </div>
            <div>
              <h5>Product Category : </h5>
              {productItem.category}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetail;
