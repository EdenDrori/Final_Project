import {
  Container,
  Grid,
  Typography,
  Alert,
  Box,
  Popover,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import likeItemNormalization from "../itemsPage/likeItemNormalization";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ItemComponent from "../../components/ItemComponent";
import { validateBankDetails } from "../../validation/bankValidation";
import ConvertCurrency from "./ConvertUSDtoILS";

const MyItemPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [myItemHeader, setMyItemHeader] = useState(
    "Effortlessly manage, like, edit, or delete your business items. Elevate your professional presence and connections with ease."
  );
  const [moneyForWithdrawal, setMoneyForWithdrawal] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bankS, setBank] = useState(null);
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    fullName: "",
    branch: "",
    accountNumber: "",
  });
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("/items/my-items").then(({ data }) => {
        //console.log(data);
        const isItems = data.message;
        if (isItems) {
          //console.log(data.message);
          setMyItemHeader("No items yet, add new item easily now ");
          return;
        }
        if (userData) data = likeItemNormalization(data, userData._id);
        setDataFromServer(data);
        let sum = 0;
        for (let item of data) {
          if (item.status === "sold") {
            const price = item.price;
            //console.log(price);
            sum += price;
          } else {
            // console.log(sum);
          }
        }
        //console.log(data);
        setMoneyForWithdrawal(sum);
      });
    } catch (e) {
      //console.log(e, "errorrrrr");
    }
  }, [moneyForWithdrawal]);
  //   useEffect(() => {
  //     try {
  //       axios
  //         .get(
  //           `http://data.fixer.io/api/latest69eb4eb0b7cdf5687d7f3464639f7935
  // `
  //         )
  //         .then(({ data }) => {
  //           console.log(data);
  //         });
  //     } catch (e) {
  //       console.log()
  //       console.log(e, "errorrrrr");
  //     }
  //   }, [moneyForWithdrawal]);
  const handleEditItem = (_id) => {
    navigate(`${ROUTES.EDITITEM}/${_id}`);
  };
  const handleAddItem = () => {
    navigate(ROUTES.ADDITEM);
  };
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDeleteItem = async (_id) => {
    try {
      const { data } = await axios.delete("/items/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id != _id)
      );
    } catch (err) {
      toast("There's a problem at deleting the item from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeItem = async (_id) => {
    try {
      const { data } = await axios.patch("/items/" + _id);
    } catch (err) {
      toast("There's a problem at liking the item from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeSuccess = (_id) => {
    setDataFromServer(
      dataFromServer.map((item) =>
        item._id == _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleDeleteSoldItems = async () => {
    //console.log(dataFromServer);
    const data = dataFromServer;
    //console.log(data);
    for (let item of data) {
      // console.log(item);
      // console.log(item.status);
      if (item.status == "sold") {
        const _id = item._id;
        try {
          const { data } = await axios.delete("/items/" + _id);
          setDataFromServer((dataFromServerCopy) =>
            dataFromServerCopy.filter((item) => item._id != _id)
          );
          setMoneyForWithdrawal(0);
        } catch (err) {
          toast("There's a problem at deleting the item from server", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        // console.log(dataFromServer);
        // console.log("item", item.status);
      } else {
        // console.log(item);
      }
    }
  };
  const handleSubmit = () => {
    const joiResponse = validateBankDetails(inputsValue);
    setErrorsState(joiResponse);
    // console.log(joiResponse);
    if (joiResponse) return;
    if (!bankS) {
      setErrorsState(!bankS);

      return;
    }
    handleDeleteSoldItems();
    //console.log(inputsValue);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangeBank = (event) => {
    // console.log(event.target.value);
    let bank = event.target.value;
    setBank(bank);

    //console.log(bankS);
  };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          pb: "0px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Your items
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10%" }}
      >
        {myItemHeader}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {dataFromServer.map((item) => (
              <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
                <ItemComponent
                  _id={item._id}
                  title={item.title}
                  brand={item.brand}
                  price={`${item.price}  $`}
                  size={item.size}
                  phone={item.phone}
                  address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
                  img={item.image.url}
                  alt={item.image.alt}
                  description={item.description}
                  status={item.status}
                  date={item.createdAt}
                  itemNumber={item.itemNumber}
                  like={item.likes}
                  onDeleteItem={handleDeleteItem}
                  onEditItem={handleEditItem}
                  onLikeItem={handleLikeItem}
                  onLikeSuccess={handleLikeSuccess}
                  onViewItem={handleViewItem}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              height: "auto",
              backgroundColor: "background.default",
              pt: 2,
              pr: 1,
              pl: 1,
            }}
          >
            <Typography variant="h4">Account Balance</Typography>

            <Typography variant="h2">{moneyForWithdrawal}</Typography>
            <Box sx={{ backgroundColor: "sectionBackground.default" }}>
              <ConvertCurrency
                api_key={"69eb4eb0b7cdf5687d7f3464639f7935"}
                amount={moneyForWithdrawal}
              />
            </Box>
            <Button
              variant={!moneyForWithdrawal ? "disabled" : "contained"}
              sx={{
                mt: 5,
                width: "70%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleClick}
              aria-describedby={id}
            >
              Get your money
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ padding: 2, minWidth: 300 }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 0, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Fill here your account details for transfer
                </Typography>
                <form noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        id="fullName"
                        onChange={handleInputsChange}
                        value={inputsValue.fullName}
                        fullWidth
                      />
                      {errorsState && errorsState.fullName && (
                        <Alert severity="warning">{errorsState.fullName}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Bank
                        </InputLabel>
                        <Select
                          labelId="bank-label"
                          id="bank"
                          fullWidth
                          value={bankS}
                          label="Bank"
                          onChange={handleChangeBank}
                        >
                          <MenuItem value={"discount"}>
                            Discount Bank - 11
                          </MenuItem>
                          <MenuItem value={"hapoalim"}>
                            Bank Hapoalim - 12
                          </MenuItem>
                          <MenuItem value={"Leumi"}>Bank Leumi - 14</MenuItem>
                          <MenuItem value={"otsarHahayal"}>
                            Bank Otsar Ha-hayal - 10
                          </MenuItem>
                          <MenuItem value={"mizrahiTefahot"}>
                            Mizrahi Tefahot Bank - 20
                          </MenuItem>
                        </Select>
                        {errorsState && !bankS && (
                          <Alert severity="warning">Please choose a Bank</Alert>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Branch Number"
                        id="branch"
                        variant="outlined"
                        onChange={handleInputsChange}
                        value={inputsValue.branch}
                        fullWidth
                      />
                      {errorsState && errorsState.branch && (
                        <Alert severity="warning">{errorsState.branch}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Account Number"
                        variant="outlined"
                        id="accountNumber"
                        onChange={handleInputsChange}
                        value={inputsValue.accountNumber}
                        fullWidth
                      />
                      {errorsState && errorsState.accountNumber && (
                        <Alert severity="warning">
                          {errorsState.accountNumber}
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 10 }}
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit transfer
                  </Button>
                </form>
              </Box>
            </Popover>
          </Box>
        </Grid>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
          onClick={handleAddItem}
        >
          Add new item
        </Button>
      </Grid>
    </Container>
  );
};

export default MyItemPage;
