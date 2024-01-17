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
import { validateAddress } from "../../validation/validateAddress";

const AddressForm = ({ refferns }) => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState(inputsValueObjCheckout);
  refferns = inputsValue;
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
    setInputsValue((currentState) => {
      const newState = {
        ...currentState,
        [e.target.id]: e.target.value,
      };
      return newState;
      // Set the current value of the ref to the updated state
      // refferns.current = newState;
      // console.log(newState);
      // return newState;
    });
  };
  useEffect(() => {
    // Update refferns.current whenever inputsValue changes
    refferns.current = inputsValue;
  }, [inputsValue, refferns]);
  //   const handleNextButton = () => {
  //     const joiResponse = validateAddress(address);
  //     setErrorsState(joiResponse);
  //     if (!joiResponse) {
  //       // Call the callback function to update the state in the Checkout component
  //       onNextClick(address);
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
            id="first"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inputsValue.first}
            onChange={handleInputsChange}
          />
        </Grid>
        {errorsState && errorsState.first && (
          <Alert severity="warning">{errorsState.first}</Alert>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="last"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={inputsValue.last}
            onChange={handleInputsChange}
          />
        </Grid>
        {errorsState && errorsState.last && (
          <Alert severity="warning">{errorsState.last}</Alert>
        )}
        <Grid item xs={12}>
          <TextField
            required
            id="street"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={inputsValue.street}
            onChange={handleInputsChange}
          />
        </Grid>
        {errorsState && errorsState.street && (
          <Alert severity="warning">{errorsState.street}</Alert>
        )}
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
        </Grid>
        {errorsState && errorsState.city && (
          <Alert severity="warning">{errorsState.city}</Alert>
        )}
        {/* <Grid item xs={12} sm={6}>
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
        </Grid>
        {errorsState && errorsState.zip && (
          <Alert severity="warning">{errorsState.zip}</Alert>
        )} */}
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
        </Grid>
        {errorsState && errorsState.country && (
          <Alert severity="warning">{errorsState.country}</Alert>
        )}
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
