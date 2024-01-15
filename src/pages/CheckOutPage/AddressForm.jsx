import * as React from "react";
import { useEffect, useState, useNavigate } from "react";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import normalizeDataFromServer from "../profilePage/normalizeDataFromServer";
import { checkoutNormalize } from "./checkoutNormalize";
import { inputsValueObjCheckout } from "./inputsValueObjCheckout";
import { validateAddress } from "./validateAddress";

const AddressForm = ({ onNextClick }) => {
  //const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState(inputsValueObjCheckout);
  useEffect(() => {
    let token = getToken();
    let idFromToken = jwtDecode(token)._id;
    axios
      .get(`/users/${idFromToken}`)
      .then(({ data }) => {
        //console.log(data);
        const newData = checkoutNormalize(data.user);
        //console.log(newData, "new");
        setInputsValue(newData);
      })
      .catch((err) => {
        console.log(err);
        toast.info("Error from server, can't get your profile", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
//   const handleNextButton = () => {
//     const joiResponse = validateAddress(inputsValue);
//     setErrorsState(joiResponse);
//     if (!joiResponse) {
//       // Call the callback function to update the state in the Checkout component
//       onNextClick(inputsValue);
//     }
//   };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inputsValue.first}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.first && (
            <Alert severity="warning">{errorsState.first}</Alert>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={inputsValue.last}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.last && (
            <Alert severity="warning">{errorsState.last}</Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={inputsValue.street}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.street && (
            <Alert severity="warning">{errorsState.street}</Alert>
          )}
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={inputsValue.city}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.city && (
            <Alert severity="warning">{errorsState.city}</Alert>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={inputsValue.state}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.state && (
            <Alert severity="warning">{errorsState.state}</Alert>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={inputsValue.zip}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.zip && (
            <Alert severity="warning">{errorsState.zip}</Alert>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={inputsValue.country}
            onChange={handleInputsChange}
          />
          {errorsState && errorsState.country && (
            <Alert severity="warning">{errorsState.country}</Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default AddressForm;
