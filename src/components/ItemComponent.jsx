import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useState } from "react";
import IconsGuard from "../Guard/IconsGuard";
import LoggedOutGuard from "../Guard/LoggedOutGuard";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ItemComponent = ({
  _id,
  title,
  brand,
  phone,
  price,
  value,
  currecy,
  status,
  size,
  likes,
  address,
  description,
  date,
  img,
  alt,
  like,
  itemNumber,
  onDeleteItem,
  onLikeItem,
  onEditItem,
  onLikeSuccess,
  onViewItem,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [thisOP, setOP] = useState("1");
  //const [statusVal, setStatusVal] = useState("");
  const theme = useTheme();
  const handlePhoneClick = () => {
    toast.info(`Phone Num:${phone}. `, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const statusVal = status;
  //setStatusVal(status);
  const handleDeleteItemClick = () => {
    onDeleteItem(_id);
  };
  const handleClickEditItem = () => {
    onEditItem(_id);
  };
  const handleLikeItem = async () => {
    try {
      const { data } = await axios.patch("/items/" + _id);

      onLikeSuccess(_id);
    } catch (err) {
      toast.info(`Somthing is wrong on server`, err, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleClickViewItem = () => {
    onViewItem(_id);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (thisOP === "0.6") {
      setOP("1");
    } else {
      setOP("0.6");
    }
  };
  // const handleCheckChange = async (_id) => {
  //   try {
  //     const { data } = await axios.patch("/items/status/" + _id);
  //     console.log(_id);
  //     setThisChecked(!thisChecked);
  //   } catch (err) {
  //     console.log(err);
  //     toast("There's a problem at changing status for this user from server", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
  // const handleCheckChangeClick = () => {
  //   handleCheckChange(_id);

  // };
  return (
    <Card
      sx={{
        boxShadow: "none",
        margin: "5%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CardActionArea onClick={handleClickViewItem}>
        <CardMedia
          component="img"
          image={img}
          alt={alt}
          sx={{
            height: "30vh",
            objectFit: "cover",
            height: "100%",
            width: "100%", // Ensure the image takes the full width of the container
          }}
        />
      </CardActionArea>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <CardHeader
              title={title}
              subheader={brand}
              sx={{ p: 0, mb: 1, textTransform: "capitalize" }}
            />
          </Grid>
          <Grid
            item
            sx={{ display: statusVal === "available" ? "none" : "block" }}
          >
            <Typography variant="body2">{status}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{price}</Typography>
          </Grid>
        </Grid>
        <Divider />
        {/* <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
        </Box>  */}
        <Divider />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton
              sx={{
                padding: { xs: "4px", md: "8px" },
                paddingTop: { xs: "12px" },
                marginTop: { md: "10px" },
              }}
              onClick={handlePhoneClick}
            >
              <PhoneIcon />
            </IconButton>
            <IconsGuard>
              <IconButton
                sx={{
                  padding: { xs: "4px", md: "8px" },
                  paddingTop: { xs: "12px" },
                  marginTop: { md: "10px" },
                }}
                onClick={handleClickEditItem}
              >
                <CreateIcon />
              </IconButton>
            </IconsGuard>
          </Box>

          <Box>
            <IconsGuard>
              <IconButton
                sx={{
                  padding: { xs: "4px", md: "8px" },
                  paddingTop: { xs: "12px" },
                  marginTop: { md: "10px" },
                }}
                onClick={handleDeleteItemClick}
              >
                <DeleteIcon />
              </IconButton>
            </IconsGuard>
            <LoggedOutGuard>
              <IconButton
                sx={{
                  padding: { xs: "4px", md: "8px" },
                  paddingTop: { xs: "12px" },
                  marginTop: { md: "10px" },
                }}
                onClick={handleLikeItem}
              >
                <FavoriteIcon color={like ? "error" : ""} />
              </IconButton>
            </LoggedOutGuard>
            {/* <Divider />
            <FormControlLabel
              sx={{ marginTop: "20px" }}
              control={
                <Checkbox
                  checked={status}
                  onChange={handleCheckChangeClick}
                  color="primary"
                />
              }
              label="Mark if sold"
            /> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
ItemComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  brand: PropTypes.string,
  price: PropTypes.string,
  size: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  itemNumber: PropTypes.number,
  like: PropTypes.bool,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onLikeItem: PropTypes.func.isRequired,
  onLikeSuccess: PropTypes.func.isRequired,
  onViewItem: PropTypes.func.isRequired,
};
ItemComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};
export default ItemComponent;
