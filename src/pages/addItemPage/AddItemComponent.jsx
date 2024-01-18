import { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Input,
  InputAdornment,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { addItemClick } from "./addItemClick";
import { inputsValueObj } from "./inputsValueObj";

const AddItem = () => {
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());
  const [file, setFile] = useState();

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleAddItemClick = () => {
    addItemClick(inputsValue, setErrorsState, navigate);
    //console.log(inputsValue);
  };
  const handleUploadImage = (e) => {
    console.log(e.target.files);
    //console.log(file, "file");
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Create New Item
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "3%" }}>
        Craft your professional identity in seconds. Create and customize your
        business card with ease, making a lasting impression effortlessly.
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        {errorsState && errorsState.title && (
          <Alert severity="warning">{errorsState.title}</Alert>
        )}
        <TextField
          id="brand"
          label="brand"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.brand}
          required
        />
        {errorsState && errorsState.brand && (
          <Alert severity="warning">{errorsState.brand}</Alert>
        )}
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.phone}
          required
        />
        {errorsState && errorsState.phone && (
          <Alert severity="warning">{errorsState.phone}</Alert>
        )}
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        {errorsState && errorsState.description && (
          <Alert severity="warning">{errorsState.description}</Alert>
        )}
        <TextField
          id="price"
          label="Price ($)"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.price}
          required
        />
        {errorsState && errorsState.price && (
          <Alert severity="warning">{errorsState.price}</Alert>
        )}
   
        <TextField
          id="size"
          label="size"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.size}
        />
        {errorsState && errorsState.size && (
          <Alert severity="warning">{errorsState.size}</Alert>
        )}
        {/* <TextField
          id="status"
          label="status"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.status}
          required
        />
        {errorsState && errorsState.status && (
          <Alert severity="warning">{errorsState.status}</Alert>
        )} */}
        {/* <TextField
          id="url"
          label="Url"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.url}
        />
        {errorsState && errorsState.url && (
          <Alert severity="warning">{errorsState.url}</Alert>
        )} */}
        <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
          <InputLabel htmlFor="image-upload">Image</InputLabel>
          <OutlinedInput
            id="image-upload"
            type="file"
            onChange={handleUploadImage}
            endAdornment={
              <InputAdornment position="end">
                {/* Optionally, you can add an icon or button here */}
              </InputAdornment>
            }
            label="Image"
          />
        </FormControl>
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.alt}
        />
        {errorsState && errorsState.alt && (
          <Alert severity="warning">{errorsState.alt}</Alert>
        )}

        <TextField
          id="country"
          label="Country"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.country}
          required
        />
        {errorsState && errorsState.country && (
          <Alert severity="warning">{errorsState.country}</Alert>
        )}
        <TextField
          id="city"
          label="City"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.city}
          required
        />
        {errorsState && errorsState.city && (
          <Alert severity="warning">{errorsState.city}</Alert>
        )}
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.street}
          required
        />
        {errorsState && errorsState.street && (
          <Alert severity="warning">{errorsState.street}</Alert>
        )}
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          required
        />
        {errorsState && errorsState.houseNumber && (
          <Alert severity="warning">{errorsState.houseNumber}</Alert>
        )}
        {/* <TextField
          id="zip"
          label="Zip"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.zip}
        />
        {errorsState && errorsState.zip && (
          <Alert severity="warning">{errorsState.zip}</Alert>
        )} */}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs={12}>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%" }}
            onClick={handleAddItemClick}
          >
            Create Card
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: { xs: 0, sm: 2 },
                width: "100%",
                ml: "0%",
              }}
            >
              Discrad
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AddItem;
