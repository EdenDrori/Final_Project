import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import nextKey from "generate-my-key";

import shoePhoto from "../../assets/shoe.jpg";
import clothPhoto from "../../assets/cloth.jpg";
import accsesorisePhoto from "../../assets/accsesorise.jpg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
const FilterCategory = () => {
  
  const navigate = useNavigate();
  const handleCategoryButton = (e) => {
    
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?filter=${category}`);
  };

  return (
    <Grid container sx={{ flexWrap: "nowrap" }}>
      <Grid
        item
        key={nextKey()}
        xs={12}
        sm={4}
        md={4}
        lg={4}
        sx={{
          margin: "1%",
          backgroundImage: `url(${clothPhoto})`,
          backgroundSize: "cover",
          height: "40vh",
          width: "20vw",
        }}
      >
        {" "}
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            transition: "background-color 0.3s", // Add transition for a smooth effect
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the opacity as needed
            },
          }}
          value="Dress"
          onClick={handleCategoryButton}
        >
          Clothing
        </Button>
      </Grid>
      <Grid
        item
        key={nextKey()}
        xs={12}
        sm={6}
        md={4}
        lg={4}
        sx={{
          margin: "1%",
          backgroundImage: `url(${accsesorisePhoto})`,
          backgroundSize: "cover",
          height: "40vh",
          width: "20vw",
        }}
      >
        {" "}
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            transition: "background-color 0.3s", // Add transition for a smooth effect
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the opacity as needed
            },
          }}
          value="Belt"
          onClick={handleCategoryButton}
        >
          Accesories
        </Button>
      </Grid>
      <Grid
        item
        key={nextKey()}
        xs={12}
        sm={6}
        md={4}
        lg={4}
        sx={{
          margin: "1%",
          backgroundImage: `url(${shoePhoto})`,
          backgroundSize: "cover",
          height: "40vh",
          width: "20vw",
        }}
      >
        {" "}
        <Button
          variant="outlined"
          sx={{
            //mt: 2,

            width: "100%",
            height: "100%",
            border: "2px solid rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.2rem",
            display: "flex",
            justifyContent: "center",
            transition: "background-color 0.3s", // Add transition for a smooth effect
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the opacity as needed
            },
          }}
          value="Shoe"
          onClick={handleCategoryButton}
        >
          Shoes
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterCategory;
