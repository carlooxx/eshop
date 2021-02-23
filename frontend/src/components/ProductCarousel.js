import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { topRatedProducts } from "../actions/productsActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const topRatedProduct = useSelector((state) => state.topRatedProduct);
  const { isLoading, error, products } = topRatedProduct;

  useEffect(() => {
    dispatch(topRatedProducts());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : !products ? (
    <Message variant="info">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} className="d-block" />
            <Carousel.Caption className="carousel-caption">
              {product.name} - ${product.price}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
