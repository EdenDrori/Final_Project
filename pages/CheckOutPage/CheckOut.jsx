import * as React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import Review from "./Review";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { validateAddress } from "../../validation/validateAddress";
import { inputsValueObjCheckout } from "./inputsValueObjCheckout";
import { checkoutNormalize } from "./checkoutNormalize";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";

const steps = ["Shipping address", "Payment details", "Review your order"];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [address, setAddress] = React.useState(inputsValueObjCheckout);
  //const navigate = useNavigate();
  //const [thisAble, setAble] = React.useState(true);
  //const addressRef = React.useRef();
  const [inputsValue, setInputsValue] = React.useState({
    change: "",
  });
  const [inputsValue1, setInputsValue1] = React.useState({
    first: "",
    last: "",
    country: "",
    city: "",
    street: "",
    //houseNumber: "",
  });
  const [dataFromServer, setDataFromServer] = React.useState();
    const { _id } = useParams();
    useEffect(() => {
      let token = getToken();
      let idFromToken = jwtDecode(token)._id;
      axios
        .get(`/users/${idFromToken}`)
        .then(({ data }) => {
          //console.log(data);
          const newData = checkoutNormalize(data.user);
         // console.log(newData, "new");
          setInputsValue1(newData);
        })
        .catch((err) => {
          //console.log(err);
          // toast.info("Error from server, can't get your profile", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
        });
    }, []);
  useEffect(() => {
    axios
      .get("/items/" + _id)
      .then(({ data }) => {
        setDataFromServer({
          title: data.title,
          description: data.description,
          price: data.price,
        });
        //console.log(dataFromServer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleInputsChange1 = (e) => {
    setInputsValue1((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    //chargeAble(inputsValue, setAble);
  };
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    //chargeAble2(inputsValue, setAble);
  };
  // useEffect(() => {
  //   console.log(addressRef);
  // }, [addressRef]);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleInputsChange1={handleInputsChange1}
            inputsValue1={inputsValue1}
          />
        );

      case 1:
        return (
          <Payment
            handleInputsChange={handleInputsChange}
            inputsValue={inputsValue}
          />
        );
      case 2:
        return (
          <Review
            inputsValue={inputsValue}
            inputsValue1={inputsValue1}
            dataFromServer={dataFromServer}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  // const [addressInfo, setAddressInfo] = React.useState({});
  const handleSoldItem =async () => {
     try {
    // const joiResponse = validateItem(inputsValue);
    // setErrorsState(joiResponse);
    // if (joiResponse) return;
    const { data } = await axios.put("/items/" + _id, {
      
      status: "sold",
      
    });
   // console.log(data);
  } catch (err) {
    console.log(err);
    // toast("Somthing is missing... try again", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  }
  };
  const handleNext = () => {
    // if (activeStep === 0) {
    //   // const joiResponse = validateAddress(addressInfo);
    //   // console.log(joiResponse);
    //   // if (joiResponse) return;
    //   console.log("Address Form Data:", addressRef.current);
    // }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4, marginBottom: "60px" }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handleSoldItem
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </Fragment>
  );
};
export default Checkout;
