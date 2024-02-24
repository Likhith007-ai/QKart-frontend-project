import React from "react";
import { Card, CardContent, CardMedia, Typography, Button,CardActionArea } from "@mui/material";

const ProductCard = ({ product }) => {
  const { name, category, cost, rating, image } = product;

  return (
    <Card>
      <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${cost}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {rating}
        </Typography>
        <Button variant="contained" color="primary">
          ADD TO CART
        </Button>
      </CardContent>
      </CardActionArea>
     
    </Card>
  );
};

export default ProductCard;
