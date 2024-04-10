import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Box, Avatar, Stack } from "@mui/material";
import React from "react";
import { useHistory, Link } from "react-router-dom";
// import { Search, SentimentDissatisfied } from "@mui/icons-material";

import "./Header.css";

const Header = ({ hasHiddenAuthButtons, children }) => {
  const history = useHistory();
  const username = localStorage.getItem("username");

  const handleBackToExplore = () => {
    history.push("/"); // Redirect to products page
  };

  const handleRegister = () => {
    history.push("/register"); // Redirect to register page
  };

  const handleLogin = () => {
    history.push("/login"); // Redirect to login page
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Redirect to products page
  };

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon" />
        </Link>
      </Box>

      {/* {children && (<div className="search-desktop">
          <TextField
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
            onChange = {()=>{
              return null;
            }}
          />
        </div>)} */}


      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={handleBackToExplore}
        >
          Back to explore
        </Button>
      ) : !username ? (
        <>
          <Box width="30vw">{children && children}</Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              className="header-title"
              variant="text"
              onClick={handleLogin}
            >
            </Button>
            <Button
              className="header-title"
              variant="contained"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Box width="30vw">{children && children}</Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt={username} src="./" />
            <p>{username}</p>
            <Button
              className="header-title"
              variant="text"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Header;
