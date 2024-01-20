import * as React from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Review = ({ inputsValue, inputsValue1,dataFromServer }) => {
  const addresses = [
    inputsValue1.street,
    inputsValue1.city,
    inputsValue1.country,
    inputsValue1.first,
    inputsValue1.last,
  ];
  const payments = [
    { name: "Card holder", detail: inputsValue.cardName },
    { name: "Card number", detail: inputsValue.cardNumber },
    { name: "Expiry date", detail: inputsValue.cardExpDate },
  ];
  const { _id } = useParams();
  //console.log(_id);
  //console.log("address",address);
  const [itemDetails, setItemDetails] = useState({
    title: "",
    description: "",
    price: "",
  });
  //  setItemDetails(dataFromServer);
   console.log(dataFromServer);
  // console.log(itemDetails);
  // // useEffect(() => {
  //   axios
  //     .get("/items/" + _id)
  //     .then(({ data }) => {
  //       setItemDetails({
  //         title: data.title,
  //         description: data.description,
  //         price: data.price,
  //       });
  //     })
  //     .catch((err) => {console.log(err);});
  // }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={dataFromServer.title}
            secondary={dataFromServer.description}
          />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {dataFromServer.price} $
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {inputsValue1.first} {inputsValue1.last}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Review;
