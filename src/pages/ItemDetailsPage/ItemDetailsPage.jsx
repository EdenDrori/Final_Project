import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { inputsValueObj } from "../addItemPage/inputsValueObj";
import { newDataForInputs } from "./newDataForInputs";
import { height } from "@mui/system";

//import { updateChangesClick } from "./updateChangeClick";

const ItemDetailsPage = () => {
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());
  const { _id } = useParams();
  useEffect(() => {
    axios
      .get("/items/" + _id)
      .then(({ data }) => {
        setInputValue(newDataForInputs(data));
      })
      .catch((err) => {});
  }, []);
  const handleBackItems = () => {
    navigate(ROUTES.ITEMS);
  };
  const handleCheckout = () => {
    navigate(`${ROUTES.CHECKOUT}/${_id}`);
  };

  return (
    <Container sx={{ padding: "50px", paddingBottom: "60px" }}>
      <Grid container>
        <Grid item xs={4} sx={{ height: "55vh" }}>
          {" "}
          <img
            srcSet={inputsValue.url}
            src={inputsValue.url}
            alt={inputsValue.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={8} sx={{ paddingLeft: "10%" }}>
          <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
            {inputsValue.title}
          </Typography>

          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.brand}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.description}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.price} $
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.size}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.state} {inputsValue.country}
            {inputsValue.street} {inputsValue.houseNumber}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.phone}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.status}
          </Typography>
          <Button onClick={handleCheckout}>Buy Now 🛒</Button>
        </Grid>
      </Grid>
      <Button onClick={handleBackItems}>Back to all items</Button>
    </Container>
  );
};
export default ItemDetailsPage;
