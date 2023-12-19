import React from "react";
import Button from "react-bootstrap/Button";
import "./Product.css";
function Product(props) {
  const { id, title, price, category, image, rating } = props.productDetails;

  function onProductClick() {
    props.openModal(id);
  }
  return (
    <div onClick={onProductClick} className="product">
      <div className="productImg">
        <img src={image} alt="" />
      </div>
      <div className="productDescription">
        <p className="productTitle">{title}</p>
        <div className="productRatings">
          <span>Ratings : {rating.rate}</span>
          <span>{rating.count} reviews</span>
        </div>
        <p className="productCategory">Category : {category}</p>
        <p className="productPrice">Price : {price}</p>
      </div>
      <Button variant="dark" onClick={() => props.onDelete(id)}>
        Delete
      </Button>
    </div>
  );
}

export default Product;
