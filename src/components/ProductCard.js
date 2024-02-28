import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material"; // Corrected import statement
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      {/* Product image */}
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image} // Replace with the actual image URL
      />
      <CardContent>
        {/* Product name */}
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        {/* Product category */}
        <Typography variant="body2" color="textSecondary">
          Category: {product.category}
        </Typography>
        {/* Product rating */}
        <Rating name="product-rating" value={product.rating} readOnly />
        {/* Product price */}
        <Typography variant="h6" color="primary">
          ${product.cost}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Add to cart button */}
        <Button
          size="small"
          color="primary"
          startIcon={<AddShoppingCartOutlined />}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
