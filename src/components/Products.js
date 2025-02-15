import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart, { generateCartItemsFrom } from "./Cart";
// import { SettingsSystemDaydreamSharp } from "@mui/icons-material";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [items, 
    setItems] = useState([]);
  const token = localStorage.getItem("token");
  
 

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/products`);
      // console.log(response.data);
      setLoading(false);
      setProducts(response.data);
      setFilteredProducts(response.data);
      // console.log(filteredProducts,"filteredProducts")
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Couldn't fetch products. Check that the backend is running,reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setFilteredProducts(response.data);
      console.log(response.data,"perform data")
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          setFilteredProducts([]);
        }
        if (e.response.data === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
          setFilteredProducts(products);
        }
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(async () => {
      await performSearch(value);
    }, 500);
    setDebounceTimeout(timeout);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    performAPICall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCart(token)
      .then((cartData) => generateCartItemsFrom(cartData, products))
      .then((cartItems) =>setItems(cartItems))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const isItemInCart = (items, productId) => {
    return items.findIndex((item) => item.productId === productId) !== -1;
  };

  const addToCart = async (token, items, products, productId, qty ,options={PreventDuplicate:false}) => {
    if (!token) {
      enqueueSnackbar("Please login to add the product to the cart", {
        variant: "warning",
      });
      return;
    }
    if (options.PreventDuplicate && isItemInCart(items, productId)) {
      enqueueSnackbar(
        "Item already in cart. Use the cart sidebar to update quantity or remove item.",
        { variant: "warning" }
      );
      return;
    }
    try {
      const response = await axios.post(
        `${config.endpoint}/cart`,
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(response.data, "add cart response");
      const cartItems = generateCartItemsFrom(response.data, products);
      setItems(cartItems);
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "could not fetch products. Check thhe backend is runnning, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  const fetchCart = async (token) => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data, "cartData");
      return response.data;
    } catch (e) {
      enqueueSnackbar(
        "Could not fetch cart details. Checks that the backend is running, reachable, reachable and returns valid JSON.",
        { variant: "error" }
      );
      return null;
    }
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          InputProps={{
            className: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, debounceTimeout)}
        />
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => debounceSearch(e, debounceTimeout)}
      />
      <Grid container>
        <Grid item className="product-grid" md={token ? 9 : 12}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box>

          {isLoading ? (
            <Box className="loading">
              <CircularProgress />
              <h4>Loading Products...</h4>
            </Box>
          ) : (
            <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Grid item xs={6} md={3} key={product._id}>
                    <ProductCard
                      product={product}
                      handleAddToCart={async () => {
                        await 
                        addToCart(
                          token,
                          items,
                          products,
                          product._id,
                          1,
                          {PreventDuplicate:true}
                          );
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Box className="loading">
                  <SentimentDissatisfied color="action" />
                  <h4 style={{ color: "#636363" }}>No products found</h4>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
        {token ? (
          <Grid item xs={12} md={3} bgcolor="#E9F5E1">
            <Cart products={products} items={items} handleQuantity={addToCart} />
          </Grid>
        ) : null}
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;
