import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid, Box, TextField } from "@mui/material"; // Import TextField
import { useSnackbar } from "notistack";
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import "./Products.css";
import { config } from "../App";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // State to hold search text

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.endpoint}/products`);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Update search text state
  };

  // Filter products based on search text
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header>
        {/* Search input field */}
        <TextField
          size="small"
          fullWidth
          placeholder="Search products"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Header>
      <Grid container justifyContent="center">
        <Grid item className="product-grid">
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your doorstep
            </p>
          </Box>
          {loading && <CircularProgress />}
          {error && <div>Error: {error}</div>}
          {/* Display filtered products */}
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item lg={3} md={6} sm={6} xs={6} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;


//  {/* <Grid container spacing={2}>
//  {products.map((product) => (
//    <Grid item lg={3} md={6} sm={6} xs={6} key={product._id}>
//      <ProductCard product={product} />
//    </Grid>
//  ))}
//  </Grid>  */}