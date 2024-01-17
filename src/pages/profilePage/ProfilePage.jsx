import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../service/storageService";
import { AccountCircle } from "@mui/icons-material";
import normalizeDataFromServer from "./normalizeDataFromServer";
import { inputsValueObj } from "./inputsValueObj";
import ROUTES from "../../routes/ROUTES";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const [inputsValue, setInputsValue] = useState(inputsValueObj);
  const navigate = useNavigate();
  useEffect(() => {
    let token = getToken();
    let idFromToken = jwtDecode(token)._id;
    axios
      .get(`/users/${idFromToken}`)
      .then(({ data }) => {
        //console.log(idFromToken);
        console.log(data);
        const newData = normalizeDataFromServer(data.user);
        console.log(newData, "new");
        setInputsValue(newData);
      })
      .catch((err) => {
        console.log(err);
        toast.info("Error from server, can't get your profile", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);
  const handleEdit = () => {
    navigate(ROUTES.EDITPROFILE);
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "60px",
      }}
    >
      <Paper
        elevation={6}
        sx={{ width: { xs: "270px", md: "400px", lg: "600px" } }}
      >
        <Box
          sx={{
            textTransform: "capitalize",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              // bgcolor: "primary.main",
              width: "130px",
              height: "130px",
              overflow: "hidden",
            }}
          >
            {/* <AccountCircle /> */}
            <img
              src={inputsValue.url}
              alt={inputsValue.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            sx={{ fontSize: { xs: "1.5rem" } }}
          >
            {inputsValue.first + " " + inputsValue.last}
          </Typography>
        </Box>
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: { xs: 260, md: 400, lg: 600 },
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          <ListItem>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary="First Name"
              secondary={`${inputsValue.first} ${inputsValue.middle}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={inputsValue.last} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={inputsValue.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary={inputsValue.phone} />
          </ListItem>
          {/* <ListItem sx={{ display: { xs: "none", md: "block" } }}>
            <ListItemText primary="Url" secondary={inputsValue.url} />
          </ListItem>
          <ListItem sx={{ display: { xs: "none", md: "block" } }}>
            <ListItemText primary="Alt" secondary={inputsValue.alt} />
          </ListItem> */}
          
          <ListItem>
            <ListItemText primary="Country" secondary={inputsValue.country} />
          </ListItem>
          <ListItem>
            <ListItemText primary="City" secondary={inputsValue.city} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Street" secondary={inputsValue.street} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="House Number"
              secondary={inputsValue.houseNumber}
            />
          </ListItem>
          
        </List>
        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      </Paper>
    </Box>
  );
};
export default ProfilePage;
