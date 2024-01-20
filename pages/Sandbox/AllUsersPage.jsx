import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

const AllUsersPage = () => {
  const navigate = useNavigate();
  const [dataFromServer, setDataFromServer] = useState([]);
  const [thisChecked, setThisChecked] = useState(true);
  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((err) => {
        toast("Error from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, [thisChecked]);

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete("/users/" + id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((user) => user._id != id)
      );
    } catch (err) {
      toast("There's a problem at deleting the user from server", {
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
  const handleEditUser = (userId) => {
    navigate(`${ROUTES.EDITUSERS}/${userId}`);
  };
  const handleCheckChange = async (id) => {
    try {
      const { data } = await axios.patch("/users/" + id);
      setThisChecked(!thisChecked);
    } catch (err) {
      toast("There's a problem at changing status for this user from server", {
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

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 1, padding: "20px", pb: "0px" }}>
          CRM
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "3%" }}
        >
          Effortlessly manage user profiles. Edit, delete, and view details with
          ease. Seamlessly toggle between business and regular status to ensure
          optimal platform management. Streamline user control for a smooth
          administrative experience.
        </Typography>
      </div>
      <Grid container spacing={2} sx={{ paddingBottom: "60px" }}>
        {dataFromServer.map((user) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ minWidth: 220 }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    textTransform: "capitalize",
                    textAlign: "center",
                  }}
                  color="text.secondary"
                  gutterBottom
                  variant="h6"
                >
                  {`${user.name.first} ${user.name.last}`}
                </Typography>
                <Divider />
                <br />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {`Email:`}
                  <br />
                  {` ${user.email}`}
                </Typography>
                <Typography variant="body2">
                  {`User Id: `}
                  <br />
                  {` ${user._id}`}
                </Typography>
                <Divider />
                <FormControlLabel
                  sx={{ marginTop: "20px" }}
                  control={
                    <Checkbox
                      checked={user.isBusiness}
                      onChange={() => handleCheckChange(user._id)}
                      color="primary"
                    />
                  }
                  label="Business Account"
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ color: "red" }}
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </Button>
                <IconButton onClick={() => handleEditUser(user._id)}>
                  <CreateIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllUsersPage;
